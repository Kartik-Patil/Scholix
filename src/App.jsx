import React, { useEffect, useRef } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Particles from './components/Particles'
import ScrollVideo from './components/ScrollVideo'
import { useScrollReveal, useCounter } from './hooks/useScrollReveal'

function CardIcon({ children }) {
  return <div className="card-icon">{children}</div>
}

function FixedCards() {
  const cardsRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const fixedCards = cardsRef.current
    const cardsGrid = gridRef.current
    let rafId

    function tickCards() {
      const trigger = document.getElementById('cards-trigger')
      if (!trigger) return
      
      const rect = trigger.getBoundingClientRect()
      const triggerTop = rect.top + window.scrollY
      const triggerHeight = rect.height
      const scrollY = window.scrollY
      const vh = window.innerHeight
      const start = triggerTop - vh * 0.5
      const end = triggerTop + triggerHeight - vh * 0.3
      const range = end - start
      
      let progress = range > 0 ? (scrollY - start) / range : 0
      progress = Math.max(0, Math.min(1, progress))
      
      const isActive = scrollY >= start - vh * 0.2 && scrollY <= end + vh * 0.3
      const fadeIn = Math.min(1, Math.max(0, (scrollY - (start - vh * 0.2)) / (vh * 0.2)))
      const fadeOut = Math.min(1, Math.max(0, (end + vh * 0.3 - scrollY) / (vh * 0.3)))
      const containerOpacity = isActive ? Math.min(fadeIn, fadeOut) : 0
      
      fixedCards.style.opacity = containerOpacity
      fixedCards.style.pointerEvents = containerOpacity > 0.1 ? 'auto' : 'none'
      
      const isMobile = window.innerWidth < 768
      const revealPct = progress * 130
      if (isMobile) {
        cardsGrid.style.maskImage = `linear-gradient(to bottom, black ${revealPct}%, transparent ${revealPct + 20}%)`
        cardsGrid.style.WebkitMaskImage = `linear-gradient(to bottom, black ${revealPct}%, transparent ${revealPct + 20}%)`
      } else {
        cardsGrid.style.maskImage = `linear-gradient(to right, black ${revealPct}%, transparent ${revealPct + 15}%)`
        cardsGrid.style.WebkitMaskImage = `linear-gradient(to right, black ${revealPct}%, transparent ${revealPct + 15}%)`
      }
      rafId = requestAnimationFrame(tickCards)
    }
    
    rafId = requestAnimationFrame(tickCards)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div id="fixed-cards" ref={cardsRef}>
      <div className="cards-grid" ref={gridRef}>
        <div className="feature-card">
          <CardIcon>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"/></svg>
          </CardIcon>
          <h3>Mission</h3>
          <p>Democratize access to premium education technology through AI-powered, affordable solutions.</p>
        </div>
        <div className="feature-card">
          <CardIcon>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>
          </CardIcon>
          <h3>Innovation</h3>
          <p>Continuously advancing education with machine learning, analytics, and intelligent automation.</p>
        </div>
        <div className="feature-card">
          <CardIcon>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/></svg>
          </CardIcon>
          <h3>Impact</h3>
          <p>Transforming academic workflows for students and institutions.</p>
        </div>
      </div>
    </div>
  )
}

function CounterStat({ target, unit, label, delayClass = "" }) {
  const ref = useRef(null)
  useCounter(ref, target)

  return (
    <div className={`stat reveal ${delayClass}`}>
      <div className="stat-num">
        <span className="counter" ref={ref}>0</span>
        <span className="stat-unit">{unit}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function App() {
  useScrollReveal()

  return (
    <>
      <ScrollVideo />
      <Particles />
      <FixedCards />
      <Nav />

      <div id="content">
        <Hero />

        <div style={{ height: '150vh' }}></div>
        <div id="cards-trigger" style={{ height: '200vh' }}></div>
        <div style={{ height: '100vh' }}></div>

        <section id="section-three">
          <div className="v8-glow"></div>
          <div className="v8-inner reveal" id="section-three-inner">
            <div className="pre-label">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
              </svg>
              Parent EdTech Company
            </div>
            <h2 className="v8-h2" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>About Scholix Mind</h2>
            <p className="v8-desc">
              A next-generation EdTech company focused on building intelligent academic ecosystems powered by AI, automation, analytics, and modern digital experiences.
            </p>
            <div className="v8-tags">
              <span className="v8-tag">India First</span>
              <span className="v8-tag">Built specifically for the Indian education ecosystem</span>
            </div>
          </div>
        </section>

        <div className="dark-block" id="products">
          <section id="stats">
            <div className="section-inner">
              <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <CounterStat target={10} unit="K+" label="Students" />
                <CounterStat target={100} unit="+" label="Institutions" delayClass="reveal-delay-1" />
                <CounterStat target={1} unit="M+" label="Records" delayClass="reveal-delay-2" />
              </div>
            </div>
          </section>

          <section id="ecosystem" style={{ padding: '8rem 0 4rem' }}>
            <div className="section-inner">
              <div className="section-header">
                <span className="section-label reveal">Products</span>
                <h2 className="reveal reveal-delay-1">Intelligent Platforms</h2>
              </div>
              <div className="eco-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                <div className="eco-card reveal">
                  <span className="eco-icon">📱</span>
                  <h4>EduAttend</h4>
                  <p>Smart Attendance & Academic Operations. Intelligent attendance tracking and academic engagement platform for schools and colleges.</p>
                  <span className="eco-tag core">Operations</span>
                  <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.6' }}>
                    <li>One-click attendance marking</li>
                    <li>Smart parent alerts & notifications</li>
                    <li>AI attendance analytics</li>
                    <li>Multi-role dashboards</li>
                    <li>Real-time reports & exports</li>
                    <li>QR & biometric-ready</li>
                  </ul>
                </div>
                <div className="eco-card reveal reveal-delay-1">
                  <span className="eco-icon">🎓</span>
                  <h4>EduPilot</h4>
                  <p>Modern College Management Platform. Complete academic management system for colleges with attendance, marks, and analytics.</p>
                  <span className="eco-tag addon">ERP & Intelligence</span>
                  <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.6' }}>
                    <li>Student & faculty management</li>
                    <li>Advanced academic analytics</li>
                    <li>Timetable & operations</li>
                    <li>Department dashboards</li>
                    <li>Parent portal access</li>
                    <li>Smart institutional workflows</li>
                  </ul>
                </div>
                <div className="eco-card reveal reveal-delay-2">
                  <span className="eco-icon">🧠</span>
                  <h4>CETup</h4>
                  <p>AI-Powered CET Preparation Platform. Smart preparation and performance platform for competitive exam aspirants.</p>
                  <span className="eco-tag community">Exam Preparation</span>
                  <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.6' }}>
                    <li>Mock CET/KCET/COMEDK examinations</li>
                    <li>AI learning analytics</li>
                    <li>Performance prediction</li>
                    <li>Smart practice engine</li>
                    <li>Student leaderboard</li>
                    <li>Personalized learning paths</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="how-it-works">
            <div className="section-inner">
              <div className="section-header">
                <span className="section-label reveal">Advantages</span>
                <h2 className="reveal reveal-delay-1">Why Choose Scholix Mind</h2>
              </div>
              <div className="steps" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                <div className="step reveal" style={{ gridTemplateColumns: '44px 1fr' }}>
                  <div className="step-line-col">
                    <div className="step-num"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg></div>
                  </div>
                  <div className="step-content" style={{ paddingBottom: '1rem' }}>
                    <h4>AI-Powered Automation</h4>
                    <p>Streamline complex workflows with intelligent algorithms that save time and reduce manual errors.</p>
                  </div>
                </div>
                <div className="step reveal reveal-delay-1" style={{ gridTemplateColumns: '44px 1fr' }}>
                  <div className="step-line-col">
                    <div className="step-num"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg></div>
                  </div>
                  <div className="step-content" style={{ paddingBottom: '1rem' }}>
                    <h4>Real-Time Analytics</h4>
                    <p>Gain instant insights into attendance, academic performance, and institutional health metrics.</p>
                  </div>
                </div>
                <div className="step reveal" style={{ gridTemplateColumns: '44px 1fr' }}>
                  <div className="step-line-col">
                    <div className="step-num"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg></div>
                  </div>
                  <div className="step-content" style={{ paddingBottom: '1rem' }}>
                    <h4>Student-Centric Design</h4>
                    <p>Interfaces and workflows built from the ground up to empower students and enhance learning outcomes.</p>
                  </div>
                </div>
                <div className="step reveal reveal-delay-1" style={{ gridTemplateColumns: '44px 1fr' }}>
                  <div className="step-line-col">
                    <div className="step-num"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg></div>
                  </div>
                  <div className="step-content" style={{ paddingBottom: '1rem' }}>
                    <h4>Institutional Scalability</h4>
                    <p>Designed to scale effortlessly from single schools to large multi-campus universities.</p>
                  </div>
                </div>
                <div className="step reveal" style={{ gridTemplateColumns: '44px 1fr' }}>
                  <div className="step-line-col">
                    <div className="step-num"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg></div>
                  </div>
                  <div className="step-content" style={{ paddingBottom: '1rem' }}>
                    <h4>Secure Cloud Infrastructure</h4>
                    <p>Enterprise-grade security ensuring student and institutional data is protected at all times.</p>
                  </div>
                </div>
                <div className="step reveal reveal-delay-1" style={{ gridTemplateColumns: '44px 1fr' }}>
                  <div className="step-line-col">
                    <div className="step-num"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg></div>
                  </div>
                  <div className="step-content" style={{ paddingBottom: '1rem' }}>
                    <h4>Modern User Experience</h4>
                    <p>Intuitive, clean, and fast interfaces that faculty and students actually love to use.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="experience" style={{ padding: '4rem 0' }}>
            <div className="section-inner">
              <div className="section-header">
                <span className="section-label reveal">Interface</span>
                <h2 className="reveal reveal-delay-1">Platform Experience</h2>
              </div>
              <div className="eco-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                <div className="eco-card reveal">
                  <span className="eco-icon">💻</span>
                  <h4>Desktop Dashboard</h4>
                  <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.6' }}>
                    <li>Full analytics dashboard</li>
                    <li>Advanced filtering & sorting</li>
                    <li>Bulk operations</li>
                    <li>Custom report generation</li>
                  </ul>
                </div>
                <div className="eco-card reveal reveal-delay-1">
                  <span className="eco-icon">📱</span>
                  <h4>Mobile & Tablet</h4>
                  <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.6' }}>
                    <li>Responsive design</li>
                    <li>Mobile applications</li>
                    <li>Tablet optimization</li>
                    <li>Real-time analytics</li>
                  </ul>
                </div>
                <div className="eco-card reveal reveal-delay-2">
                  <span className="eco-icon">🌐</span>
                  <h4>Browser Compatibility</h4>
                  <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.6' }}>
                    <li>Google Chrome</li>
                    <li>Mozilla Firefox</li>
                    <li>Apple Safari</li>
                    <li>Microsoft Edge</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="vision" style={{ padding: '4rem 0 8rem' }}>
            <div className="section-inner">
              <div className="section-header">
                <span className="section-label reveal">Roadmap</span>
                <h2 className="reveal reveal-delay-1">Future Vision</h2>
              </div>
              <div className="steps" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '40rem', margin: '0 auto' }}>
                <div className="step reveal">
                  <div className="step-line-col">
                    <div className="step-num" style={{ width: 80, borderRadius: 8 }}>Q2 2026</div>
                    <div className="step-connector"></div>
                  </div>
                  <div className="step-content" style={{ paddingBottom: '0' }}>
                    <h4>AI Academic Assistant & Predictive Analytics</h4>
                    <p>Integrating intelligent assistants to guide students and predicting institutional trends.</p>
                  </div>
                </div>
                <div className="step reveal reveal-delay-1">
                  <div className="step-line-col">
                    <div className="step-num" style={{ width: 80, borderRadius: 8 }}>Q3 2026</div>
                    <div className="step-connector"></div>
                  </div>
                  <div className="step-content" style={{ paddingBottom: '0' }}>
                    <h4>Face Recognition & Voice Systems</h4>
                    <p>Frictionless attendance with face recognition and voice-based learning interaction systems.</p>
                  </div>
                </div>
                <div className="step reveal reveal-delay-2">
                  <div className="step-line-col">
                    <div className="step-num" style={{ width: 80, borderRadius: 8 }}>Q4 2026</div>
                    <div className="step-connector" style={{ display: 'none' }}></div>
                  </div>
                  <div className="step-content" style={{ paddingBottom: '0' }}>
                    <h4>Personalized Learning AI & Smart Campus</h4>
                    <p>Fully adaptable learning paths driven by AI and a holistic smart campus ecosystem.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact">
            <div className="banner-glow"></div>
            <div className="banner-inner">
              <h2 className="banner-h2 reveal">Transform Education with <span className="gradient-text">Scholix Mind.</span></h2>
              <p className="banner-desc reveal reveal-delay-1">
                Ready to revolutionize your institution? Get in touch with our team today.
              </p>
              <div className="cta-row reveal reveal-delay-2">
                <a href="mailto:contact@scholixmind.in" className="btn-primary">
                  contact@scholixmind.in
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </a>
                <a href="tel:+917676621233" className="btn-secondary">
                  +91 7676621233
                </a>
              </div>
            </div>
          </section>

          <footer>
            <div className="section-inner">
              <div className="footer-grid">
                <div className="footer-brand">
                  <div className="footer-brand-logo">
                    <span className="logo-dot"></span>
                    ScholixMind
                  </div>
                  <p>A next-generation EdTech company building intelligent academic ecosystems powered by AI, automation, analytics, and modern digital experiences.</p>
                </div>
                <div className="footer-col">
                  <h5>Products</h5>
                  <a href="#">EduAttend</a>
                  <a href="#">EduPilot</a>
                  <a href="#">CETup</a>
                </div>
                <div className="footer-col">
                  <h5>Company</h5>
                  <a href="#about">About Us</a>
                  <a href="#vision">Vision & Roadmap</a>
                  <a href="#contact">Contact</a>
                </div>
                <div className="footer-col">
                  <h5>Contact</h5>
                  <span style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Email: contact@scholixmind.in</span>
                  <span style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Phone: +91 7676621233</span>
                  <span style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Location: Hubli, India</span>
                </div>
              </div>
              <div className="footer-bottom">
                <span className="footer-copy">© 2026 Scholix Mind. Built for the Indian education ecosystem.</span>
                <div className="footer-social">
                  <a href="#" aria-label="LinkedIn">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
