
export type ConsentCategory = 'essential' | 'performance' | 'targeting';

export interface ConsentState {
    essential: boolean;
    performance: boolean;
    targeting: boolean;
    timestamp?: string;
}

export const DEFAULT_CONSENT: ConsentState = {
    essential: true, // Always true
    performance: false,
    targeting: false,
};

const COOKIE_NAME = 'finnitrex_consent';

export const getConsent = (): ConsentState | null => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(COOKIE_NAME);
    if (!stored) return null;
    try {
        return JSON.parse(stored);
    } catch {
        return null;
    }
};

export const saveConsent = (consent: ConsentState) => {
    if (typeof window === 'undefined') return;
    const finalConsent = { ...consent, essential: true, timestamp: new Date().toISOString() };
    localStorage.setItem(COOKIE_NAME, JSON.stringify(finalConsent));

    // Dispatch event so components can react
    window.dispatchEvent(new Event('consent-updated'));

    // Here we would trigger analytics initialization based on consent
    applyConsent(finalConsent);
};

export const applyConsent = (consent: ConsentState) => {
    if (typeof window === 'undefined') return;

    if (consent.performance) {
        console.log("Performance cookies allowed - initializing analytics...");
        // Initialize GA or other performance trackers here
        // window.gtag('consent', 'update', { ... })
    }

    if (consent.targeting) {
        console.log("Targeting cookies allowed - initializing marketing scripts...");
        // Initialize pixels, etc.
    }
};
