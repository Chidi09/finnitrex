// lib/analytics.ts

// Declare the gtag function on the window object for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Log specific events
export const sendEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Pre-defined events for your specific tools
export const trackQuoteGeneration = (amount: number, packageName: string) => {
  sendEvent({
    action: "generate_quote",
    category: "Conversion",
    label: packageName,
    value: amount,
  });
};

export const trackCalculatorUse = (toolName: string, potentialSavings?: number) => {
  sendEvent({
    action: "use_tool",
    category: "Engagement",
    label: toolName,
    value: potentialSavings,
  });
};
