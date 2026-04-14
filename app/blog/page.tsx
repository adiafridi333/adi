import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BlogCard from "@/components/blog/BlogCard";
import JsonLd from "@/components/seo/JsonLd";
import { generatePageMetadata, generateBreadcrumbJsonLd } from "@/lib/metadata";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = generatePageMetadata({
  title: "Photography Blog",
  description:
    "Tips, insights, and behind-the-scenes content from Adi Photography Peshawar. Learn about wedding photography, drone videography, and more.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbJsonLd(breadcrumbs)} />

      <section className="pt-32 pb-12 bg-bg-primary">
        <Container>
          <Breadcrumbs
            items={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))}
          />
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-primary mt-4 mb-4">
            Photography Blog
          </h1>
          <p className="text-text-secondary font-dm text-lg max-w-2xl">
            Tips, insights, and behind-the-scenes stories from our photography
            and videography work across Peshawar and Pakistan.
          </p>
        </Container>
      </section>

      <section className="py-12 bg-bg-primary">
        <Container>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-text-secondary font-dm text-lg">
                Blog posts coming soon. Stay tuned!
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
