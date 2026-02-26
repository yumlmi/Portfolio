import React from "react";

type Props = {
  targetId: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  targetRef: React.RefObject<HTMLElement | null>;
};

export default function ScrollIndicator({
  targetId,
  containerRef,
  targetRef,
}: Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const container = containerRef.current;
    const fallbackTarget = container?.querySelector(`#${targetId}`) as
      | HTMLElement
      | null;
    const target = targetRef.current ?? fallbackTarget;

    if (container && target) {
      const offsetTop = target.offsetTop - 100;
      container.scrollTo({
        top: Math.max(offsetTop, 0),
        behavior: "smooth",
      });
    } else if (target) {
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
