/** Blog post front-matter (Backend Schema: Blog). */
export interface BlogPost {
  /** URL segment for the post page; unique across all posts. */
  slug: string;
  title: string;
  tags: string[];
  /** Publication date, ISO 8601 (`YYYY-MM-DD`). */
  date: string;
}
