"use client";

// Third party imports
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show on home page
  if (pathname === "/") return null;

  const pathSegments = pathname.split("/").filter((v) => v);

  // Generate the JSON-LD Structured Data
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://financialatelier.vercel.app",
      },
      ...pathSegments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        item: `https://financialatelier.vercel.app/${pathSegments.slice(0, index + 1).join("/")}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}
