import React, { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GiftBox } from './svg/GiftBox'
import { PrizeLoser } from './svg/PrizeLoser'
import { PrizeWinner } from './svg/PrizeWinner'
import { DialogueBox } from './DialogueBox'
import { TennaOverlay } from '@components/TennaOverlay'

type Step = 'idleA' | 'commentA' | 'idleB' | 'commentB' | 'idleP' | 'commentP'

export const RevealSequence: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [step, setStep] = useState<Step>('idleA')
  const [open, setOpen] = useState(false)
  const animDelay = useRef<number>(350) // ms dopo l'apertura del coperchio
  const lines = {
    commentA: { text: "Wow, un amiibo di Monster Hunter!! Questo sì che sarebbe stato un gran bel premio.", avatar: "/images/spr_tenna_whisper_0.png" },
    commentB: { text: "COOSA?? Lo stesso amiibo?? MIKE! Cosa hai combinato con i premi?!", avatar: "/images/spr_tenna_fallen_1.png" },
    commentP: { text: "E ora… il tuo premio!", avatar: "/images/spr_tenna_pose_podium_1.png"},
  } as const

  const handleTap = () => {
    if (step === 'idleA') {
      setOpen(true)
      window.setTimeout(() => setStep('commentA'), animDelay.current)
      return
    }
    if (step === 'commentA') {
      setOpen(false)
      setStep('idleB')
      return
    }
    if (step === 'idleB') {
      setOpen(true)
      window.setTimeout(() => setStep('commentB'), animDelay.current)
      return
    }
    if (step === 'commentB') {
      setOpen(false)
      setStep('idleP')
      return
    }
    if (step === 'idleP') {
      setOpen(true)
      window.setTimeout(() => setStep('commentP'), animDelay.current)
      return
    }
    if (step === 'commentP') {
      onDone()
    }
  }

  // contenuto dentro il pacco
  const content = step.startsWith('idle')
    ? null
    : step === 'commentP'
      ? <PrizeWinner/>
      : <PrizeLoser/>

  // gif overlay a destra (senza avatar nella box)
  const overlayGif =
    step === 'commentA' ? lines.commentA.avatar :
    step === 'commentB' ? lines.commentB.avatar :
    step === 'commentP' ? lines.commentP.avatar :
    '/images/spr_tenna_grasp_anim.gif' // default mentre si apre

  const currentComment =
    (step === 'commentA' && lines.commentA) ||
    (step === 'commentB' && lines.commentB) ||
    (step === 'commentP' && lines.commentP) ||
    null

  return (
    <div className="absolute inset-0" onClick={handleTap}>
      {/* pacco al centro */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-[180px] h-[230px] rounded-2xl bg-[#0f0f0f]/85 border border-white/15 shadow-xl p-3">
          <div className="absolute inset-3 rounded-xl overflow-hidden bg-white">
            <AnimatePresence>
              {open && content && (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full"
                >
                  {content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* coperchio */}
          <motion.div
            initial={false}
            animate={{ y: open ? -40 : 0 }}
            transition={{ type: 'spring', stiffness: 170, damping: 20 }}
            className="absolute -top-2 left-0 right-0 mx-auto w-[200px] h-[70px]"
          >
            <GiftBox open={open} />
          </motion.div>
        </div>
      </div>

      {/* Tenna a destra come overlay */}
      <TennaOverlay gifUrl={overlayGif} placement="right" />

      {/* DialogueBox SENZA avatar a sinistra */}
      {currentComment && (
        <DialogueBox
          text={currentComment.text}
          onNext={handleTap}
          speaker="Tenna"
        />
      )}

      {/* hint quando non c'è dialogo */}
      {!currentComment && (
        <div className="absolute bottom-4 w-full text-center text-[11px] opacity-70" style={{ fontFamily: 'var(--tenna-font)' }}>
          Tocca per aprire
        </div>
      )}
    </div>
  )
}
