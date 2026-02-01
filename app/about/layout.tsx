import { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "About Finnitrex",
  description:
    "Finnitrex Solutions Ltd is a premier UK technology firm specializing in advanced software architecture, AI integration, and digital ecosystem development. Headquartered in London with a global talent network.",
  keywords: [
    "about Finnitrex",
    "UK technology company",
    "software architecture",
    "AI integration company",
    "London tech firm",
    "enterprise software company",
    "GDPR compliant development",
    "global talent network",
  ],
  openGraph: {
    title: "About Finnitrex | UK Technology Company",
    description:
      "Premier UK technology firm specializing in advanced software architecture, AI integration, and digital ecosystem development.",
    url: "https://finnitrex.com/about",
  },
  alternates: {
    canonical: "https://finnitrex.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://finnitrex.com" },
          { name: "About", url: "https://finnitrex.com/about" },
        ]}
      />
      {children}
    </>
  );
}
