
import React from 'react';
import { MathRenderer } from './MathRenderer';

export const AreaVisual: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-[2rem] border-4 border-emerald-500/10 shadow-inner flex flex-col items-center">
      <div className="relative">
        {/* The Grid representing Area */}
        <svg width="240" height="150" viewBox="0 0 240 150" className="drop-shadow-md">
          {/* Background Surface */}
          <rect x="0" y="0" width="240" height="150" fill="#ecfdf5" stroke="#10b981" strokeWidth="4" />
          
          {/* Grid lines to show unit squares */}
          <line x1="80" y1="0" x2="80" y2="150" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="160" y1="0" x2="160" y2="150" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
          
          <line x1="0" y1="50" x2="240" y2="50" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="0" y1="100" x2="240" y2="100" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />

          {/* Animating highlight for some squares */}
          <rect x="0" y="0" width="80" height="50" fill="#10b981" opacity="0.1" className="animate-pulse" />
          <rect x="80" y="50" width="80" height="50" fill="#10b981" opacity="0.1" className="animate-pulse [animation-delay:200ms]" />
          <rect x="160" y="100" width="80" height="50" fill="#10b981" opacity="0.1" className="animate-pulse [animation-delay:400ms]" />
        </svg>

        {/* Labels */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-black text-emerald-900 text-sm uppercase tracking-widest">Length ($l$)</div>
        <div className="absolute top-1/2 -right-12 -translate-y-1/2 rotate-90 font-black text-emerald-900 text-sm uppercase tracking-widest">Breadth ($b$)</div>
      </div>
      
      <div className="mt-12 text-center max-w-sm">
        <div className="text-emerald-800 font-black text-2xl uppercase tracking-tighter">Surface Space Inside</div>
        <div className="text-slate-600 font-bold text-sm uppercase tracking-widest mt-2">
          {/* Using MathRenderer to properly handle LaTeX and changing 'number' to 'total' to avoid TS parsing issues */}
          <MathRenderer math="$Area = \text{total unit squares} = l \times b$" />
        </div>
      </div>
    </div>
  );
};
