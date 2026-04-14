import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm font-dm">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1">
            {index > 0 && (
              <span className="text-text-secondary" aria-hidden="true">/</span>
            )}
            {index === items.length - 1 ? (
              <span className="text-text-secondary truncate max-w-[200px] sm:max-w-none">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-text-secondary hover:text-accent transition-colors min-h-[44px] inline-flex items-center px-1"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
