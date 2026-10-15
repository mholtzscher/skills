import { array, boolean, json, object, positive, PrError, text, type Gh } from "./gh.ts";
import { type Target } from "./target.ts";

const COMMENT_FIELDS = "id databaseId author { login } body url";
const PAGE_INFO = "pageInfo { hasNextPage endCursor }";
const THREAD_QUERY = `query($owner:String!,$name:String!,$number:Int!,$cursor:String) {
  repository(owner:$owner,name:$name) { pullRequest(number:$number) {
    reviewThreads(first:100,after:$cursor) { nodes {
      id isResolved path line originalLine
      comments(first:100) { nodes { ${COMMENT_FIELDS} } ${PAGE_INFO} }
    } ${PAGE_INFO} }
  } }
}`;
const COMMENT_QUERY = `query($id:ID!,$cursor:String) {
  node(id:$id) { ... on PullRequestReviewThread {
    id comments(first:100,after:$cursor) { nodes { ${COMMENT_FIELDS} } ${PAGE_INFO} }
  } }
}`;
interface Comment {
  id: string;
  databaseId: number | null;
  author: string | null;
  url: string;
  body: string;
}
interface Thread {
  id: string;
  path: string;
  line: number | null;
  originalLine: number | null;
  comments: Comment[];
}
function nullableLine(value: unknown, field: string): number | null {
  return value === null ? null : positive(value, field);
}
function comment(value: unknown): Comment {
  const v = object(value);
  const author = v.author === null ? null : text(object(v.author).login, "comment author", true);
  return {
    id: text(v.id, "comment ID", true),
    databaseId: v.databaseId === null ? null : positive(v.databaseId, "comment database ID"),
    author,
    url: text(v.url, "comment URL", true),
    body: text(v.body, "comment body"),
  };
}
function connection(value: unknown) {
  const v = object(value),
    info = object(v.pageInfo);
  const hasNext = boolean(info.hasNextPage, "hasNextPage");
  const cursor = info.endCursor === null ? null : text(info.endCursor, "endCursor", true);
  if (hasNext && !cursor) throw new PrError("invalid-data", "Pagination says more pages exist without a cursor");
  return { nodes: array(v.nodes), hasNext, cursor };
}
async function graphql(gh: Gh, target: Target, query: string, variables: string[]) {
  const result = await gh(["api", "graphql", "--hostname", target.hostname, "-f", `query=${query}`, ...variables]);
  const v = object(json(result.stdout));
  if (v.errors !== undefined && array(v.errors).length) throw new PrError("graphql", `GraphQL returned errors: ${JSON.stringify(v.errors).slice(0, 2000)}`);
  return object(v.data);
}
/** Cursor checks and explicit budgets turn incomplete pagination into errors, never silent truncation. */
export async function threads(gh: Gh, target: Target) {
  const [owner, name] = target.repository.split("/");
  const result: Thread[] = [],
    ids = new Set<string>(),
    cursors = new Set<string>();
  let cursor: string | null = null,
    pages = 0,
    commentPages = 0,
    bodyBytes = 0;
  const collect = (values: unknown[], comments: Comment[], seen: Set<string>) => {
    for (const value of values) {
      const c = comment(value);
      if (seen.has(c.id)) throw new PrError("unstable-pagination", "Duplicate comment while paginating; rerun threads");
      seen.add(c.id);
      bodyBytes += Buffer.byteLength(c.body);
      if (bodyBytes > 32 * 1024 * 1024) throw new PrError("output-limit", "Thread bodies exceed 32 MiB; no partial thread report emitted");
      comments.push(c);
    }
  };
  do {
    if (++pages > 1000) throw new PrError("pagination-limit", "Review threads exceed 1000 pages; no partial report emitted");
    const variables = ["-f", `owner=${owner}`, "-f", `name=${name}`, "-F", `number=${target.number}`];
    if (cursor) variables.push("-f", `cursor=${cursor}`);
    const data = await graphql(gh, target, THREAD_QUERY, variables);
    const page = connection(object(object(data.repository).pullRequest).reviewThreads);
    for (const row of page.nodes) {
      const v = object(row),
        id = text(v.id, "thread ID", true);
      if (ids.has(id)) throw new PrError("unstable-pagination", "Duplicate thread while paginating; rerun threads");
      ids.add(id);
      if (boolean(v.isResolved, "isResolved")) continue;
      const thread: Thread = {
        id,
        path: text(v.path, "thread path", true),
        line: nullableLine(v.line, "thread line"),
        originalLine: nullableLine(v.originalLine, "thread originalLine"),
        comments: [],
      };
      let comments = connection(v.comments);
      const commentIds = new Set<string>(),
        commentCursors = new Set<string>();
      collect(comments.nodes, thread.comments, commentIds);
      while (comments.hasNext) {
        if (++commentPages > 1000) throw new PrError("pagination-limit", "Nested comments exceed 1000 additional pages; no partial report emitted");
        if (commentCursors.has(comments.cursor!)) throw new PrError("unstable-pagination", "Repeated comment cursor; rerun threads");
        commentCursors.add(comments.cursor!);
        const nested = object((await graphql(gh, target, COMMENT_QUERY, ["-f", `id=${id}`, "-f", `cursor=${comments.cursor}`])).node);
        if (text(nested.id, "thread ID") !== id) throw new PrError("invalid-data", "Nested comments returned a different thread");
        comments = connection(nested.comments);
        collect(comments.nodes, thread.comments, commentIds);
      }
      result.push(thread);
    }
    if (!page.hasNext) break;
    if (cursors.has(page.cursor!)) throw new PrError("unstable-pagination", "Repeated thread cursor; rerun threads");
    cursors.add(page.cursor!);
    cursor = page.cursor;
  } while (true);
  return {
    target,
    threads: result,
    limitations: [
      "Unresolved inline review threads only, not review summaries or PR conversation comments. Pagination is not an atomic snapshot; rerun if reviews change during collection.",
    ],
  };
}
