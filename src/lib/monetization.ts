export const MonetizationConfig = {
  // Google AdSense Publisher ID (e.g., ca-pub-XXXXXXXXXXXXXXXX)
  // Set this in your Vercel Environment Variables as NEXT_PUBLIC_ADSENSE_ID
  // FOUND ID: ca-pub-8643583392271098 (Note: Account currently shows as Closed/Inactive)
  adClient: process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-8643583392271098",

  // Ad Slot IDs (from your AdSense Dashboard)
  slots: {
    // Footer Banner (Responsive)
    footer: process.env.NEXT_PUBLIC_AD_SLOT_FOOTER || "1234567890", // Placeholder until new slots generated
    
    // Native Grid Card (Responsive/Fluid)
    card: process.env.NEXT_PUBLIC_AD_SLOT_CARD || "0987654321", // Placeholder
    
    // Sidebar/Feed (Optional)
    sidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || "",
  },

  // Affiliate / Partnership Settings
  affiliate: {
    amazonTag: "lumina-20", // Update with your Amazon Associate Tag
    merchEnabled: true,
  },

  // Feature Flags
  enableAds: true, 
  testMode: process.env.NODE_ENV === "development",
};
