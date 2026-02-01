import { ServiceSchema, BreadcrumbSchema } from "@/components/StructuredData";

export default function SoftwareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceSchema
        name="Custom Software Development"
        description="Full-stack software engineering services including high-performance web applications, LMS architectures, LLM integration, and SaaS development."
        url="https://finnitrex.com/software"
        serviceType="Software Development"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://finnitrex.com" },
          { name: "Software", url: "https://finnitrex.com/software" },
        ]}
      />
      {children}
    </>
  );
}
