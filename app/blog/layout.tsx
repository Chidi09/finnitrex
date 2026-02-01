import { BreadcrumbSchema } from "@/components/StructuredData";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://finnitrex.com" },
          { name: "Blog", url: "https://finnitrex.com/blog" },
        ]}
      />
      {children}
    </>
  );
}
