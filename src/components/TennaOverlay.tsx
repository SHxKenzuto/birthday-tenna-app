import React from 'react'

type Props = {
  /** URL di gif/png */
  gifUrl?: string
  /** Posizionamento: al centro (grande) o a destra (più piccolo) */
  placement?: 'center' | 'right'
  /** opzionale: classi extra sul tag <img> */
  imgClassName?: string
}

export const TennaOverlay: React.FC<Props> = ({
  gifUrl,
  placement = 'center',
  imgClassName = '',
}) => {
  if (!gifUrl) return null

  if (placement === 'center') {
    // più grande, stessa altezza per tutte le immagini
    return (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <img
          src={gifUrl}
          alt="Tenna"
          className={[
            // altezza uniforme + limiti per non esplodere su device piccoli
            'h-[36vh] max-h-[360px] max-w-[80vw] w-auto',
            // niente stretch
            'object-contain',
            imgClassName,
          ].join(' ')}
        />
      </div>
    )
  }

  // placement = 'right' più piccolo, ancorato in basso a destra
  return (
    <div className="pointer-events-none absolute right-2 bottom-28 sm:right-4 sm:bottom-32">
      <img
        src={gifUrl}
        alt="Tenna"
        className={[
          // altezza uniforme lato destro
          'h-[24vh] max-h-[230px] max-w-[30vw] w-auto',
          'object-contain',
          imgClassName,
        ].join(' ')}
      />
    </div>
  )
}
