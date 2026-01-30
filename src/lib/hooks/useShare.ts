import { useState } from 'react';

interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

export function useShare() {
  const [copied, setCopied] = useState(false);

  const share = async (options: ShareOptions) => {
    try {
      if (navigator.share) {
        await navigator.share(options);
      } else {
        await navigator.clipboard.writeText(`${options.text} ${options.url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
        // Fallback to minimal copy
        await navigator.clipboard.writeText(options.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return { share, copied };
}
