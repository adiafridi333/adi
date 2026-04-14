import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-bg-card border border-border rounded-card overflow-hidden hover:border-accent/30 transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.featuredImage || "/images/blog/default.jpg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-accent text-xs font-dm font-medium uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-border">•</span>
          <span className="text-text-secondary text-xs font-dm">
            {post.readingTime}
          </span>
        </div>
        <h3 className="text-lg font-playfair font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-text-secondary font-dm text-sm line-clamp-2 mb-4">
          {post.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-text-secondary font-dm text-xs">
            {formatDate(post.date)}
          </p>
          <span className="text-accent text-xs font-dm font-medium">
            By {post.author}
          </span>
        </div>
      </div>
    </Link>
  );
}
