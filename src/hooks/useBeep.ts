
import { useRef } from 'react'
export const useBeep = () => {
  const r = useRef<AudioContext | null>(null); const ctx = () => r.current || (r.current = new (window.AudioContext || (window as any).webkitAudioContext)())
  const beep = async (freq = 440, ms = 180, type: OscillatorType = 'square', gain = 0.03) => { const c = ctx(), o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.value = freq; g.gain.value = gain; o.connect(g).connect(c.destination); o.start(); await new Promise(r => setTimeout(r, ms)); o.stop() }
  return { beep }
}
