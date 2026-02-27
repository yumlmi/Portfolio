import React from "react";
import "./Skills.css";

type SkillCategory = {
  title: string;
  items: {
    name: string;
    level: "初級" | "中級" | "上級";
  }[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    items: [
      { name: "React", level: "中級" },
      { name: "TypeScript", level: "中級" },
      { name: "JavaScript", level: "中級" },
      { name: "HTML", level: "上級" },
      { name: "CSS", level: "中級" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Java", level: "上級" },
      { name: "PHP", level: "初級" },
      { name: "Python", level: "初級" },
      { name: "Node.js", level: "初級" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", level: "中級" },
      { name: "GitHub", level: "中級" },
      { name: "Vite", level: "中級" },
      { name: "Unity", level: "中級" },
    ],
  },
];

const Skills: React.FC = () => {
  const totalSkills = skillCategories.reduce(
    (count, category) => count + category.items.length,
    0,
  );

  return (
    <div className="skills-wrap">
      <header className="skills-header">
        <p className="skills-eyebrow">Skills</p>
        <p className="skills-lead">
          フロントエンドを中心に、授業・個人開発で使っている技術をまとめています。
        </p>
        <p className="skills-summary">現在掲載中: {totalSkills} スキル</p>
      </header>

      <div className="skills-grid">
        {skillCategories.map((category) => (
          <article className="skills-card" key={category.title}>
            <div className="skills-card-head">
              <h3 className="skills-title">{category.title}</h3>
              <span className="skills-count">{category.items.length}</span>
            </div>

            <ul className="skills-list">
              {category.items.map((skill) => (
                <li
                  className="skills-item"
                  key={`${category.title}-${skill.name}`}
                >
                  <span className="skills-item-name">{skill.name}</span>
                  <span className="skills-item-divider" aria-hidden="true" />
                  <span className="skills-item-level">{skill.level}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Skills;
