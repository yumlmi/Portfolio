import React, { Suspense, lazy, useEffect } from "react";
import { usePrefetchAssets } from "./hooks/usePrefetchAssets";
import { ASSETS } from "./constants/assets";
import Header from "./components/Header";
import IntroVertical from "./components/IntroVertical";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import BookFlip from "./components/BookFlip";
import "./index.css";

const Projects = lazy(() => import("./components/Projects"));
const Events = lazy(() => import("./components/Events"));

const currentYear = new Date().getFullYear();

const App: React.FC = () => {
  usePrefetchAssets([
    {
      href: ASSETS.manuscriptAvif, // preferred
      as: "image",
      rel: "preload",
      decode: true,
      altFormats: [ASSETS.manuscriptWebp, ASSETS.manuscript], // webp, png fallback
    },
  ]);

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
        aria-hidden="true"
        role="presentation"
      />

      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{ backgroundColor: "rgba(251, 247, 239, 0.60)" }}
      />

      {/* ---------- ここに BookFlip を置きます（manuscript-bg と overlay の間） ---------- */}
      <BookFlip />
      {/* ------------------------------------------------------------------------------- */}

      {/* 読みやすさ用オーバーレイ（ここで紙色を指定） */}
      <div className="absolute inset-0 -z-10 bg-paper/92" aria-hidden="true" />

      <Header />

      <main id="main-content" className="relative z-10" tabIndex={-1}>
        <IntroVertical />

        <Suspense
          fallback={<div className="py-12 text-center">Loading...</div>}
        >
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
  );
};

export default App;
