import React from 'react'
import manuscript from '../assets/manuscript.png'

const ChapterCard: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => {
  return (
    <div className="flex justify-center py-12">
      <div className="relative w-full max-w-3xl">
        {/* 背景紙（カード） */}
        <div
          className="absolute inset-0 -z-10 rounded-xl drop-shadow-lg bg-white overflow-hidden"
          style={{
            backgroundImage: `url(${manuscript})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: 0.95, // カード内はやや強め
          }}
        />

        <article className="relative p-12 bg-white/0 rounded-xl">
          {title && <h3 className="text-2xl font-serifen text-ink mb-6">{title}</h3>}
          <div className="prose prose-lg text-ink max-w-none">
            {children}
          </div>
        </article>
      </div>
    </div>
  )
}

export default ChapterCard
