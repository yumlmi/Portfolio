import React from 'react'

type Props = {
  className?: string
  /** SVG height in px (visual) */
  height?: number
  /** stroke color (will be applied via currentColor) */
  colorClass?: string
}

/**
 * ConstellationDivider
 * - Uses stroke="currentColor", so pass a Tailwind color class via `colorClass` (e.g. "text-blue-400/60")
 * - Place between sections: <ConstellationDivider />
 */
const ConstellationDivider: React.FC<Props> = ({ className = '', height = 120, colorClass = 'text-blue-400/50' }) => {
  // coordinates for a gentle polyline across the width (percent converted below)
  const points = [
    [5, 60],
    [20, 30],
    [38, 55],
    [55, 25],
    [72, 60],
    [88, 40],
    [95, 65],
  ] as const

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
        className={`${colorClass} block w-full`}
        style={{ height }}
      >
        {/* soft background faint line for depth */}
        <polyline
          points={points.map(([x, y]) => `${x},${y}`).join(' ')}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.25}
          opacity={0.14}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* main constellation line */}
        <polyline
          points={points.map(([x, y]) => `${x},${y}`).join(' ')}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.6}
          opacity={0.28}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* stars (circles) */}
        {points.map(([x, y], i) => {
          // vary radius slightly
          const r = [0.9, 0.7, 1.0, 0.6, 1.1, 0.8, 0.9][i] ?? 0.8
          // pick some to twinkle
          const shouldTwinkle = i % 3 === 0
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              className={shouldTwinkle ? 'twinkle' : ''}
              fill="currentColor"
              opacity={0.95}
            />
          )
        })}

        {/* decorative tiny sparkles (very faint) */}
        <g opacity="0.14">
          <circle cx="12" cy="20" r="0.5" fill="currentColor" />
          <circle cx="42" cy="12" r="0.45" fill="currentColor" />
          <circle cx="78" cy="18" r="0.4" fill="currentColor" />
        </g>
      </svg>
    </div>
  )
}

export default ConstellationDivider