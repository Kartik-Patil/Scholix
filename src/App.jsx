import React, { useEffect, useRef } from 'react'
import logo from './assests/SLiver-logo.png'
import eduAttendLogo from './assests/EduAttend_logo.png'
import eduPilotLogo from './assests/EduPilot_logo.png'
import cetupLogo from './assests/CETup_logo.png'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Particles from './components/Particles'
import ScrollVideo from './components/ScrollVideo'
import { useScrollReveal, useCounter } from './hooks/useScrollReveal'



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
          <h3>Vision</h3>
          <p>To build the operational backbone of modern education, empowering institutions to focus entirely on student success.</p>
        </div>
        <div className="feature-card">
          <h3>Innovation</h3>
          <p>Replacing fragmented, legacy systems with a unified platform that just works—driven by clean data and seamless workflows.</p>
        </div>
        <div className="feature-card">
          <h3>Impact</h3>
          <p>Eliminating thousands of hours of manual administrative work across campuses, driving measurable academic growth.</p>
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
                <CounterStat target={1000} unit="+" label="Students" />
                <CounterStat target={10} unit="+" label="Institutions" delayClass="reveal-delay-1" />
                <CounterStat target={45} unit="+" label="Active Modules" delayClass="reveal-delay-2" />
              </div>
            </div>
          </section>

          <section id="ecosystem" style={{ padding: '8rem 0 4rem' }}>
            <div className="section-inner">
              <div className="section-header">
                <span className="section-label reveal">Products</span>
                <h1 className="reveal reveal-delay-1">Intelligent Platforms</h1>
              </div>
              <div className="eco-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                <div className="eco-card reveal reveal-delay-2">
                  <h2 style={{ marginBottom: '1rem' }}>CETup</h2>
                  <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>AI-Powered CET Preparation Platform. Smart preparation and performance platform for competitive exam aspirants.</p>
                  <span className="eco-tag community">Exam Preparation</span>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={cetupLogo} alt="CETup Logo" style={{ height: '124px', width: 'auto', objectFit: 'contain', filter: 'grayscale(0) brightness(1.2)' }} />
                  </div>
                  <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    <li>Mock CET/KCET/COMEDK examinations</li>
                    <li>AI learning analytics</li>
                    <li>Performance prediction</li>
                    <li>Smart practice engine</li>
                    <li>Student leaderboard</li>
                    <li>Personalized learning paths</li>
                  </ul>
                </div>
                <div className="eco-card reveal reveal-delay-1">
                  <h2 style={{ marginBottom: '1rem' }}>EduPilot</h2>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>Modern College Management Platform. Complete academic management system for colleges with attendance, marks, and analytics.</p>
                  <span className="eco-tag addon">ERP & Intelligence</span>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={eduPilotLogo} alt="EduPilot Logo" style={{ height: '144px', width: 'auto', objectFit: 'contain', filter: 'grayscale(0) brightness(1.2)' }} />
                  </div>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    <li>Student & faculty management</li>
                    <li>Advanced academic analytics</li>
                    <li>Timetable & operations</li>
                    <li>Department dashboards</li>
                    <li>Parent portal access</li>
                    <li>Smart institutional workflows</li>
                  </ul>
                </div>
                <div className="eco-card reveal">
                  <h2 style={{ marginBottom: '1rem' }}>EduAttend</h2>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>Smart Attendance & Academic Operations. Intelligent attendance tracking and academic engagement platform for schools and colleges.</p>
                  <span className="eco-tag core">Operations</span>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={eduAttendLogo} alt="EduAttend Logo" style={{ height: '124px', width: 'auto', objectFit: 'contain', filter: 'grayscale(0) brightness(1.2)' }} />
                  </div>
                  <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    <li>One-click attendance marking</li>
                    <li>Smart parent alerts & notifications</li>
                    <li>AI attendance analytics</li>
                    <li>Multi-role dashboards</li>
                    <li>Real-time reports & exports</li>

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
                    <div className="step-num">1</div>
                  </div>
                  <div className="step-content" style={{ paddingBottom: '1rem' }}>
                    <h4>AI-Powered Automation</h4>
                    <p>Streamline complex workflows with intelligent algorithms that save time and reduce manual errors.</p>
                  </div>
                </div>
                <div className="step reveal reveal-delay-1" style={{ gridTemplateColumns: '44px 1fr' }}>
                  <div className="step-line-col">
                    <div className="step-num">2</div>
                  </div>
                  <div className="step-content" style={{ paddingBottom: '1rem' }}>
                    <h4>Real-Time Analytics</h4>
                    <p>Gain instant insights into attendance, academic performance, and institutional health metrics.</p>
                  </div>
                </div>
                <div className="step reveal" style={{ gridTemplateColumns: '44px 1fr' }}>
                  <div className="step-line-col">
                    <div className="step-num">3</div>
                  </div>
                  <div className="step-content" style={{ paddingBottom: '1rem' }}>
                    <h4>Student-Centric Design</h4>
                    <p>Interfaces and workflows built from the ground up to empower students and enhance learning outcomes.</p>
                  </div>
                </div>
                <div className="step reveal reveal-delay-1" style={{ gridTemplateColumns: '44px 1fr' }}>
                  <div className="step-line-col">
                    <div className="step-num">4</div>
                  </div>
                  <div className="step-content" style={{ paddingBottom: '1rem' }}>
                    <h4>Institutional Scalability</h4>
                    <p>Designed to scale effortlessly from single schools to large multi-campus universities.</p>
                  </div>
                </div>
                <div className="step reveal" style={{ gridTemplateColumns: '44px 1fr' }}>
                  <div className="step-line-col">
                    <div className="step-num">5</div>
                  </div>
                  <div className="step-content" style={{ paddingBottom: '1rem' }}>
                    <h4>Secure Cloud Infrastructure</h4>
                    <p>Enterprise-grade security ensuring student and institutional data is protected at all times.</p>
                  </div>
                </div>
                <div className="step reveal reveal-delay-1" style={{ gridTemplateColumns: '44px 1fr' }}>
                  <div className="step-line-col">
                    <div className="step-num">6</div>
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
                  <h4>Desktop Dashboard</h4>
                  <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.6' }}>
                    <li>Full analytics dashboard</li>
                    <li>Advanced filtering & sorting</li>
                    <li>Bulk operations</li>
                    <li>Custom report generation</li>
                  </ul>
                </div>
                <div className="eco-card reveal reveal-delay-1">
                  <h4>Mobile & Tablet</h4>
                  <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.6' }}>
                    <li>Responsive design</li>
                    <li>Mobile applications</li>
                    <li>Tablet optimization</li>
                    <li>Real-time analytics</li>
                  </ul>
                </div>
                <div className="eco-card reveal reveal-delay-2">
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

          <section id="team" style={{ padding: '6rem 0' }}>
            <div className="section-inner">
              <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <span className="section-label reveal">Our People</span>
                <h2 className="section-h2 reveal reveal-delay-1" style={{ margin: '0 auto' }}>Meet Our Team</h2>
              </div>
              <div className="team-grid reveal reveal-delay-2">
                <div className="team-card">
                  <img src="src\assests\Team\SB.png" alt="Team Member 1" className="team-avatar" />
                  <h4 className="team-name">Saanjali Belgavi</h4>
                  <p className="team-role">Chief Executive Officer</p>
                </div>
                <div className="team-card">
                  <img src="src\assests\Team\KP.png" alt="Team Member 2" className="team-avatar" />
                  <h4 className="team-name">Kartik Patil</h4>
                  <p className="team-role">Chief Technology Officer</p>
                </div>
                <div className="team-card">
                  <img src="src\assests\Team\MS.png" alt="Team Member 3" className="team-avatar" />
                  <h4 className="team-name">Manjunath Subhedar</h4>
                  <p className="team-role">Chief Operating Officer</p>
                </div>
                <div className="team-card">
                  <img src="src\assests\Team\NN.png" alt="Team Member 4" className="team-avatar" />
                  <h4 className="team-name">Nainavati Nashipudi</h4>
                  <p className="team-role">Chief Product Officer</p>
                </div>
                <div className="team-card">
                  <img src="src\assests\Team\RS.png" alt="Team Member 5" className="team-avatar" />
                  <h4 className="team-name">Rohit Subhedar</h4>
                  <p className="team-role">Senior Engineer</p>
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
                <a href="mailto:contact@scholixmind.in" className="btn-primary" style={{ marginBottom: '100px' }}>
                  Get In Touch With Us
                </a>
                <div className="btn-secondary" style={{ marginBottom: '100px', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem', padding: '1.25rem 2rem', height: 'auto' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Call Us</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <a href="tel:+917676621233" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>+91 7676621233</a>
                    <a href="tel:+919113050680" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>+91 9113050680</a>
                    <a href="tel:+919844320505" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>+91 9844320505</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer>
            <div className="section-inner">
              <div className="footer-grid">
                <div className="footer-brand">
                  <div className="footer-brand-logo" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="ScholixMind Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
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
                  <a href="https://www.linkedin.com/company/scholixmind-tech" aria-label="LinkedIn">
                    LinkedIn
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
