import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  featuredImage: string;
  author: string;
  readingTime: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    return getPostBySlug(slug);
  });

  return posts
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function toIsoPkt(date: string): string {
  if (!date) return "";
  // Already a full ISO datetime — leave as-is
  if (date.includes("T")) return date;
  // YYYY-MM-DD → midnight Pakistan Standard Time (+05:00)
  return `${date}T00:00:00+05:00`;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "",
    date: toIsoPkt(data.date || ""),
    category: data.category || "",
    description: data.description || "",
    featuredImage: data.featuredImage || "",
    author: data.author || "Adi Khan",
    readingTime: stats.text,
    content,
  };
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.category.toLowerCase()));
  return Array.from(categories);
}

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit: number = 3
): BlogPost[] {
  return getAllPosts()
    .filter(
      (post) =>
        post.slug !== currentSlug &&
        post.category.toLowerCase() === category.toLowerCase()
    )
    .slice(0, limit);
}
