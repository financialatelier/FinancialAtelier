import Script from "next/script";

export const metadata = {
  title: "Financial Atelier | Security",
  description: "Description",
  alternates: {
    canonical: "https://financialatelier.vercel.app/security",
  },
};

import SecurityClient from "./SecurityClient";

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
          id="schema-security"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <SecurityClient />
      </>
    );
}