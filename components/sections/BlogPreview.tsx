"use client";

import Image from "next/image";
import Link from "next/link";
import { type BlogPost } from "@/lib/blog";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

interface BlogPreviewProps {
  posts: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="From the Blog"
          subtitle="Tips, insights, and behind-the-scenes from our work in Peshawar"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 0.1}>
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
                    sizes="(max-width: 768px) 100vw, 33vw"
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
                  <p className="text-text-secondary font-dm text-sm line-clamp-2">
                    {post.description}
                  </p>
                  <p className="text-text-secondary font-dm text-xs mt-4">
                    {formatDate(post.date)}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button href="/blog" variant="outline">
            Read More Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
