import { useEffect, useRef } from 'react'

export default function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let rafId = null
    const mouse = { x: -9999, y: -9999 }

    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles()
    }

    function createParticles() {
      particles = []
      const count = Math.floor((canvas.width * canvas.height) / 14000)
      for (let i = 0; i < count; i++) {
        const opacity = Math.random() * 0.45 + 0.1
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.2 + 0.3,
          opacity,
        })
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Hide particles once inside the dark section
      const darkBlock = document.querySelector('.dark-block')
      if (darkBlock) {
        const rect = darkBlock.getBoundingClientRect()
        if (rect.top < 0) {
          rafId = requestAnimationFrame(animate)
          return
        }
      }

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80 && dist > 0) {
          const force = (80 - dist) / 80
          p.vx += (dx / dist) * force * 0.15
          p.vy += (dy / dist) * force * 0.15
        }

        p.vx *= 0.99
        p.vy *= 0.99

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`
        ctx.fill()
      }
      rafId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} id="particles-canvas" />
}
