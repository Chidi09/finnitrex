// Pricing configuration for the calculator

export const basePackages = {
  brochure: {
    name: "Simple Brochure Site",
    basePrice: 2000,
    minPrice: 2000,
    maxPrice: 5000,
    description: "5-10 page site to establish credibility",
    includes: ["Homepage", "About Page", "Services Page", "Contact Form", "Basic SEO"]
  },
  business: {
    name: "Standard Business Site",
    basePrice: 5000,
    minPrice: 5000,
    maxPrice: 15000,
    description: "Advanced SEO, custom forms, CRM integration",
    includes: ["Everything in Brochure", "Advanced SEO", "Lead Capture Forms", "CRM Integration", "Analytics Setup"]
  },
  ecommerce: {
    name: "E-commerce Website",
    basePrice: 6000,
    minPrice: 6000,
    maxPrice: 30000,
    description: "Secure payments, inventory, shipping",
    includes: ["Everything in Business", "Payment Gateway", "Inventory Management", "Shipping Integration", "Product Catalog"]
  },
  bespoke: {
    name: "Bespoke Web Application",
    basePrice: 30000,
    minPrice: 30000,
    maxPrice: 100000,
    description: "Custom software, portals, proprietary tools",
    includes: ["Fully Custom Architecture", "User Authentication", "Database Design", "API Development", "Scalable Infrastructure"]
  }
};

export const features = {
  // Pages & Content
  additionalPages: { name: "Additional Pages (per page)", price: 200 },
  blog: { name: "Blog System", price: 1500 },
  portfolio: { name: "Portfolio Gallery", price: 1200 },
  
  // Functionality
  userAuth: { name: "User Authentication System", price: 2500 },
  paymentGateway: { name: "Payment Gateway Integration", price: 2000 },
  crmIntegration: { name: "CRM Integration (HubSpot/Salesforce)", price: 3000 },
  emailMarketing: { name: "Email Marketing Integration", price: 1500 },
  
  // E-commerce
  productCatalog: { name: "Product Catalog (up to 50 products)", price: 2000 },
  moreProducts: { name: "Additional Products (per 50)", price: 1000 },
  inventory: { name: "Inventory Management", price: 2500 },
  shipping: { name: "Shipping Integration", price: 2000 },
  
  // Advanced Features
  customApi: { name: "Custom API Development", price: 5000 },
  adminDashboard: { name: "Admin Dashboard", price: 4000 },
  analytics: { name: "Advanced Analytics Setup", price: 1500 },
  seo: { name: "Advanced SEO Optimization", price: 2000 },
  
  // Design & UX
  customDesign: { name: "Custom Design (vs Template)", price: 3000 },
  animations: { name: "Advanced Animations", price: 1500 },
  mobileApp: { name: "Mobile App (iOS/Android)", price: 15000 },
  
  // Integrations
  thirdPartyApi: { name: "Third-Party API Integration", price: 2000 },
  webhook: { name: "Webhook Setup", price: 1000 },
  
  // Maintenance & Support
  maintenance: { name: "Monthly Maintenance (per month)", price: 100 },
  hosting: { name: "Hosting Setup (first year)", price: 500 },
  ssl: { name: "SSL Certificate", price: 100 },
};

export const ongoingCosts = {
  domain: { name: "Domain Name (per year)", price: 15 },
  hosting: { name: "Hosting (per year)", price: 300 },
  maintenance: { name: "Maintenance (per month)", price: 200 },
  ssl: { name: "SSL Certificate (per year)", price: 50 }
};

// Negotiation Configuration
export const negotiationConfig = {
  enabled: true,
  minAcceptableThreshold: 0.85, // Accept offers >= 85% of original
  autoRejectThreshold: 0.70,    // Auto-reject offers < 70% of original
  reviewThreshold: 0.80,        // Offers between 70-85% require manual review
  offerExpiryHours: 48           // Offers are valid for 48 hours
};
