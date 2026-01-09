// components/BookFlip.tsx
import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

type BookFlipProps = {
  initialLeftFlipped?: boolean;
  initialRightFlipped?: boolean;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
};

const BookFlip: React.FC<BookFlipProps> = ({
  initialLeftFlipped = false,
  initialRightFlipped = false,
  leftContent,
  rightContent,
  className = "",
}) => {
  // left: flips to show next page (advance)
  // right: flips to show previous page (back)
  const [leftFlipped, setLeftFlipped] = useState(initialLeftFlipped);
  const [rightFlipped, setRightFlipped] = useState(initialRightFlipped);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  const goNext = useCallback(() => {
    // next = advance => flip left page forward
    setLeftFlipped(true);
    // ensure right page not flipped forward when advancing
    setRightFlipped(false);
  }, []);

  const goPrev = useCallback(() => {
    // prev = back => flip right page backward
    setRightFlipped(true);
    // ensure left page not flipped when going back
    setLeftFlipped(false);
  }, []);

  // optional: "reset" after animation end so repeated flips behave sensibly
  // we listen animationend via CSS? simpler: use timeout roughly equal to transition
  useEffect(() => {
    if (leftFlipped) {
      const t = setTimeout(() => {
        // keep flipped state if you want pages to remain flipped; here we keep them flipped
        // If you want them to auto-reset, setLeftFlipped(false) here.
      }, 750);
      return () => clearTimeout(t);
    }
  }, [leftFlipped]);

  useEffect(() => {
    if (rightFlipped) {
      const t = setTimeout(() => {
        // same note as above
      }, 750);
      return () => clearTimeout(t);
    }
  }, [rightFlipped]);

  // window key handler: → next (left), ← prev (right), Enter/Space toggle left (advance)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const active = document.activeElement;
      if (
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          (active as HTMLElement).isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        goPrev();
      } else if (e.key === "Enter" || e.key === " ") {
        // toggle next as default
        goNext();
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // Portal controls (always clickable)
  const ControlsPortal = (
    <div className="book-controls-portal" aria-hidden={false}>
      <div className="book-controls-inner" role="toolbar" aria-label="本の操作">
        <button
          aria-label="前のページ"
          className="book-btn prev"
          onClick={goPrev}
          type="button"
        >
          ◀
        </button>
        <button
          aria-label="次のページ"
          className="book-btn next"
          onClick={goNext}
          type="button"
        >
          ▶
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`bookflip-root ${className} ${
          prefersReducedMotion ? "reduced-motion" : ""
        }`}
        role="region"
        aria-label="見開きの本"
      >
        <div className="bookflip-scene" tabIndex={0} aria-hidden={false}>
          {/* Left page: when flipped = rotateY(180deg) around right edge */}
          <div
            className={`book-page book-page-left ${
              leftFlipped ? "flipped" : ""
            }`}
            aria-hidden={leftFlipped}
          >
            <div className="page-inner">{leftContent ?? <DefaultLeft />}</div>
          </div>

          {/* Right page: when flipped = rotateY(-180deg) around left edge */}
          <div
            className={`book-page book-page-right ${
              rightFlipped ? "flipped" : ""
            }`}
            aria-hidden={rightFlipped}
          >
            <div className="page-inner">{rightContent ?? <DefaultRight />}</div>
          </div>
        </div>
      </div>

      {mounted && typeof document !== "undefined"
        ? createPortal(ControlsPortal, document.body)
        : null}
    </>
  );
};

const DefaultLeft: React.FC = () => <div className="book-placeholder left" />;
const DefaultRight: React.FC = () => <div className="book-placeholder right" />;

export default React.memo(BookFlip);
