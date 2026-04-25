import Script from "next/script";

export const metadata = {
  title: "Financial Atelier | Careers",
  description: "Description",
  alternates: {
    canonical: "https://financialatelier.vercel.app/careers",
  },
};

import CareersClient from "./CareersClient";

export default function Page() {
  const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Financial Atelier",
      "description": "Description",
      "publisher": {
        "@type": "Organization",
        "name": "Financial Atelier",
      }
    };

  return (
      <>
        <Script
          id="schema-careers"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <CareersClient />
      </>
    );
}