import { useEffect, useRef } from "react";
import ScrollIndicator from "./components/ScrollIndicator";
import overlay from "./assets/overlay.png";
import "./App.css";
import About from "./pages/About";
import Works from "./pages/Works";
import Skills from "./pages/Skills";

function App() {
  const SECTION_OFFSET_PX = 100;

  const heroInnerRef = useRef<HTMLDivElement>(null);
  const heroTopRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const worksSectionRef = useRef<HTMLElement>(null);
  const skillsSectionRef = useRef<HTMLElement>(null);
  const sectionIndexRef = useRef(0);
  const wheelLockRef = useRef(false);
  const wheelDeltaBufferRef = useRef(0);

  const scrollToSection = (
    index: number,
    behavior: ScrollBehavior = "smooth",
  ) => {
    const container = heroInnerRef.current;
    const sections = [
      heroTopRef.current,
      aboutSectionRef.current,
      worksSectionRef.current,
      skillsSectionRef.current,
    ].filter((section): section is HTMLElement => section !== null);

    if (!container || sections.length === 0) {
      return;
    }

    const clampedIndex = Math.max(0, Math.min(index, sections.length - 1));
    sectionIndexRef.current = clampedIndex;
    const target = sections[clampedIndex];

    container.scrollTo({
      top: Math.max(target.offsetTop - SECTION_OFFSET_PX, 0),
      behavior,
    });
  };

  useEffect(() => {
    const container = heroInnerRef.current;
    if (container) {
      container.scrollTo({ top: 0, behavior: "auto" });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const container = heroInnerRef.current;
    if (!container) {
      return;
    }

    const WHEEL_TRIGGER_THRESHOLD = 70;
    let wheelBufferResetTimer: number | null = null;

    const lockWheel = () => {
      wheelLockRef.current = true;
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 650);
    };

    const resetWheelBufferSoon = () => {
      if (wheelBufferResetTimer !== null) {
        window.clearTimeout(wheelBufferResetTimer);
      }

      wheelBufferResetTimer = window.setTimeout(() => {
        wheelDeltaBufferRef.current = 0;
      }, 160);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (wheelLockRef.current) {
        return;
      }

      wheelDeltaBufferRef.current += event.deltaY;
      resetWheelBufferSoon();

      if (Math.abs(wheelDeltaBufferRef.current) < WHEEL_TRIGGER_THRESHOLD) {
        return;
      }

      const direction = Math.sign(wheelDeltaBufferRef.current);
      wheelDeltaBufferRef.current = 0;

      const nextIndex = sectionIndexRef.current + direction;
      scrollToSection(nextIndex);
      lockWheel();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        scrollToSection(sectionIndexRef.current + 1);
      }

      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        scrollToSection(sectionIndexRef.current - 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        scrollToSection(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        scrollToSection(999);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (wheelBufferResetTimer !== null) {
        window.clearTimeout(wheelBufferResetTimer);
      }
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="hero-layer">
        {/* overlay画像（固定背景） */}
        <img src={overlay} alt="" className="overlay" aria-hidden="true" />
        <div className="hero-inner" ref={heroInnerRef}>
          <div className="hero-top" ref={heroTopRef}>
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
            <ScrollIndicator
              targetId="about"
              containerRef={heroInnerRef}
              targetRef={aboutSectionRef}
            />
          </div>

          {/* ここに #about を配置（about セクションは hero-inner の外ではなく中） */}
          <section id="about" className="about-section" ref={aboutSectionRef}>
            <About />
          </section>

          <section id="works" className="works-section" ref={worksSectionRef}>
            <Works />
          </section>

          <section
            id="skills"
            className="skills-section"
            ref={skillsSectionRef}
          >
            <Skills />
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
