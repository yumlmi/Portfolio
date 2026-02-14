import React from "react";
import "./About.css"; // 下の CSS をこのファイルに入れてください（またはモジュール化してもOK）

const About: React.FC = () => {
  return (
    <>
      <div className="hero-layer" role="region" aria-label="Hero">
        <div
          className="hero-inner"
          tabIndex={0}
          aria-label="Scrollable content"
        >
          <div className="profile">
            <div className="profile-title">Profile</div>
            {/* 実際のスクロールするテキストはここに入ります。
                今は短くても OK。長文にすればスクロールバーが出ます。 */}
            <div className="profile-body">
              <p>山下 結実 — Frontend / Backend Engineer</p>
              <p>
                ここに長めのテキストを入れると、この領域だけスクロールします。
                たとえば職務経歴や自己紹介、プロジェクトの説明など。
              </p>
              <p>
                （ここにもっと段落を追加してスクロールの動きを確認してみてください。）
              </p>
              <p>段落4</p>
              <p>段落5</p>
              <p>段落6</p>
              <p>段落7</p>
              <p>段落8</p>
            </div>
          </div>
        </div>

        {/* overlay は既に中央に配置済み（overlay.png） */}
        <img
          src="./assets/overlay.png"
          alt=""
          className="overlay"
          aria-hidden="true"
        />
      </div>
    </>
  );
};

export default About;
