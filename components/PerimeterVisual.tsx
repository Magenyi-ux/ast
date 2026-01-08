
import React from 'react';

export const PerimeterVisual: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-[2rem] border-4 border-emerald-500/10 shadow-inner flex flex-col items-center">
      <svg width="300" height="200" viewBox="0 0 300 200" className="drop-shadow-lg">
        {/* The Shape Interior */}
        <rect x="50" y="50" width="200" height="100" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
        
        {/* The "Fence" (Perimeter) - Pulsing animation to show the boundary */}
        <rect 
          x="50" y="50" width="200" height="100" 
          fill="none" 
          stroke="#059669" 
          strokeWidth="6" 
          strokeDasharray="10 5" 
          className="animate-[dash_2s_linear_infinite]"
        />
        
        {/* Dimension Labels */}
        <text x="150" y="40" textAnchor="middle" className="font-black text-slate-900 text-sm uppercase">Length (l)</text>
        <text x="150" y="165" textAnchor="middle" className="font-black text-slate-900 text-sm uppercase">Length (l)</text>
        <text x="25" y="105" textAnchor="middle" transform="rotate(-90, 25, 105)" className="font-black text-slate-900 text-sm uppercase">Breadth (b)</text>
        <text x="275" y="105" textAnchor="middle" transform="rotate(90, 275, 105)" className="font-black text-slate-900 text-sm uppercase">Breadth (b)</text>
      </svg>
      
      <div className="mt-8 text-center">
        <div className="text-emerald-800 font-black text-2xl uppercase tracking-tighter">Distance Around the Shape</div>
        <div className="text-slate-600 font-bold text-sm uppercase tracking-[0.2em] mt-2">$P = l + b + l + b = 2(l + b)$</div>
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -15;
          }
        }
      `}</style>
    </div>
  );
};
