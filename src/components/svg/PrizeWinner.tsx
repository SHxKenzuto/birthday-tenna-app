
import React from 'react'
export const PrizeWinner:React.FC=()=>(
  <svg viewBox="0 0 220 160" className="w-full h-full">
    <defs><radialGradient id="g" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stopColor="#fff"/><stop offset="100%" stopColor="#a3d9ff"/></radialGradient></defs>
    <rect x="0" y="0" width="220" height="160" fill="url(#g)" />
    <g transform="translate(20,25)">
      <polygon points="90,0 110,60 170,60 120,95 140,155 90,120 40,155 60,95 10,60 70,60" className="fill-[#2ecc71]"/>
      <text x="0" y="140" fontSize="16" fontFamily="monospace" fill="#1f7a3a">YOU GOT IT!</text>
    </g>
  </svg>
)
