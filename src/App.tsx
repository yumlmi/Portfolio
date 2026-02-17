import { useEffect } from "react";
import ScrollIndicator from "./components/ScrollIndicator";
import overlay from "./assets/overlay.png";
import "./App.css";
import About from "./pages/About";

function App() {
  useEffect(() => {
    const container = document.querySelector(
      ".hero-inner",
    ) as HTMLElement | null;
    if (container) {
      container.scrollTo({ top: 0, behavior: "auto" });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <div className="hero-layer">
        {/* overlay画像（固定背景） */}
        <img src={overlay} alt="" className="overlay" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-top">
            <div className="profile">
              <div className="profile-title">Profile</div>
              <div className="name-block">
                <h1 className="name-ja">山下 結実</h1>
                <p className="name-en">Yumi Yamashita</p>
              </div>
              <p className="role">Frontend/Backend Engineer</p>
              <p className="stack-label">Skills</p>
              <p className="stack">React・TypeScript・PHP</p>
              <a
                className="github"
                href="https://github.com/yumlmi"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/yumlmi
              </a>
              <p className="location">Based in Osaka</p>
              <p className="education">
                近畿大学 情報学部 情報学科
                <br />
                実世界コンピューティングコース
              </p>
              <div className="contact">
                <p className="contact-label">Contact</p>
                <a className="contact-mail" href="mailto:y.yumi.0601@gmail.com">
                  y.yumi.0601@gmail.com
                </a>
              </div>
            </div>

            {/* hero-inner の中に about を置くことで内部スクロールで見えるようにする */}
            <ScrollIndicator targetId="about" />
          </div>

          {/* ここに #about を配置（about セクションは hero-inner の外ではなく中） */}
          <section id="about" className="about-section">
            <About />
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
