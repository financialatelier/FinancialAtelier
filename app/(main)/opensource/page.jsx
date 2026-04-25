import Script from "next/script";

export const metadata = {
  title: "Financial Atelier | Opensource",
  description: "Description",
  alternates: {
    canonical: "https://financialatelier.vercel.app/opensource",
  },
};

import OpensourceClient from "./OpensourceClient";

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
          id="schema-opensource"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <OpensourceClient />
      </>
    );
}