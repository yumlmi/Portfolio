import React from "react";

type Props = {
  id?: string;
  className?: string;
  title?: React.ReactNode;
  ariaLabel?: string;
  children: React.ReactNode;
};

const VerticalTextSection: React.FC<Props> = ({
  id,
  className = "",
  title,
  ariaLabel,
  children,
}) => {
  return (
    <section id={id} aria-label={ariaLabel} className={`py-24 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-center">
        <div className="vertical-text text-ink font-serifjp text-lg md:text-xl">
          {title && (
            <h2 className="sr-only md:not-sr-only text-xl font-semibold mb-6">
              {title}
            </h2>
          )}
          <p>{children}</p>
        </div>
      </div>
    </section>
  );
};

export default VerticalTextSection;
