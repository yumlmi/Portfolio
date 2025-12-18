import React from 'react'

type Props = {
  id?: string
  title?: string
  subtitle?: string
  bg?: 'dark' | 'darker'
  children: React.ReactNode
}

const Section: React.FC<Props> = ({
  id,
  title,
  subtitle,
  bg = 'dark',
  children,
}) => {
  const bgClass = bg === 'dark' ? 'bg-neutral-950' : 'bg-neutral-900'

  return (
    <section id={id} className={`${bgClass} py-24`}>
      <div className="max-w-6xl mx-auto px-6">
        {title && (
          <h2 className="text-3xl font-semibold tracking-tight mb-10">
            <span className="text-neutral-400 mr-2">/</span>
            {title}
            {subtitle && (
              <span className="ml-3 text-blue-400 text-base font-medium">
                {subtitle}
              </span>
            )}
          </h2>
        )}
        {children}
      </div>
    </section>
  )
}

export default Section
