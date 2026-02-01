import { ServiceSchema, BreadcrumbSchema } from "@/components/StructuredData";

export default function RoboticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceSchema
        name="Robotics & Automation R&D"
        description="Future Labs robotics division researching automation solutions for logistics, manufacturing, and healthcare."
        url="https://finnitrex.com/robotics"
        serviceType="Robotics and Automation Research"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://finnitrex.com" },
          { name: "Robotics", url: "https://finnitrex.com/robotics" },
        ]}
      />
      {children}
    </>
  );
}
