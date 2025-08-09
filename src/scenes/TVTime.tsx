
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
export const TVTime:React.FC<{active:boolean}>=({active})=>(
  <AnimatePresence>{active&&(
    <motion.div key="tv" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0">
      <div className="absolute inset-0 bg-black flex items-center justify-center">
        <div className="relative w-64 h-36 bg-white text-black flex items-center justify-center font-extrabold text-xl tracking-widest">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_3px,rgba(0,0,0,.08)_4px)]"/>
          IT'S TV TIME
        </div>
      </div>
    </motion.div>)}</AnimatePresence>
)
