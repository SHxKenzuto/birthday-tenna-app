
import React from 'react'
export const Screen:React.FC<React.PropsWithChildren<{className?:string}>>=({children,className=''})=>(
  <div className={`w-screen h-dvh overflow-hidden bg-black text-white select-none ${className}`}>{children}</div>
)
