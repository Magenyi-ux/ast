
import React from 'react';

export const Header: React.FC = () => (
  <header className="bg-emerald-700 text-white shadow-md p-4 sticky top-0 z-50">
    <div className="max-w-4xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="bg-white text-emerald-700 font-bold px-2 py-1 rounded">NM</div>
        <h1 className="text-xl font-bold tracking-tight">NaijaMath Engine</h1>
      </div>
      <span className="text-xs bg-emerald-600 px-2 py-1 rounded-full uppercase font-medium">Offline First</span>
    </div>
  </header>
);

export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="max-w-4xl mx-auto p-4 pb-20">
    {children}
  </main>
);

export const Footer: React.FC = () => (
  <footer className="fixed bottom-0 w-full bg-white border-t p-3 text-center text-slate-500 text-sm">
    Aligned with Nigerian National Curriculum (NERDC)
  </footer>
);
