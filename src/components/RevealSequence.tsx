import React, { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GiftBox } from './svg/GiftBox'
import { PrizeLoser } from './svg/PrizeLoser'
import { PrizeWinner } from './svg/PrizeWinner'
import { DialogueBox } from './DialogueBox'
import { TennaOverlay } from '@components/TennaOverlay'

type Step = 'idleA' | 'commentA' | 'idleB' | 'commentB' | 'idleP' | 'commentP'

export const RevealSequence: React.FC<{ onDone: () => void, playPiatto: () => void, playDrumroll: () => void }> = ({ onDone, playPiatto, playDrumroll }) => {
  const [step, setStep] = useState<Step>('idleA');
  const [open, setOpen] = useState(false);
  const [packNumber, setPackNumber] = useState(1);
  const [disappear, setDisappear] = useState(false);
  const animDelay = useRef<number>(350); // ms dopo l'apertura del coperchio
  const lines = {
    commentA: { text: "Wow, un amiibo di Monster Hunter!! Questo sì che sarebbe stato un gran bel premio.", avatar: "./images/spr_tenna_whisper_0.png" },
    commentB: { text: "COOSA?? Lo stesso amiibo?? MIKE! Cosa hai combinato con i premi?!", avatar: "./images/spr_tenna_fallen_1.png" },
    commentP: { text: "E ora… il tuo premio!", avatar: "./images/spr_tenna_pose_podium_1.png" },
  } as const



  const handleTap = () => {
    if (step === 'idleA') {
      setOpen(true);
      window.setTimeout(() => setDisappear(true), 300);
      window.setTimeout(() => setStep('commentA'), animDelay.current);
      playPiatto();
      return;
    }
    if (step === 'commentA') {
      playDrumroll();
      setPackNumber(2);
      setOpen(false);
      setDisappear(false);
      setStep('idleB');
      return;
    }
    if (step === 'idleB') {
      setOpen(true)
      window.setTimeout(() => setDisappear(true), 200);
      window.setTimeout(() => setStep('commentB'), animDelay.current);
      playPiatto();
      return;
    }
    if (step === 'commentB') {
      playDrumroll();
      setPackNumber(3);
      setOpen(false);
      setDisappear(false);
      setStep('idleP');
      return;
    }
    if (step === 'idleP') {
      setOpen(true);
      window.setTimeout(() => setDisappear(true), 200);
      window.setTimeout(() => setStep('commentP'), animDelay.current);
      playPiatto();
      return;
    }
    if (step === 'commentP') {
      onDone();
    }
  }

  // contenuto dentro il pacco
  const content = step.startsWith('idle')
    ? null
    : step === 'commentP'
      ? <PrizeWinner />
      : <PrizeLoser />;

  // gif overlay a destra
  const overlayGif =
    step === 'commentA' ? lines.commentA.avatar :
      step === 'commentB' ? lines.commentB.avatar :
        step === 'commentP' ? lines.commentP.avatar :
          './images/spr_tenna_grasp_anim.gif';

  const currentComment =
    (step === 'commentA' && lines.commentA) ||
    (step === 'commentB' && lines.commentB) ||
    (step === 'commentP' && lines.commentP) ||
    null;

  return (
    <div className="absolute inset-0" onClick={handleTap}>
      {/* wrapper verticale */}
      <div className="w-full h-full flex flex-col items-center justify-center">
        {/* testo sopra */}
        <div
          className="mb-2 text-sm leading-6"
          style={{ fontFamily: 'var(--tenna-font)' }}
        >
          Pacco #{packNumber}
        </div>
        {/* pacco */}
        <div className="relative w-[180px] h-[230px]">
          {/* FRAME stile DialogueBox che svanisce quando open=true */}
          <motion.div
            initial={false}
            animate={{ opacity: disappear ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-2xl bg-[#0f0f0f]/85 border border-white/15 shadow-xl p-3"
          >
            {/* CARD */}
            <div className="absolute inset-3 rounded-xl overflow-hidden bg-white">
              <AnimatePresence>
                {open && content && (
                  <div key={step} className="w-full h-full">
                    {content}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          {/* COPERCHIO */}
          <motion.div
            initial={false}
            animate={{ opacity: disappear ? 0 : 1 }}
          >
            <GiftBox open={open} />
          </motion.div>
        </div>
      </div>

      {/* Tenna a destra come overlay */}
      <TennaOverlay gifUrl={overlayGif} placement="right" />

      {/* DialogueBox */}
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
