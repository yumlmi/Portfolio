import ScrollIndicator from "./components/ScrollIndicator";
import overlay from "./assets/overlay.png";
import "./App.css";
import About from "./pages/About";

function App() {
  return (
    <>
      <div className="hero-layer">
        <div className="hero-inner">
          {/* overlay画像 */}
          <img src={overlay} alt="" className="overlay" aria-hidden="true" />

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

          {/* hero-layer の中に戻す */}
          <ScrollIndicator targetId="about" />
        </div>
      </div>

      <section id="about" className="works-section">
        {/* About */}
        <About />
      </section>
    </>
  );
}

export default App;
