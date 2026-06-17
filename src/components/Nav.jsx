import logo from '../assests/SLiver-logo-transparent.png'

export default function Nav() {
  return (
    <nav id="main-nav">
      <a href="#hero" className="nav-logo-img">
        <img src={logo} alt="ScholixMind Logo" />
      </a>
      <div className="nav-links">
        <a href="#hero">Home</a>
        <a href="#products">Builds</a>
        <a href="#testimonials">Reviews</a>
        <a href="#contact">Let's Connect</a>
      </div>
    </nav>
  )
}
