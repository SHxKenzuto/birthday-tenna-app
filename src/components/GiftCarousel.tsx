import React, { useState } from "react";
import { GiftBox } from "./svg/GiftBox";

export const GiftCarousel: React.FC<{ onChoose: () => void }> = ({ onChoose }) => {
  const [focus, setFocus] = useState<number | null>(null);

  const Card: React.FC<{ idx: number; label: string }> = ({ idx, label }) => {
    const focused = focus === idx;
    return (
      <button
        aria-label={label}
        onClick={() => onChoose()}
        onFocus={() => setFocus(idx)}
        onBlur={() => setFocus(null)}
        className={[
          "group relative w-[180px] h-[230px] rounded-2xl",
          // === stile DialogueBox ===
          "bg-[#0f0f0f]/85 border border-white/15 shadow-xl p-3",
          // ==========================
          "transition-transform duration-200 ease-out",
          focused ? "scale-100 ring-2 ring-white/60" : "scale-95 hover:scale-100",
          "active:scale-95 outline-none"
        ].join(" ")}
      >
        <div className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden bg-black/10">
          <GiftBox />
        </div>
        <span className="sr-only">{label}</span>
      </button>
    );
  };

  return (
    <div className="absolute inset-0">
      <div className="absolute top-6 w-full text-center text-xs opacity-80" style={{ fontFamily: "var(--tenna-font)" }}>
        Scegli un pacco
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <div className="flex items-center justify-center gap-6">
          <Card idx={0} label="Pacco 1" />
          <Card idx={1} label="Pacco 2" />
        </div>
        <div className="flex items-center justify-center">
          <Card idx={2} label="Pacco 3" />
        </div>
      </div>
    </div>
  );
};
