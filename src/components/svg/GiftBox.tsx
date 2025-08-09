
import React from 'react'
export const GiftBox:React.FC<{open?:boolean}>=({open=false})=>(
  <svg viewBox="0 0 200 220" className="w-full h-full">
    <rect x="20" y="70" width="160" height="80" rx="10" className="fill-[#5bc0eb]" />
    <rect x="95" y="70" width="10" height="80" className="fill-[#ffe066]" />
    <g transform={`translate(0, ${open ? -40 : 0})`}>
      <rect x="10" y="40" width="180" height="40" rx="10" className="fill-[#46a7d6]" />
    </g>
  </svg>
)
