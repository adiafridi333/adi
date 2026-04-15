import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BlogCard from "@/components/blog/BlogCard";
import JsonLd from "@/components/seo/JsonLd";
import { generatePageMetadata, generateBreadcrumbJsonLd } from "@/lib/metadata";
import { getPostsByCategory, getAllCategories } from "@/lib/blog";

interface BlogCategoryPageProps {
  params: Promise<{ category: string }>;
}

const categoryMeta: Record<string, { title: string; description: string }> = {
  weddings: {
    title: "Wedding Photography Tips & Insights",
    description:
      "Expert wedding photography tips, advice, and behind-the-scenes insights from Adi Photography Peshawar.",
  },
  corporate: {
    title: "Corporate Photography Blog",
    description:
      "Corporate photography tips, brand imagery insights, and professional headshot advice from Adi Photography Peshawar.",
  },
  events: {
    title: "Event Photography Blog",
    description:
      "Event photography tips, coverage insights, and event planning advice from Adi Photography Peshawar.",
  },
  tips: {
    title: "Photography Tips & Tutorials",
    description:
      "Photography tips, tutorials, and expert advice from the team at Adi Photography Peshawar.",
  },
  "behind-the-scenes": {
    title: "Behind the Scenes",
    description:
      "Go behind the scenes with Adi Photography Peshawar. See how we work and create stunning imagery.",
  },
};

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: BlogCategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMeta[category];
  if (!meta) return {};

  return generatePageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/blog/category/${category}`,
  });
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const meta = categoryMeta[category];

  if (!meta && posts.length === 0) notFound();

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    {
      name: category.charAt(0).toUpperCase() + category.slice(1),
      url: `/blog/category/${category}`,
    },
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
            {meta?.title || `${category.charAt(0).toUpperCase() + category.slice(1)} Articles`}
          </h1>
          {meta?.description && (
            <p className="text-text-secondary font-dm text-lg max-w-2xl">
              {meta.description}
            </p>
          )}
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
                No articles in this category yet. Check back soon!
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
