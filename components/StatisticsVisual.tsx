
import React from 'react';
import { MathRenderer } from './MathRenderer';

export const StatisticsVisual: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-[2rem] border-4 border-emerald-500/10 shadow-inner flex flex-col items-center">
      <div className="grid grid-cols-2 gap-12 w-full max-w-lg">
        {/* Tally Mark Example */}
        <div className="flex flex-col items-center gap-4 bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-100">
          <div className="text-emerald-800 font-black text-xs uppercase tracking-widest mb-2">Tally Mark "5"</div>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <line x1="20" y1="10" x2="20" y2="70" stroke="#065f46" strokeWidth="6" strokeLinecap="round" />
            <line x1="35" y1="10" x2="35" y2="70" stroke="#065f46" strokeWidth="6" strokeLinecap="round" />
            <line x1="50" y1="10" x2="50" y2="70" stroke="#065f46" strokeWidth="6" strokeLinecap="round" />
            <line x1="65" y1="10" x2="65" y2="70" stroke="#065f46" strokeWidth="6" strokeLinecap="round" />
            <line x1="10" y1="60" x2="75" y2="20" stroke="#059669" strokeWidth="6" strokeLinecap="round" className="animate-pulse" />
          </svg>
          <div className="text-emerald-900 font-black text-lg mt-2">$||||/ = 5$</div>
        </div>

        {/* Pictogram Example - Removed emojis */}
        <div className="flex flex-col items-center gap-4 bg-blue-50 p-6 rounded-2xl border-2 border-blue-100">
          <div className="text-blue-800 font-black text-xs uppercase tracking-widest mb-2">Pictogram Logic</div>
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full" />
            <div className="w-8 h-8 bg-blue-600 rounded-full" />
            <div className="w-8 h-8 bg-blue-600 rounded-full" />
          </div>
          <div className="text-blue-900 font-black text-sm uppercase text-center tracking-tight">
            If 1 Circle = 2 Students,<br/>
            Then 3 Circles = 6 Students.
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center max-w-sm">
        <div className="text-emerald-800 font-black text-2xl uppercase tracking-tighter">Organising Information</div>
        <p className="text-slate-600 font-bold text-sm uppercase tracking-widest mt-2">
          Turning raw data into clear charts.
        </p>
      </div>
    </div>
  );
};
