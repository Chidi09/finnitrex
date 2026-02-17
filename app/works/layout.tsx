import { BreadcrumbSchema } from "@/components/StructuredData";

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://finnitrex.com" },
          { name: "Our Works", url: "https://finnitrex.com/works" },
        ]}
      />
      {children}
    </>
  );
}
