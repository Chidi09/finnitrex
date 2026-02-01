import { ServiceSchema, BreadcrumbSchema } from "@/components/StructuredData";

export default function LmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceSchema
        name="Learning Management System Development"
        description="Custom LMS architecture and development services. Enterprise-grade education platforms with student tracking, certification systems, video delivery, and SCORM compliance."
        url="https://finnitrex.com/lms"
        serviceType="Education Technology Solutions"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://finnitrex.com" },
          { name: "LMS", url: "https://finnitrex.com/lms" },
        ]}
      />
      {children}
    </>
  );
}
