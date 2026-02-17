import React from "react";

type Props = {
  targetId: string;
};

export default function ScrollIndicator({ targetId }: Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // hero-inner をスクロールコンテナとして明示的に取得
    const container = document.querySelector(".hero-inner");
    const target = container?.querySelector(
      `#${targetId}`,
    ) as HTMLElement | null;

    if (container && target) {
      // target が container の中にあることを前提にスクロール
      // container.scrollTo を使ってスムースにスクロール（より確実）
      const offsetTop = target.offsetTop - 100;
      container.scrollTo({
        top: Math.max(offsetTop, 0),
        behavior: "smooth",
      });
      // 代替：target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (target) {
      // もし container が見つからない（フォールバック）
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button
      className="scroll-indicator"
      onClick={handleClick}
      aria-label="Scroll to about"
    >
      Scroll
    </button>
  );
}
