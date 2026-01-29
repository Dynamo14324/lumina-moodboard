import { MonetizationConfig } from "./monetization";

/**
 * Generates an ethical Amazon Affiliate link for a movie.
 * This provides users with a direct path to purchase or rent the film.
 */
export function getAmazonAffiliateUrl(movieTitle: string): string {
    const baseUrl = "https://www.amazon.in/s";
    const tag = MonetizationConfig.affiliate.amazonTag;
    
    // Search query specifically for the movie on Prime Video / DVD
    const query = `${movieTitle} movie prime video`;
    const params = new URLSearchParams({
        k: query,
        tag: tag,
        ref: "lumina_discovery",
        language: "en_IN"
    });

    return `${baseUrl}?${params.toString()}`;
}

/**
 * Generates a Google search link as a fallback for "Watch Now"
 */
export function getWatchNowUrl(movieTitle: string): string {
    return `https://www.google.com/search?q=watch+${encodeURIComponent(movieTitle)}`;
}

/**
 * Generates an Amazon search link for a general query (e.g., "business books")
 */
export function getAmazonSearchUrl(query: string): string {
    const baseUrl = "https://www.amazon.in/s";
    const tag = MonetizationConfig.affiliate.amazonTag;
    const params = new URLSearchParams({
        k: query,
        tag: tag,
        ref: "lumina_mood_shop",
        language: "en_IN"
    });
    return `${baseUrl}?${params.toString()}`;
}
