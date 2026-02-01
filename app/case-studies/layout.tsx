import { BreadcrumbSchema } from "@/components/StructuredData";

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://finnitrex.com" },
          { name: "Case Studies", url: "https://finnitrex.com/case-studies" },
        ]}
      />
      {children}
    </>
  );
}
