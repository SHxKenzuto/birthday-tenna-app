import { useMemo, useRef } from 'react'

type TrackCfg = { src: string; loop?: boolean; volume?: number }
type Tracks = Record<string, TrackCfg>

const clamp = (v: number) => Math.max(0, Math.min(1, v ?? 0))

export function useAudioManager(manifest: Tracks) {
    const elsRef = useRef<Record<string, HTMLAudioElement>>({})
    const fadesRef = useRef<Record<string, number | null>>({})
    const readyRef = useRef(false)

    useMemo(() => {
        const map: Record<string, HTMLAudioElement> = {}
        for (const [id, cfg] of Object.entries(manifest)) {
            const a = new Audio(cfg.src)
            a.preload = 'auto'
            a.loop = !!cfg.loop
            a.volume = clamp(cfg.volume ?? 1)
            a.crossOrigin = 'anonymous'
            map[id] = a
            fadesRef.current[id] = null
        }
        elsRef.current = map
    }, [manifest])

    const cancelFade = (id: string) => {
        const raf = fadesRef.current[id]
        if (raf) { cancelAnimationFrame(raf); fadesRef.current[id] = null }
    }

    const init = async () => {
        if (readyRef.current) return
        const any = Object.values(elsRef.current)[0]
        try {
            if (any) {
                const prev = any.volume
                any.volume = 0
                await any.play().catch(() => { })
                any.pause()
                any.currentTime = 0
                any.volume = prev
            }
        } finally {
            readyRef.current = true
        }
    }

    const play = async (
        id: string,
        opts?: { from?: number; loop?: boolean; volume?: number }
    ) => {
        const a = elsRef.current[id]; if (!a) return
        cancelFade(id)
        if (opts?.loop != null) a.loop = opts.loop
        if (opts?.from != null) a.currentTime = Math.max(0, opts.from)
        if (opts?.volume != null) a.volume = clamp(opts.volume)
        a.muted = false
        try { await a.play() } catch { }
    }

    const stop = (id: string) => {
        const a = elsRef.current[id];
        if (!a) return;
        cancelFade(id);
        a.loop = false;
        a.pause();
        a.currentTime = 0;
    };

    const fadeTo = (
        id: string,
        target = 0,
        ms = 400,
        opts?: { stopAtZero?: boolean }
    ) => {
        const a = elsRef.current[id]; if (!a) return
        cancelFade(id)
        const start = clamp(a.volume)
        const end = clamp(target)
        const t0 = performance.now()

        const step = (t: number) => {
            const k = Math.min(1, (t - t0) / Math.max(1, ms))
            const v = start + (end - start) * k
            a.volume = clamp(v)
            if (k < 1) {
                fadesRef.current[id] = requestAnimationFrame(step)
            } else {
                fadesRef.current[id] = null
                a.volume = end
                if (opts?.stopAtZero && end === 0) {
                    a.pause()
                    a.currentTime = 0
                }
            }
        }
        fadesRef.current[id] = requestAnimationFrame(step)
    }

    return { init, play, stop, fadeTo }
}
