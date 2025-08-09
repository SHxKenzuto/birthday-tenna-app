import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Center } from '@components/Center'
import { useTypewriter } from '@hooks/useTypewriter'

export const Intro:React.FC<{active:boolean, onTap:()=>void}>=({active,onTap})=>{
  const INTRO = [
    'SIAMO COLLEGATI?',
    'ECCELLENTE',
    'VERAMENTE\nECCELLENTE',
    'QUESTO ESPERIMENTO\nSEMBRA...',
    'MOLTO',
    'MOLTO',
    'INTERESSANTE'
  ]

  const [activeText, setActiveText] = useState(0)

  const isLast = activeText >= INTRO.length - 1
  const onTapped = () => {
    if (isLast) onTap()
    else setActiveText(n => n + 1)
  }
  const phrase = INTRO[activeText] ?? ''
  const typed = useTypewriter(phrase, 50, active, activeText)

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="i"
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          className="absolute inset-0"
        >
          <Center>
            <div className="px-6 w-full flex flex-col items-center">
              {/* blocco testo con larghezza massima per mobile */}
              <div
                className="
                  text-white text-center whitespace-pre-line leading-relaxed
                  break-words mx-auto
                  max-w-[28ch] sm:max-w-[32ch]
                "
                style={{fontFamily:"'Press Start 2P', monospace"}}
              >
                {typed}
              </div>

              <div
                className="mt-6 text-xs opacity-60 text-center"
                style={{fontFamily:"'Press Start 2P', monospace"}}
              >
                Tocca per continuare
              </div>
            </div>
          </Center>

          {/* tapp anywhere per proseguire */}
          <button onClick={onTapped} className="absolute inset-0" aria-label="inizia" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
