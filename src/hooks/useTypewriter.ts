import { useEffect, useRef, useState } from 'react'

export const useTypewriter = (
  text: string,
  speed = 35,
  start = true,
  resetKey?: number | string
) => {
  const [out, setOut] = useState('')
  const iRef = useRef(0)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return
    iRef.current = 0
    setOut('')
    if (timer.current) window.clearInterval(timer.current)
    timer.current = window.setInterval(() => {
      setOut(text.slice(0, iRef.current + 1))
      iRef.current++
      if (iRef.current >= text.length && timer.current) {
        window.clearInterval(timer.current)
      }
    }, speed)
    return () => { if (timer.current) window.clearInterval(timer.current) }
  }, [text, speed, start, resetKey])

  return out
}
