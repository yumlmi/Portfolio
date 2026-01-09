// Events.tsx
import React from 'react'

const Events: React.FC = () => {
  return (
    <section className="py-24">
      <div className="events-timeline">
        {/* 上の横線 */}
        <div className="timeline-line top" />

        {/* 年ブロック */}
        <div className="timeline-years">
          {/* 2025 */}
          <div className="timeline-column">
            <div className="timeline-year">2025</div>

              {/* 年と内容の区切り線 */}
            <div className="timeline-divider" />
            <div className="timeline-vertical vertical-text">
              <p>
                12月
                <br />
                ・Kindai GPT Hackathon
                <br />
                <span className="timeline-offset">
                    ー参加
                    </span>
              </p>
            </div>
          </div>

          {/* 2024 */}
          <div className="timeline-column">
            <div className="timeline-year">2024</div>
            <div className="timeline-divider" />
            <div className="timeline-vertical vertical-text">
              <p>
                4月
                <br />
                ・プログラミングブートキャンプ
                <br />
                <span className="timeline-offset">
                    ーゼミ内優秀賞
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 下の横線 */}
        <div className="timeline-line bottom" />
      </div>
    </section>
  )
}

export default Events
