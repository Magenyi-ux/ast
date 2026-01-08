
import React from 'react';

export const Header: React.FC = () => (
  <header className="bg-emerald-800 text-white shadow-xl p-6 sticky top-0 z-50">
    <div className="max-w-4xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="bg-white text-emerald-800 font-black px-3 py-1 rounded-lg text-xl shadow-md">NM</div>
        <h1 className="text-3xl font-black tracking-tighter uppercase">NaijaMath</h1>
      </div>
      <span className="text-sm bg-emerald-700 px-4 py-2 rounded-full uppercase font-black tracking-widest border-2 border-emerald-600 shadow-inner">2025 Edition</span>
    </div>
  </header>
);

export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="max-w-4xl mx-auto p-4 pb-20">
    {children}
  </main>
);

export const Footer: React.FC = () => (
  <footer className="fixed bottom-0 w-full bg-white border-t-4 border-slate-100 p-4 text-center text-slate-900 text-sm font-black uppercase tracking-widest z-40">
    Nigerian NERDC Curriculum Compliant
  </footer>
);
