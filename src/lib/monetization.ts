export const MonetizationConfig = {
  // Google AdSense Publisher ID (e.g., ca-pub-XXXXXXXXXXXXXXXX)
  // Set this in your Vercel Environment Variables as NEXT_PUBLIC_ADSENSE_ID
  // FOUND ID: ca-pub-1905791110469823 (Active/Pending Review)
  adClient: process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-1905791110469823",

  // Ad Slot IDs (from your AdSense Dashboard)
  slots: {
    // Footer Banner (Responsive)
    footer: process.env.NEXT_PUBLIC_AD_SLOT_FOOTER || "2976334192", 
    
    // Native Grid Card (Responsive/Fluid)
    card: process.env.NEXT_PUBLIC_AD_SLOT_CARD || "9553350837",
    
    // Sidebar/Feed (Optional)
    sidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || "",
    feed: process.env.NEXT_PUBLIC_AD_SLOT_FEED || "",
  },

  // Affiliate / Partnership Settings
  affiliate: {
    amazonTag: "yogeshjadha09-21", // Update with your Amazon Associate Tag
    merchEnabled: true,
  },

  // Feature Flags
  enableAds: true, 
  testMode: process.env.NODE_ENV === "development",
};
