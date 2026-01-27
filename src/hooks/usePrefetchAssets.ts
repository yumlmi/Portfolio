// src/hooks/usePrefetchAssets.ts
import { useEffect } from "react";

export type AssetDescriptor = {
  href: string;
  as?: string; // 'image' | 'script' | 'style' ...
  rel?: "preload" | "prefetch";
  decode?: boolean; // whether to create Image() and set decoding if supported (image only)
  altFormats?: string[]; // other format URLs for images (e.g. [webp, png]) to include in imagesrcset
};

type Options = {
  enabled?: boolean;
};

/**
 * usePrefetchAssets
 * - Safe for SSR (does nothing when document/window undefined)
 * - Adds <link rel="preload|prefetch" as="..." href="..."> to head for each asset
 * - If altFormats provided for an image, sets imagesrcset on a single preload link so browser can choose
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
      const link = document.createElement("link");
      link.rel = a.rel ?? "preload";
      link.as = (a.as as string) ?? "image";
      link.href = a.href;

      // If altFormats provided, build imagesrcset so a single preload covers alternatives
      if (Array.isArray(a.altFormats) && a.altFormats.length > 0) {
        // build srcset string: "preferred.avif 1x, alt.webp 1x, fallback.png 1x"
        const items = [a.href, ...a.altFormats].map((u) => `${u} 1x`);
        // imagesrcset is not well-typed on HTMLLinkElement across lib versions, so cast to any
        (link as any).imagesrcset = items.join(", ");
        // optional: set imagesizes if you know expected display size
        // (link as any).imagesizes = '100vw';
      }

      // avoid duplicate preloads by checking existing
      const exists = Array.from(document.head.querySelectorAll("link")).some(
        (l) =>
          l.getAttribute("href") === link.href &&
          l.getAttribute("rel") === link.rel
      );
      if (!exists) {
        document.head.appendChild(link);
        createdLinks.push(link);
      }

      // optionally warm image cache (for images)
      const isImage =
        a.as === "image" ||
        /\.(png|jpe?g|webp|avif|gif)$/i.test(a.href) ||
        (Array.isArray(a.altFormats) && a.altFormats.length > 0);
      if (isImage && a.decode) {
        try {
          const img = new Image();
          img.src = a.href;
          if ("decoding" in img) {
            (img as any).decoding = "async";
          }
          createdImages.push(img);
        } catch (e) {
          // ignore image warming errors
        }
      }
    }

    return () => {
      for (const l of createdLinks) {
        if (l.parentNode) l.parentNode.removeChild(l);
      }
      // allow GC for warmed images
      createdImages.length = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(assets), opts.enabled]);
}
