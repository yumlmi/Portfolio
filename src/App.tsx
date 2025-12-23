// App.tsx
import React, { Suspense, lazy, useEffect } from 'react'
import Header from './components/Header'
import IntroVertical from './components/IntroVertical'
import Skills from './components/Skills'
import Contact from './components/Contact'
import './index.css'

// 重めのページパーツは遅延ロード（必要に応じて追加）
const Projects = lazy(() => import('./components/Projects'))
const Events = lazy(() => import('./components/Events'))

const currentYear = new Date().getFullYear()

const App: React.FC = () => {
  // 背景画像プリロード（new Image + rel=preload のハイブリッド）
  useEffect(() => {
    // 1) new Image() で早期キャッシュ
    const img = new Image()
    img.src = '/project/manuscript.png'
    // 非同期デコード（軽い最適化）
    // @ts-ignore - decoding may not exist on older TS lib types
    if (typeof img.decoding !== 'undefined') img.decoding = 'async'

    // 2) ブラウザ優先度を上げるため <link rel="preload">
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = '/project/manuscript.png'
    document.head.appendChild(link)

    return () => {
      // クリーンアップ
      if (link.parentNode) link.parentNode.removeChild(link)
    }
  }, [])

  return (
    <div className="relative min-h-screen text-ink overflow-hidden">
      {/* スキップリンク */}
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

      {/* 読みやすさ用オーバーレイ */}
      <div className="absolute inset-0 -z-10 bg-paper/92" aria-hidden="true" />

      <Header />

      <main id="main-content" className="relative z-10" tabIndex={-1}>
        <IntroVertical />

        {/* 遅延ロードされたコンポーネントは Suspense で包む */}
        <Suspense fallback={<div className="py-12 text-center">Loading...</div>}>
          <Projects />
          <Events />
        </Suspense>

        <Skills />
        <Contact />
      </main>

      <footer className="relative z-10 text-center text-sm py-8 text-ink/60">
        © {currentYear} Yumi Yamashita
      </footer>
    </div>
  )
}

export default App
