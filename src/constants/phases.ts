
export const PHASE = {
  INTRO: 'INTRO',
  FLASH: 'FLASH',
  BLACK: 'BLACK',
  TV: 'TV',
  DIALOGUE: 'DIALOGUE',
  CAROUSEL: 'CAROUSEL',
  REVEAL: 'REVEAL',
  DIALOGUE_B: 'DIALOGUE_B',
  PRODUCT: 'PRODUCT',
  END: 'END',
} as const
export type Phase = typeof PHASE[keyof typeof PHASE]
