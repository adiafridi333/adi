import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RelatedPosts from "@/components/blog/RelatedPosts";
import JsonLd from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  generateBreadcrumbJsonLd,
  generateArticleJsonLd,
} from "@/lib/metadata";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import React from "react";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return generatePageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.featuredImage,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.date,
    author: post.author,
  });
}

const mdxComponents = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      src={props.src || ""}
      alt={props.alt || "Blog image by Adi Photography Peshawar"}
      width={800}
      height={450}
      className="rounded-lg my-6"
      sizes="(max-width: 768px) 100vw, 720px"
    />
  ),
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug, post.category);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={generateArticleJsonLd({
          title: post.title,
          description: post.description,
          url: `/blog/${post.slug}`,
          image: post.featuredImage,
          datePublished: post.date,
          dateModified: post.date,
          author: post.author,
        })}
      />

      <article>
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] flex items-end">
          <div className="absolute inset-0">
            <Image
              src={post.featuredImage || "/images/blog/default.jpg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 gradient-overlay" />
          </div>
          <Container className="relative z-10 pb-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-dm font-medium rounded-btn uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-text-secondary text-sm font-dm">
                  {post.readingTime}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-text-primary mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-text-secondary font-dm text-sm">
                <span>By {post.author}</span>
                <span>•</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
            </div>
          </Container>
        </section>

        {/* Content */}
        <section className="py-16 bg-bg-primary">
          <Container>
            <Breadcrumbs
              items={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))}
            />
            <div className="max-w-3xl mx-auto mt-8 prose prose-invert prose-headings:font-playfair prose-headings:text-text-primary prose-p:text-text-secondary prose-p:font-dm prose-a:text-accent prose-strong:text-text-primary prose-li:text-text-secondary">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>
          </Container>
        </section>

        {/* Related Posts */}
        <section className="pb-20 bg-bg-primary">
          <Container>
            <div className="max-w-5xl mx-auto">
              <RelatedPosts posts={relatedPosts} />
            </div>
          </Container>
        </section>
      </article>
    </>
  );
}
