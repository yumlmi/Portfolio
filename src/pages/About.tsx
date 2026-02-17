// src/pages/About.tsx
import React from "react";
import "./About.css"; // About 固有スタイルがあれば

const About: React.FC = () => {
  return (
    <>
      <div className="about-wrap">
        <header className="about-header">
          <p className="about-eyebrow">About</p>
          <p className="about-lead">
            フロントエンドを中心に、フルスタックもできるエンジニアを目指す大学生。
            <br />
            近畿大学 情報学部 実世界コンピューティングコースに在学中。
          </p>
        </header>

        <div className="about-body">
          <p>
            大学に入ってからプログラミングを学び始め、今はWebアプリケーション開発を
            じっくり勉強している。
          </p>
          <p>
            ものづくりの中でも、見やすさや使いやすさを大切にしたUIが特に好き。
            しっかり意図を汲み取って、丁寧に仕上げることを心がけている。
          </p>
          <p>
            音楽をずっと続けていて、幼稚園の頃にピアノを始めた。
            今は大学の交響楽団でチェロを弾いていて、楽器を変えながら音楽を楽しんでいる。
          </p>
          <p>好きな楽器はギターとドラム。</p>
        </div>
      </div>
    </>
  );
};

export default About;
