import React from "react";

const Events: React.FC = () => {
  const events = [
    { date: "2024-10", title: "文学×UI カンファレンス 登壇", link: "#" },
    { date: "2023-06", title: "フロントエンド祭り ワークショップ", link: "#" },
  ];

  return (
    <section id="events" className="section-stack max-w-reading mx-auto py-12">
      <h2 className="text-2xl font-semibold mb-6">参加イベント</h2>
      <ul className="space-y-3">
        {events.map((e, i) => (
          <li key={i} className="flex justify-between items-start reading-paragraph">
            <div>
              <div className="font-medium">{e.title}</div>
              <div className="text-sm text-ink/70">{e.date}</div>
            </div>
            {e.link && (
              <a href={e.link} className="text-sm underline ml-4">
                詳細
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Events;
