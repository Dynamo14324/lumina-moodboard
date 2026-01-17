export const MonetizationConfig = {
  // Google AdSense Publisher ID (e.g., ca-pub-XXXXXXXXXXXXXXXX)
  // Set this in your Vercel Environment Variables as NEXT_PUBLIC_ADSENSE_ID
  adClient: process.env.NEXT_PUBLIC_ADSENSE_ID || "",

  // Ad Slot IDs (from your AdSense Dashboard)
  slots: {
    // Footer Banner (Responsive)
    footer: process.env.NEXT_PUBLIC_AD_SLOT_FOOTER || "",
    
    // Native Grid Card (Responsive/Fluid)
    card: process.env.NEXT_PUBLIC_AD_SLOT_CARD || "",
    
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
