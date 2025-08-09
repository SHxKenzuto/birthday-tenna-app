import React from 'react'
import { useTypewriter } from '@hooks/useTypewriter'

type Props = {
  text: string
  onNext: () => void
  speaker?: string
  /** dove catturare il click per avanzare */
  clickArea?: 'screen' | 'box'
}

export const DialogueBox: React.FC<Props> = ({
  text,
  onNext,
  speaker = 'Tenna',
  clickArea = 'screen',
}) => {
  const typed = useTypewriter(text, 18, true)

  // wrapper trasparente solo in modalità "box"
  const wrapperPE = clickArea === 'box' ? 'pointer-events-none' : ''

  return (
    <div className={`absolute inset-0 flex flex-col ${wrapperPE}`}>
      <div className="flex-1" />

      {/* la box è sempre clickabile */}
      <div className="relative mx-3 mb-3 p-3 rounded-2xl bg-[#0f0f0f]/85 border border-white/15 shadow-xl pointer-events-auto">
        <div className="flex items-start">
          <div>
            <div className="text-xs opacity-70 tracking-widest" style={{fontFamily:'var(--tenna-font)'}}>{speaker}</div>
            <div className="mt-1 text-sm leading-6" style={{fontFamily:'var(--tenna-font)'}}>{typed}</div>
          </div>
        </div>
        <div className="text-[10px] mt-2 opacity-60" style={{fontFamily:'var(--tenna-font)'}}>Tocca per continuare ▸</div>

        {/* click SOLO sulla box */}
        {clickArea === 'box' && (
          <button onClick={onNext} className="absolute inset-0" aria-label="Prosegui (solo box)" />
        )}
      </div>

      {/* click OVUNQUE sullo schermo */}
      {clickArea === 'screen' && (
        <button onClick={onNext} className="fixed inset-0" aria-label="Prosegui (schermo intero)" />
      )}
    </div>
  )
}
