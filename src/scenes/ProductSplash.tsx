import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DialogueBox } from '@components/DialogueBox'
import { TennaOverlay } from '@components/TennaOverlay'

const IMGS = [
  '/images/deltarune-487-2.png',
  '/images/product_DR_tenna_plush_photo6_584595f4-6959-4c26-85a3-e2b8292a4379.webp',
  '/images/product_DR_tenna_plush_photo3.webp',
  '/images/product_DR_tenna_plush_photo2.webp',
  '/images/product_DR_tenna_plush_staged2_5c3e7dd9-fc0a-4400-9859-0d49f68c0ffc.webp',
]

export const ProductSplash: React.FC<{
  active: boolean
  text: string
  gifUrl?: string
  onNext: () => void
}> = ({ active, text, gifUrl, onNext }) => {
  const [i, setI] = useState(0)

  // Avanza immagine + dialogo insieme
  const advance = () => {
    setI((n) => {
      if(n + 1 >= IMGS.length){
        return n;
      }
      return n + 1;
    })
    onNext()
  }

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="p"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1a1a1a,black_60%)]" />

          {/* Tap sull'immagine = advance() */}
          <div className="absolute inset-0 flex items-center justify-center" onClick={advance}>
            <div className="w-[85vw] max-w-[420px] aspect-[4/3] rounded-2xl bg-white overflow-hidden border border-white/15 shadow-xl">
              <img src={IMGS[i]} className="w-full h-full object-cover" alt="product" />
            </div>
          </div>

          {/* Tenna a destra come overlay */}
          <TennaOverlay gifUrl={gifUrl} placement="right" />

          {/* Box senza avatar; click SOLO sulla box = advance() */}
          <DialogueBox text={text} onNext={advance} speaker="Tenna" clickArea="box" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
