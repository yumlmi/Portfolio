import React from "react";

const Summary: React.FC = () => {
  return (
    <section id="summary" className="section-stack max-w-reading mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">ポートフォリオまとめ</h1>
      <p className="reading-paragraph">
        小説をモチーフにしたUI/UXデザインとフロントエンド実装を中心に活動するフロントエンドエンジニア。  
        フロントエンド実装・アニメーション・アクセシビリティ改善を得意とし、UIで物語を伝えることを目標にしています。
      </p>
      <p className="reading-paragraph">
        ここでは代表的なプロジェクト、受賞、参加イベント、スキルを時系列とカテゴリでまとめています。
      </p>
    </section>
  );
};

export default Summary;
