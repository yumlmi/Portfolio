import React from "react";

const Skills: React.FC = () => {
  const groups = {
    "Frontend": ["React", "TypeScript", "Tailwind CSS", "Vite"],
    "Design": ["Figma", "Motion Design", "Accessible UI"],
    "Other": ["Node.js", "Testing (Jest/RTL)", "CI/CD"]
  };

  return (
    <section id="skills" className="section-stack max-w-reading mx-auto py-12">
      <h2 className="text-2xl font-semibold mb-6">スキル一覧</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Object.entries(groups).map(([k, arr]) => (
          <div key={k}>
            <div className="text-sm font-medium mb-2">{k}</div>
            <ul className="list-disc pl-5 reading-paragraph">
              {arr.map((s) => (
                <li key={s} className="text-sm">{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
