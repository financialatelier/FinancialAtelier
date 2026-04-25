import Script from "next/script";

export const metadata = {
  title: "Financial Atelier | Terms",
  description: "Description",
  alternates: {
    canonical: "https://financialatelier.vercel.app/terms",
  },
};

import TermsClient from "./TermsClient";

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
          id="schema-terms"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <TermsClient />
      </>
    );
}