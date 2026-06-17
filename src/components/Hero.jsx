import { useEffect, useState } from 'react'

export default function Hero() {
  const [opacity, setOpacity] = useState(1)
  useEffect(() => {
    const onScroll = () => {
      const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.4))
      setOpacity(fade)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" style={{ opacity }}>
      <div className="hero-gradient-overlay" />
      <div className="hero-gradient-side" />

      <div className="hero-content">
        <div className="eyebrow hero-animate delay-1">
          <span className="eyebrow-line" />
          Introducing Scholix Mind
          <span className="eyebrow-line" />
        </div>

        <h1 className="hero-h1 hero-animate delay-2">
          Building the Future of
          <br />
          <span className="hero-underlined">
            <span className="hero-underline-bar" />
            <span>Smart Education</span>
          </span>
        </h1>

        <p className="hero-desc hero-animate delay-3">
          Software built for modern education—helping institutions manage academics, engage students, and unlock actionable insights.
        </p>

        <div className="hero-ctas hero-animate delay-4">
          <a href="#products" className="cta-btn">
            EXPERIENCE BUILDS
          </a>

          {/*<a href="#contact" className="cta-outline">Contact Us</a>*/}
        </div>

        {/*<div className="badge-row hero-animate delay-5">
          {[
            'AI-Powered',
            'Real-Time Analytics',
            'India First',
            'Secure Cloud',
          ].map((label, i) => (
            <div key={label} style={{ display: 'contents' }}>
              {i > 0 && <span className="badge-sep" />}
              <span className="badge">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {label}
              </span>
            </div>
          ))}
        </div>*/}
      </div>

    </section>
  )
}
