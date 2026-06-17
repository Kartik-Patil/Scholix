import { useEffect, useRef } from 'react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260616_212935_bbf608da-62d1-4f25-9be4-c346e4d09cc8.mp4'

export default function ScrollVideo() {
  const canvasRef = useRef(null)
  const videoElRef = useRef(null)
  const containerRef = useRef(null)
  const stateRef = useRef({
    frames: [],
    framesReady: false,
    lastFrameIndex: -1,
    videoSeeking: false,
    rafId: null,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const videoEl = videoElRef.current
    const container = containerRef.current
    const ctx = canvas.getContext('2d')
    const s = stateRef.current

    function resizeCanvas() {
      const dpr = Math.min(devicePixelRatio, 2)
      const rect = canvas.getBoundingClientRect()
      const w = Math.round(rect.width * dpr)
      const h = Math.round(rect.height * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      s.lastFrameIndex = -1
    }

    async function extractFrames() {
      try {
        const response = await fetch(VIDEO_URL, { mode: 'cors' })
        const blob = await response.blob()
        const objectUrl = URL.createObjectURL(blob)
        const video = document.createElement('video')
        video.muted = true
        video.playsInline = true
        video.crossOrigin = 'anonymous'
        video.preload = 'auto'
        video.src = objectUrl
        await new Promise((resolve, reject) => {
          video.onloadedmetadata = () => resolve()
          video.onerror = () => reject()
          setTimeout(() => reject(), 15000)
        })
        const scale = Math.min(1, 1280 / video.videoWidth)
        const scaledWidth = Math.round(video.videoWidth * scale)
        const scaledHeight = Math.round(video.videoHeight * scale)
        const frameCount = Math.max(30, Math.min(120, Math.round(video.duration * 24)))
        for (let i = 0; i < frameCount; i++) {
          const time = (i / (frameCount - 1)) * (video.duration - 0.05)
          video.currentTime = time
          await new Promise((resolve, reject) => {
            const onSeeked = () => {
              video.removeEventListener('seeked', onSeeked)
              resolve()
            }
            video.addEventListener('seeked', onSeeked)
            setTimeout(() => {
              video.removeEventListener('seeked', onSeeked)
              reject()
            }, 3000)
          })
          const bitmap = await createImageBitmap(video, {
            resizeWidth: scaledWidth,
            resizeHeight: scaledHeight,
          })
          s.frames.push(bitmap)
        }
        if (s.frames.length > 0) {
          s.framesReady = true
          canvas.style.visibility = 'visible'
          videoEl.style.display = 'none'
        }
        URL.revokeObjectURL(objectUrl)
      } catch (e) {
        /* fallback to video seeking */
      }
    }

    function getScrollBounds() {
      const vh = window.innerHeight
      const darkBlock = document.querySelector('.dark-block')
      const darkTop = darkBlock
        ? darkBlock.getBoundingClientRect().top + window.scrollY
        : document.documentElement.scrollHeight
      return { start: vh * 0.4, end: darkTop - vh }
    }

    function getProgress() {
      const { start, end } = getScrollBounds()
      const range = end - start
      if (range <= 0) return 1
      return Math.max(0, Math.min(1, (window.scrollY - start) / range))
    }

    function drawFrame(frame) {
      const cw = canvas.width,
        ch = canvas.height
      const sc = Math.max(cw / frame.width, ch / frame.height)
      const dw = frame.width * sc,
        dh = frame.height * sc
      ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    function updateContainerOpacity() {
      const darkBlock = document.querySelector('.dark-block')
      if (!darkBlock) return
      const darkTop = darkBlock.getBoundingClientRect().top + window.scrollY
      const vh = window.innerHeight
      const fadeStart = darkTop - vh * 1.5
      const fadeEnd = darkTop - vh * 0.2
      const op =
        1 -
        Math.max(
          0,
          Math.min(1, (window.scrollY - fadeStart) / (fadeEnd - fadeStart))
        )
      container.style.opacity = op
    }

    function tick() {
      const progress = getProgress()
      if (s.framesReady && s.frames.length > 0) {
        const idx = Math.round(progress * (s.frames.length - 1))
        if (idx !== s.lastFrameIndex) {
          s.lastFrameIndex = idx
          if (s.frames[idx]) drawFrame(s.frames[idx])
        }
      } else if (
        videoEl.duration &&
        isFinite(videoEl.duration) &&
        videoEl.readyState >= 1
      ) {
        const target = progress * videoEl.duration
        if (!s.videoSeeking && Math.abs(videoEl.currentTime - target) > 0.001) {
          s.videoSeeking = true
          videoEl.currentTime = target
        }
      }
      updateContainerOpacity()
      s.rafId = requestAnimationFrame(tick)
    }

    const onSeeked = () => { s.videoSeeking = false }
    const onStalled = () => { s.videoSeeking = false }
    const onLoaded = () => { videoEl.currentTime = 0 }

    videoEl.addEventListener('seeked', onSeeked)
    videoEl.addEventListener('stalled', onStalled)
    videoEl.addEventListener('loadeddata', onLoaded)

    canvas.style.visibility = 'hidden'
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    s.rafId = requestAnimationFrame(tick)
    extractFrames()

    return () => {
      cancelAnimationFrame(s.rafId)
      window.removeEventListener('resize', resizeCanvas)
      videoEl.removeEventListener('seeked', onSeeked)
      videoEl.removeEventListener('stalled', onStalled)
      videoEl.removeEventListener('loadeddata', onLoaded)
    }
  }, [])

  return (
    <div id="scroll-video-container" ref={containerRef}>
      <canvas ref={canvasRef} id="video-canvas" />
      <video
        ref={videoElRef}
        id="video-fallback"
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        src={VIDEO_URL}
      />
      <div className="overlay" />
    </div>
  )
}
