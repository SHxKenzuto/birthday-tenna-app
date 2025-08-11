import React from 'react'
import { motion } from 'framer-motion'

export const GiftBox: React.FC<{ open?: boolean }> = ({ open = false }) => (
  <svg viewBox="0 0 200 220" className="w-full h-full">
    {/* corpo del pacco */}
    <rect x="20" y="70" width="160" height="80" rx="10" className="fill-[#5bc0eb]" />
    <rect x="95" y="70" width="10" height="80" className="fill-[#ffe066]" />

    {/* coperchio: da y=40 (chiuso) a y=0 (aperto su di 40px) */}
    <motion.rect
      x="10"
      width="180"
      height="40"
      rx="10"
      className="fill-[#46a7d6]"
      initial={false}
      animate={{ y: open ? 0 : 40 }}
      transition={{ type: 'spring', stiffness: 170, damping: 20 }}
    />
  </svg>
)
