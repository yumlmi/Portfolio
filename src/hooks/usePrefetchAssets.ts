// src/hooks/usePrefetchAssets.ts
import { useEffect } from "react";

type AssetDescriptor = {
  href: string;
  as?: string; // 'image' | 'script' | 'style' ...
  rel?: "preload" | "prefetch"; // default: preload
  decode?: boolean; // whether to create Image() and set decoding if supported (image only)
};

type Options = {
  enabled?: boolean; // allow disabling in tests or SSR
};

/**
 * usePrefetchAssets
 * - Safe for SSR (does nothing when document/window undefined)
 * - Adds <link rel="preload|prefetch" as="..." href="..."> to head for each asset
 * - Optionally warms image via new Image()
 *
 * Usage:
 * usePrefetchAssets([{ href: ASSETS.manuscript, as: 'image' }]);
 */
export function usePrefetchAssets(
  assets: AssetDescriptor[] | undefined,
  opts: Options = {}
) {
  useEffect(() => {
    if (!assets || assets.length === 0) return;
    if (opts.enabled === false) return;
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const createdLinks: HTMLLinkElement[] = [];
    const createdImages: HTMLImageElement[] = [];

    for (const a of assets) {
      // create link
      const link = document.createElement("link");
      link.rel = a.rel ?? "preload";
      if (a.as) link.as = a.as;
      link.href = a.href;
      // avoid duplicate preloads by checking existing
      const exists = Array.from(document.head.querySelectorAll("link")).some(
        (l) => l.href === link.href && l.rel === link.rel
      );
      if (!exists) {
        document.head.appendChild(link);
        createdLinks.push(link);
      }

      // optionally warm image cache (for images)
      if (
        (a.as === "image" || /\.png$|\.jpe?g$|\.webp$|\.avif$/i.test(a.href)) &&
        a.decode
      ) {
        try {
          const img = new Image();
          img.src = a.href;
          // decoding is not on typings in some environments
          if ("decoding" in img) {
            img.decoding = "async";
          }
          createdImages.push(img);
        } catch (e) {
          // ignore image warming errors
        }
      }
    }

    return () => {
      // cleanup created links
      for (const l of createdLinks) {
        if (l.parentNode) l.parentNode.removeChild(l);
      }
      // drop references to images so GC can collect
      createdImages.length = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(assets), opts.enabled]);
}
