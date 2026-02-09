import React, { useLayoutEffect } from "react";

type ScrollIndicatorProps = {
  targetId: string;
  offset?: number; // overlay の下からどれだけ上げるか（px）
};

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  targetId,
  offset = 24,
}) => {
  useLayoutEffect(() => {
    const overlay = document.querySelector<HTMLElement>(".overlay");
    if (!overlay) return;

    const update = () => {
      // overlay の下端（viewport 相対）
      const rect = overlay.getBoundingClientRect();
      const overlayBottom = rect.bottom; // px, viewport top からの値
      // indicator の bottom 値 = window.innerHeight - overlayBottom + offset
      const bottomPx = Math.max(
        8,
        Math.round(window.innerHeight - overlayBottom + offset),
      );
      document.documentElement.style.setProperty(
        "--indicator-bottom",
        `${bottomPx}px`,
      );
    };

    // 画像読み込み待ち（img の場合）
    if ((overlay as HTMLImageElement).tagName === "IMG") {
      const img = overlay as HTMLImageElement;
      if (img.complete && img.naturalHeight !== 0) {
        update();
      } else {
        const onLoad = () => update();
        img.addEventListener("load", onLoad);
        // safety: 画像がエラーでも update を試す
        img.addEventListener("error", onLoad);
        // クリーンアップは以下の return にて行う
      }
    } else {
      // background-image 等のケース
      update();
    }

    // ResizeObserver で overlay のサイズ変化を追う
    const ro = new ResizeObserver(() => update());
    ro.observe(overlay);

    // ウィンドウリサイズ・orientationchange にも対応
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    // 初回：次フレームで確実に計算
    requestAnimationFrame(() => update());

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      if ((overlay as HTMLImageElement).tagName === "IMG") {
        const img = overlay as HTMLImageElement;
        img.removeEventListener("load", update);
        img.removeEventListener("error", update);
      }
    };
  }, [offset]);

  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className="scroll-indicator"
      onClick={handleClick}
      aria-label="View About"
    >
      View About
    </button>
  );
};

export default ScrollIndicator;
