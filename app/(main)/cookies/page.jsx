import Script from "next/script";

export const metadata = {
  title: "Financial Atelier | Cookies",
  description: "Description",
  alternates: {
    canonical: "https://financialatelier.vercel.app/cookies",
  },
};

import CookiesClient from "./CookiesClient";

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
          id="schema-cookies"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <CookiesClient />
      </>
    );
}