import React from 'react'

type Props = {
  id?: string
  title: string
  children: React.ReactNode
  subtitle?: string
}

const ChapterSection: React.FC<Props> = ({ id, title, subtitle, children }) => {
  return (
    <section id={id} className="py-16 bg-paper">
      <div className="max-w-reading mx-auto px-6">
        <header className="text-center">
          <h2 className="text-2xl font-serifen text-ink">{title}</h2>
          {subtitle && <p className="text-sm text-ink/70 mt-2">{subtitle}</p>}
          {/* 装飾 */}
          <svg className="chapter-ornament" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5 C20 0, 80 0, 95 5" stroke="#2543eb" strokeWidth="0.6" fill="none" strokeLinecap="round" />
          </svg>
        </header>

        <div className="mt-6 prose prose-lg prose-ink">
          {children}
        </div>
      </div>
    </section>
  )
}

export default ChapterSection
