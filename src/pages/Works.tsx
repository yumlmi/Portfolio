import React from "react";
import "./Works.css";

type WorkItem = {
  title: string;
  description: string;
  tech: string;
  link?: string;
};

const works: WorkItem[] = [
  {
    title: "Portfolio Site",
    description:
      "React + TypeScript で制作したポートフォリオサイト。レイアウト設計とUIの調整を中心に実装。",
    tech: "React / TypeScript / Vite",
    link: "https://yumlmi.github.io/Portfolio/",
  },
  {
    title: "桜の下で",
    description:
      "Unityで制作したノベルゲーム。シナリオとゲームの機能全般を担当。",
    tech: "Unity / C#",
    link: "https://github.com/yumlmi/Sakurano-Shitade",
  },
  {
    title: "PitchScout",
    description:
      "PythonとReactで制作した声域分析ツール。主にフロントエンドを担当。",
    tech: "Python / React / TypeScript",
  },
];

const Works: React.FC = () => {
  return (
    <div className="works-wrap">
      <header className="works-header">
        <p className="works-eyebrow">Works</p>
        <p className="works-lead">
          これまでに制作したもの、そしてこれから公開予定の制作物をまとめています。
        </p>
      </header>

      <div className="works-grid">
        {works.map((work) => (
          <article className="work-card" key={`${work.title}-${work.tech}`}>
            <h3 className="work-title">{work.title}</h3>
            <p className="work-description">{work.description}</p>
            <p className="work-tech">{work.tech}</p>
            {work.link ? (
              <a
                className="work-link"
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            ) : (
              <p className="work-link-placeholder">準備中</p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default Works;
