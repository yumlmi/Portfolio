import React from "react";

type ScrollIndicatorProps = {
  targetId: string;
  addHash?: boolean;
};

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  targetId,
  addHash = true,
}) => {
  const handleScroll = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    const target = document.getElementById(targetId);

    if (!target) {
      console.warn(`Element with id="${targetId}" not found.`);
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    if (addHash) {
      const newHash = `#${targetId}`;
      if (window.history && window.history.pushState) {
        window.history.pushState(null, "", newHash);
      } else {
        window.location.hash = newHash;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      handleScroll(e);
    }
  };

  return (
    <button
      type="button"
      className="scroll-indicator"
      onClick={handleScroll}
      onKeyDown={handleKeyDown}
      aria-label={`Scroll to ${targetId}`}
    >
      <span aria-hidden="true">Scroll</span>
    </button>
  );
};

export default ScrollIndicator;
