import { MonetizationConfig } from "./monetization";

/**
 * Generates an ethical Amazon Affiliate link for a movie.
 * This provides users with a direct path to purchase or rent the film.
 */
export function getAmazonAffiliateUrl(movieTitle: string): string {
    const baseUrl = "https://www.amazon.com/s";
    const tag = MonetizationConfig.affiliate.amazonTag;
    
    // Search query specifically for the movie on Prime Video / DVD
    const query = `${movieTitle} movie prime video`;
    const params = new URLSearchParams({
        k: query,
        tag: tag,
        ref: "lumina_discovery"
    });

    return `${baseUrl}?${params.toString()}`;
}

/**
 * Generates a Google search link as a fallback for "Watch Now"
 */
export function getWatchNowUrl(movieTitle: string): string {
    return `https://www.google.com/search?q=watch+${encodeURIComponent(movieTitle)}`;
}
