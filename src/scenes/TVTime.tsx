
import React from 'react'
export const TVTime: React.FC<{ active: boolean }> = ({ active }) => {
  return (active && <div className="absolute inset-0 bg-black flex items-center justify-center">
    <img
      src="./images/itstvtime.gif"
      alt="It's TV Time"
    />
  </div>)
}
