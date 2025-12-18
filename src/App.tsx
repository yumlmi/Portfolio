import React, { Suspense, lazy, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Section from './components/Section'
import IntroVertical from './components/IntroVertical'
import './index.css'

// Projects を遅延読み込み（重ければ効果大）
const Projects = lazy(() => import('./components/Projects'))

const currentYear = new Date().getFullYear()

const App: React.FC = () => {
  // 背景画像のプリフェッチ（小さめの効果）
  useEffect(() => {
    const img = new Image()
    img.src = '/project/manuscript.png'
  }, [])

  return (
    <div className="relative min-h-screen text-ink overflow-hidden">
      {/* スキップリンク：キーボードユーザーが最初に見る要素 */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:top-4 focus:left-4 focus:absolute focus:z-50 bg-paper px-3 py-2 rounded shadow"
      >
        Skip to content
      </a>

      {/* 原稿用紙 背景（装飾）。スクリーンリーダーには非表示 */}
      <div
        className="absolute inset-0 -z-20 manuscript-bg"
        style={{
          backgroundImage: `url('/project/manuscript.png')`,
        }}
        aria-hidden="true"
        role="presentation"
      />

      {/* 読みやすさ用オーバーレイ（ここで紙色を指定） */}
      <div className="absolute inset-0 -z-10 bg-paper/92" aria-hidden="true" />

      <Header />

      <main id="main-content" className="relative z-10">
        <IntroVertical />

        <Hero />

        <Section id="projects" aria-labelledby="projects-heading">
          <h2 id="projects-heading" className="sr-only">Projects</h2>
          <Suspense fallback={<div className="py-8 text-center">Loading projects…</div>}>
            <Projects />
          </Suspense>
        </Section>
      </main>

      <footer className="relative z-10 text-center text-sm py-8 text-ink/60">
        © {currentYear} Your Name
      </footer>
    </div>
  )
}

export default App
