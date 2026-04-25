import Script from "next/script";

export const metadata = {
  title: "Financial Atelier | Privacy",
  description: "Description",
  alternates: {
    canonical: "https://financialatelier.vercel.app/privacy",
  },
};

import PrivacyClient from "./PrivacyClient";

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
          id="schema-privacy"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <PrivacyClient />
      </>
    );
}