"use client";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Finnitrex Solutions Ltd",
    alternateName: "Finnitrex",
    url: "https://finnitrex.com",
    logo: "https://finnitrex.com/icon.svg",
    description:
      "Advanced technological solutions specializing in LMS architecture, predictive analytics, AI integration, and custom software development.",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Person",
        name: "Finnitrex Solutions",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "483 Green Lanes",
      addressLocality: "London",
      postalCode: "N13 4BS",
      addressCountry: "GB",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: "https://finnitrex.com/start",
    },
    sameAs: ["https://twitter.com/finnitrex"],
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 51.6178,
        longitude: -0.1083,
      },
      geoRadius: "50000",
    },
    knowsAbout: [
      "Learning Management Systems",
      "Artificial Intelligence",
      "Predictive Analytics",
      "Fintech Solutions",
      "Custom Software Development",
      "Next.js Development",
      "SaaS Development",
      "Computer Vision",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://finnitrex.com/#localbusiness",
    name: "Finnitrex Solutions Ltd",
    image: "https://finnitrex.com/og-image.png",
    url: "https://finnitrex.com",
    telephone: "",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "483 Green Lanes",
      addressLocality: "London",
      postalCode: "N13 4BS",
      addressRegion: "Greater London",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.6178,
      longitude: -0.1083,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://finnitrex.com/#website",
    url: "https://finnitrex.com",
    name: "Finnitrex",
    description:
      "Advanced technological solutions specializing in LMS architecture, predictive analytics, AI integration, and custom software development.",
    publisher: {
      "@id": "https://finnitrex.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://finnitrex.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}

export function ServiceSchema({
  name,
  description,
  url,
  serviceType,
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType,
    provider: {
      "@type": "Organization",
      name: "Finnitrex Solutions Ltd",
      url: "https://finnitrex.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${name} Services`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
