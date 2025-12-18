import React from "react";

const Achievements: React.FC = () => {
  const items = [
    { year: 2024, title: "文学系デザイン賞 審査員特別賞", desc: "『月光の章』 プロダクトデザイン" },
    { year: 2023, title: "ハッカソン 最優秀賞", desc: "縦書きリーダーのプロトタイプ" },
  ];

  return (
    <section id="achievements" className="section-stack max-w-reading mx-auto py-12">
      <h2 className="text-2xl font-semibold mb-6">受賞・実績</h2>
      <ul className="space-y-4">
        {items.map((it, i) => (
          <li key={i} className="reading-paragraph">
            <strong>{it.year}</strong> — <span className="font-medium">{it.title}</span>
            <div className="text-sm text-ink/70 mt-1">{it.desc}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Achievements;
