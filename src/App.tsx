
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Screen } from '@components/Screen'
import { Intro } from '@scenes/Intro'
import { TVTime } from '@scenes/TVTime'
import { ProductSplash } from '@scenes/ProductSplash'
import { DialogueBox } from '@components/DialogueBox'
import { GiftCarousel } from '@components/GiftCarousel'
import { RevealSequence } from '@components/RevealSequence'
import { PHASE, type Phase } from '@constants/phases'
import { TennaOverlay } from '@components/TennaOverlay'
import { useBeep } from '@hooks/useBeep'

export default function App(){
  const [phase,setPhase]=useState<Phase>(PHASE.INTRO)
  const [dialogIndex,setDialogIndex]=useState(0)
  const {beep}=useBeep()

  const dialogueA=[
    { text:'Benvenute e benvenuti al Mr.(Ant)Tenna\'s Smartphone Time!!', gif:'/images/spr_tenna_bow.gif' },
    { text:'Ed oggi la star del nostro SHOW sarai proprio TU!!!', gif:'/images/spr_tenna_point_droop_0.png' },
    { text:'Il MERAVIGLIOSO Tabellone dei Misteri di Mr. Tenna oggi propone...', gif:'/images/spr_tenna_t_pose.gif' },
    { text:'Un gioco a premi!!', gif:'/images/spr_tenna_armsup_annoyed_0.png' },
    { text:'E visto che abbiamo la fantasia della RAI, ma senza i suoi soldi, il gioco di oggi sarà...', gif:'/images/spr_tenna_laugh.gif' },
    { text:'AFFARI TUOI (in un solo turno).', gif:'/images/spr_tenna_dance_cane.gif' },
    { text:'Ora scegli un pacco e scopriamo cosa hai vinto!', gif:'/images/spr_tenna_grasp_anim.gif' },
  ]

  const dialogueB=[
    { text:'Hai fatto la tua scelta...', gif:'/images/spr_tenna_pose_podium_1.png' },
    { text:'Ma sarà stata quella giusta?', gif:'/images/spr_tenna_point_droop_0.png' },
    { text:'Scopriamo prima cosa c\'era negli altri pacchi...', gif:'/images/spr_tenna_evil_0.png' },
  ]
  
  const dialogueC=[
    { text:'Wow, che colpo di fortuna!', gif:'/images/spr_tenna_dance_cabbage.gif' },
    { text:'Osserva che meraviglia!', gif:'/images/spr_tenna_t_pose.gif' },
    { text:'La cura per i dettagli!', gif:'/images/spr_tenna_grasp_anim.gif' },
    { text:'Veramente degno del Tumblr Sexyman 2025.', gif:'/images/spr_tenna_dance_cane.gif' },
    { text:'E sarà tutto tuo...', gif:'/images/spr_tenna_dance_cane.gif' },
    { text:'da OGGI!!!', gif:'/images/spr_tenna_t_pose.gif' },
    { text:'Cosa?', gif:'/images/spr_tenna_bulletin_0.png' },
    { text:'Cosa c\'è Mike?', gif:'/images/spr_tenna_sad_turned_a_0.png' },
    { text:'Come dici? Non prima del 2026?', gif:'/images/spr_tenna_sad_turned_a_0.png' },
    { text:'INACCETTABILE!!!', gif:'/images/spr_tenna_grasp_anim.gif' },
    { text:'MIKE DISTRUGGI LA BOARD!', gif:'/images/spr_tenna_grasp_anim.gif' },
    { text:'MIKE DISTRUGGI L\'APP!', gif:'/images/spr_tenna_grasp_anim.gif' },
    { text:'MIKE DISTRUGGI LA MIA CASA!', gif:'/images/spr_tenna_grasp_anim.gif' },
    { text:'MIKE DISTRUGGI I MIEI FIGLI!', gif:'/images/spr_tenna_grasp_anim.gif' },
    { text:'MIKEEEEEEEEEEEEEEEEE!!!', gif:'/images/spr_tenna_grasp_anim.gif' },
  ]

  // Intro tap → flash → black → TV → dialogue
  const startShow=async()=>{
    await beep(880,120); setPhase(PHASE.FLASH)
    setTimeout(()=>setPhase(PHASE.BLACK),300)
    setTimeout(async()=>{ await beep(120,180,'square'); setPhase(PHASE.TV) },900)
    setTimeout(()=>setPhase(PHASE.DIALOGUE),5200)
  }

  const nextDialogue=()=>{
    if(phase===PHASE.DIALOGUE){
      if(dialogIndex<dialogueA.length-1) setDialogIndex(i=>i+1)
      else { setDialogIndex(0); setPhase(PHASE.CAROUSEL) }
    } else if(phase===PHASE.DIALOGUE_B){
      if(dialogIndex<dialogueB.length-1) setDialogIndex(i=>i+1)
      else setPhase(PHASE.REVEAL)
    } else if(phase===PHASE.PRODUCT){
      if(dialogIndex<dialogueC.length-1) setDialogIndex(i=>i+1)
      else setPhase(PHASE.END)
    }
  }

  return (
    <Screen>
      <Intro active={phase===PHASE.INTRO} onTap={startShow}/>

      {/* FLASH */}
      <AnimatePresence>{phase===PHASE.FLASH&&(
        <motion.div key="f" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.35}} className="absolute inset-0 bg-white"/>
      )}</AnimatePresence>
      {/* BLACK */}
      <AnimatePresence>{phase===PHASE.BLACK&&(
        <motion.div key="b" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-black"/>
      )}</AnimatePresence>
      {/* TV */}
      <TVTime active={phase===PHASE.TV}/>

      {/* DIALOGUE A */}
      <AnimatePresence>{phase===PHASE.DIALOGUE&&(
        <motion.div key="da" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#121212,black_60%)]"/>
          <TennaOverlay gifUrl={dialogueA[dialogIndex].gif} placement="center"/>
          <DialogueBox text={dialogueA[dialogIndex].text} onNext={nextDialogue} speaker="Tenna"/>
        </motion.div>
      )}</AnimatePresence>

      {/* CAROUSEL */}
      <AnimatePresence>{phase===PHASE.CAROUSEL&&(
        <motion.div key="c" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#0e0e0e,black_60%)]"/>
          <div className="absolute top-6 w-full text-center text-xs opacity-80" style={{fontFamily:'var(--tenna-font)'}}>Scegli un pacco</div>
          <TennaOverlay gifUrl={'/images/spr_tenna_grasp_anim.gif'} placement="right"/>
          <GiftCarousel onChoose={()=>{setDialogIndex(0); setPhase(PHASE.DIALOGUE_B) }}/>
        </motion.div>
      )}</AnimatePresence>

      {/* DIALOGUE B */}
      <AnimatePresence>{phase===PHASE.DIALOGUE_B&&(
        <motion.div key="da" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#121212,black_60%)]"/>
          <TennaOverlay gifUrl={dialogueB[dialogIndex].gif} placement="center"/>
          <DialogueBox text={dialogueB[dialogIndex].text} onNext={nextDialogue} speaker="Tenna"/>
        </motion.div>
      )}</AnimatePresence>

      {/* REVEAL SEQUENCE */}
      <AnimatePresence>{phase===PHASE.REVEAL && (
        <motion.div key="r" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0">
          <RevealSequence onDone={()=>{ setDialogIndex(0); setPhase(PHASE.PRODUCT) }}/>
        </motion.div>
      )}</AnimatePresence>

      {/* PRODUCT + DIALOGUE C */}
      <ProductSplash active={phase===PHASE.PRODUCT} text={dialogueC[dialogIndex].text} gifUrl={dialogueC[dialogIndex].gif} onNext={nextDialogue}/>

      {/* END */}
      <AnimatePresence>{phase===PHASE.END&&(
        <motion.div key="e" initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center" style={{fontFamily:'var(--tenna-font)'}}>
              <div className="text-lg">Il peluche di Tenna tornerà...nel 2026 ✦</div>
            </div>
          </div>
        </motion.div>
      )}</AnimatePresence>
    </Screen>
  )
}
