import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

export function useCounter(ref, target, duration = 1800) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = null
          const step = (ts) => {
            if (!start) start = ts
            const progress = Math.min((ts - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            el.textContent = Math.round(eased * target).toLocaleString()
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, target, duration])
}
