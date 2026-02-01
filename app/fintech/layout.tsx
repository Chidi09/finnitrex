import { ServiceSchema, BreadcrumbSchema } from "@/components/StructuredData";

export default function FintechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceSchema
        name="Fintech & Predictive Analytics"
        description="AI-powered fintech solutions including predictive analytics, market flux simulation, RegTech compliance automation, AML/KYC systems, and risk management."
        url="https://finnitrex.com/fintech"
        serviceType="Financial Technology Solutions"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://finnitrex.com" },
          { name: "Fintech", url: "https://finnitrex.com/fintech" },
        ]}
      />
      {children}
    </>
  );
}
