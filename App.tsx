
import React, { useState, useMemo } from 'react';
import { Header, Container, Footer } from './components/Layout';
import { MathRenderer } from './components/MathRenderer';
import { PerimeterVisual } from './components/PerimeterVisual';
import { AreaVisual } from './components/AreaVisual';
import { StatisticsVisual } from './components/StatisticsVisual';
import { EducationLevel, Topic, SubTopic, Syllabus } from './types';
import { NIGERIAN_SYLLABUS } from './constants';
import { SolverEngine } from './services/solverEngine';
import { getExplanation, generateVisualAid } from './services/geminiService';

const App: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedSubTopic, setSelectedSubTopic] = useState<SubTopic | null>(null);
  const [mode, setMode] = useState<'menu' | 'learn' | 'practice' | 'solve'>('menu');

  // AI & Solver State
  const [solveInput, setSolveInput] = useState('');
  const [solveResult, setSolveResult] = useState<any>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [visualAidUrl, setVisualAidUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Practice State
  const [practiceIndex, setPracticeIndex] = useState(0);

  const currentSyllabus = useMemo(() => 
    NIGERIAN_SYLLABUS.find(s => s.level === selectedLevel), [selectedLevel]);

  const handleBack = () => {
    if (mode !== 'menu') {
      setMode('menu');
      setSolveResult(null);
      setAiExplanation(null);
      setVisualAidUrl(null);
    } else if (selectedSubTopic) {
      setSelectedSubTopic(null);
    } else if (selectedTopic) {
      setSelectedTopic(null);
    } else {
      setSelectedLevel(null);
    }
  };

  const getPlaceholder = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('substitution')) return 'e.g. x=3; 2x + 5';
    if (t.includes('expansion') || t.includes('multiplication')) return 'e.g. 3(x + 4)';
    if (t.includes('algebraic expression')) return 'e.g. 3x + 4y - x + 2';
    if (t.includes('simple equation') || t.includes('linear equation')) return 'e.g. 2x + 4 = 10';
    if (t.includes('quadratic')) return 'e.g. 1x^2 - 5x + 6 = 0';
    if (t.includes('place value') || t.includes('whole number')) return 'e.g. 4382';
    if (t.includes('hcf') || t.includes('lcm') || t.includes('factors')) return 'e.g. 12, 18, 24';
    if (t.includes('fraction')) return 'e.g. 1/2 + 1/4';
    if (t.includes('decimal')) return 'e.g. 1.5 + 2.3';
    if (t.includes('binary') || t.includes('base')) return 'e.g. 1101 or 13';
    if (t.includes('perimeter')) return 'rect:l=8,b=5 | find:breadth,p=26,l=8';
    if (t.includes('area')) return 'rect:l=8,b=5 | find:breadth,area=48,l=8';
    if (t.includes('statistics') || t.includes('data')) return 'order:5,8,6,10,7 | freq:2,4,6,4,2,4,8';
    
    // JSS2 specific
    if (t.includes('integer')) return 'e.g. int:5+(-3) or int:(-2)*(-4)';
    if (t.includes('standard form')) return 'e.g. std:45000 or std:0.00045';
    if (t.includes('ratio')) return 'e.g. ratio:12:18';
    
    return 'Enter values here...';
  };

  const handleGenerateImage = async () => {
    if (!selectedSubTopic || !selectedTopic) return;
    setIsGeneratingImage(true);
    const url = await generateVisualAid(selectedTopic.title, selectedSubTopic.title);
    setVisualAidUrl(url);
    setIsGeneratingImage(false);
  };

  const runSolver = () => {
    if (!selectedSubTopic) return;
    
    let result;
    const title = selectedSubTopic.title.toLowerCase();
    
    // Priority routing
    if (title.includes('integer')) {
      result = SolverEngine.solveIntegers(solveInput);
    } else if (title.includes('standard form')) {
      result = SolverEngine.solveStandardForm(solveInput);
    } else if (title.includes('ratio')) {
      result = SolverEngine.solveRatio(solveInput);
    } else if (title.includes('substitution')) {
      result = SolverEngine.solveSubstitution(solveInput);
    } else if (title.includes('expansion') || title.includes('multiplication')) {
      result = SolverEngine.solveExpansion(solveInput);
    } else if (title.includes('algebraic expression')) {
      result = SolverEngine.solveAlgebraicExpression(solveInput);
    } else if (title.includes('simple equation') || title.includes('linear equation')) {
      result = SolverEngine.solveLinear(solveInput);
    } else if (title.includes('quadratic equation')) {
      result = SolverEngine.solveQuadratic(solveInput);
    } else if (title.includes('place value') || title.includes('whole number')) {
      result = SolverEngine.solvePlaceValue(solveInput);
    } else if (title.includes('hcf')) {
      result = SolverEngine.solveHCF(solveInput);
    } else if (title.includes('lcm')) {
      result = SolverEngine.solveLCM(solveInput);
    } else if (title.includes('fraction')) {
      result = SolverEngine.solveFractions(solveInput);
    } else if (title.includes('binary') || title.includes('number base')) {
      result = SolverEngine.solveBinary(solveInput);
    } else if (title.includes('perimeter')) {
      result = SolverEngine.solvePerimeter(solveInput);
    } else if (title.includes('area')) {
      result = SolverEngine.solveArea(solveInput);
    } else if (title.includes('statistics') || title.includes('data')) {
      result = SolverEngine.solveStatistics(solveInput);
    } else {
      result = { steps: [], finalAnswer: '', error: 'Logic engine for this specific topic is under development.' };
    }
    
    setSolveResult(result);
    setAiExplanation(null);
  };

  const askAi = async () => {
    if (!solveResult || !selectedSubTopic) return;
    setIsExplaining(true);
    const steps = solveResult.steps.map((s: any) => s.description);
    const expl = await getExplanation(selectedSubTopic.title, solveInput, steps);
    setAiExplanation(expl);
    setIsExplaining(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <Container>
        {(selectedLevel || selectedTopic) && (
          <button 
            onClick={handleBack}
            className="mb-6 text-emerald-800 flex items-center gap-2 font-black hover:text-emerald-900 transition-colors uppercase tracking-tight"
          >
            <span className="text-xl">Back</span>
          </button>
        )}

        {!selectedLevel && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Select Education Level</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(EducationLevel).map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm hover:border-emerald-600 hover:shadow-lg transition-all text-left group"
                >
                  <div className="text-emerald-700 font-black mb-2 uppercase text-[12px] tracking-[0.2em] group-hover:text-emerald-800">Nigeria NERDC</div>
                  <div className="text-3xl font-black text-slate-900">{level}</div>
                  <div className="mt-4 text-sm text-slate-900 font-bold uppercase tracking-tighter">Syllabus for {level}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedLevel && !selectedTopic && (
          <div className="space-y-6">
            <div className="bg-emerald-700 p-8 rounded-2xl text-white shadow-md">
              <h2 className="text-2xl font-black uppercase">Level: {selectedLevel}</h2>
              <p className="font-bold opacity-90 text-sm mt-1">Select a main topic chapter</p>
            </div>
            <div className="grid gap-4">
              {currentSyllabus?.topics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm flex justify-between items-center hover:bg-emerald-50 hover:border-emerald-600 transition-all group"
                >
                  <span className="font-black text-xl text-slate-900 group-hover:text-emerald-900 uppercase tracking-tight">{topic.title}</span>
                  <span className="text-emerald-700 font-black text-2xl group-hover:translate-x-2 transition-transform">GO</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedTopic && !selectedSubTopic && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-md">
              <h2 className="text-2xl font-black uppercase tracking-tight">{selectedTopic.title}</h2>
              <p className="font-bold opacity-70 text-sm mt-1 uppercase">Choose a specific lesson module</p>
            </div>
            <div className="grid gap-4">
              {selectedTopic.subTopics.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubTopic(sub)}
                  className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm text-left hover:border-emerald-500 transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-black text-xl text-slate-900 group-hover:text-emerald-800 uppercase tracking-tight">{sub.title}</div>
                    {sub.canSolve && (
                      <span className="bg-emerald-700 text-white text-[12px] px-3 py-1 rounded font-black uppercase tracking-widest">
                        Solvable
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-900 font-bold leading-relaxed italic">
                    <MathRenderer math={sub.description} className="line-clamp-2" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedSubTopic && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {mode === 'menu' && (
              <div className="bg-white p-10 rounded-[2.5rem] border-4 border-slate-200 shadow-2xl">
                <div className="text-emerald-700 font-black mb-2 uppercase text-sm tracking-[0.3em]">{selectedTopic?.title}</div>
                <h2 className="text-5xl font-black mb-6 text-slate-900 uppercase tracking-tighter leading-none">{selectedSubTopic.title}</h2>
                <div className="bg-slate-100 p-8 rounded-3xl mb-12 border-2 border-slate-200 italic">
                  <MathRenderer math={selectedSubTopic.description} className="text-xl text-slate-900 font-black" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button onClick={() => setMode('learn')} className="flex flex-col items-center gap-4 p-8 bg-blue-100 text-blue-900 rounded-[2rem] hover:bg-blue-200 hover:scale-[1.05] transition-all border-4 border-blue-200 shadow-lg">
                    <div className="text-3xl font-black uppercase">LEARN</div>
                    <span className="font-black uppercase tracking-widest text-sm">Learning</span>
                  </button>
                  <button onClick={() => { setMode('practice'); setPracticeIndex(0); }} className="flex flex-col items-center gap-4 p-8 bg-orange-100 text-orange-900 rounded-[2rem] hover:bg-orange-200 hover:scale-[1.05] transition-all border-4 border-orange-200 shadow-lg">
                    <div className="text-3xl font-black uppercase">PRACTICE</div>
                    <span className="font-black uppercase tracking-widest text-sm">Practice</span>
                  </button>
                  {selectedSubTopic.canSolve && (
                    <button onClick={() => setMode('solve')} className="flex flex-col items-center gap-4 p-8 bg-emerald-100 text-emerald-900 rounded-[2rem] hover:bg-emerald-200 hover:scale-[1.05] transition-all border-4 border-emerald-200 shadow-lg">
                      <div className="text-3xl font-black uppercase">SOLVE</div>
                      <span className="font-black uppercase tracking-widest text-sm">Solve</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {mode === 'learn' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                <div className="bg-white p-10 rounded-[2.5rem] border-4 border-slate-200 shadow-xl">
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-[0.3em] mb-8 text-center underline decoration-emerald-500 decoration-4 underline-offset-8">Educational Content</h3>
                  
                  {/* Specialized Static Visual for Perimeter */}
                  {selectedSubTopic.title.toLowerCase().includes('perimeter') && (
                    <div className="mb-12">
                      <PerimeterVisual />
                    </div>
                  )}

                  {/* Specialized Static Visual for Area */}
                  {selectedSubTopic.title.toLowerCase().includes('area') && (
                    <div className="mb-12">
                      <AreaVisual />
                    </div>
                  )}

                  {/* Specialized Static Visual for Statistics */}
                  {(selectedSubTopic.title.toLowerCase().includes('statistics') || selectedSubTopic.title.toLowerCase().includes('data')) && (
                    <div className="mb-12">
                      <StatisticsVisual />
                    </div>
                  )}

                  <div className="text-slate-900 leading-relaxed text-2xl font-black space-y-6">
                    <MathRenderer math={selectedSubTopic.description} />
                  </div>
                  
                  {visualAidUrl ? (
                    <div className="mt-12 rounded-[2rem] overflow-hidden border-8 border-slate-100 shadow-2xl bg-white">
                      <img src={visualAidUrl} alt="Visual Aid" className="w-full h-auto object-contain max-h-[600px]" />
                      <div className="p-4 bg-emerald-700 text-white text-[12px] text-center font-black uppercase tracking-[0.4em]">AI Visual Diagram</div>
                    </div>
                  ) : (
                    <div className="mt-12 flex flex-col items-center p-16 border-8 border-dotted rounded-[3rem] bg-slate-50 text-center border-slate-200">
                      <h4 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Need a Visual?</h4>
                      <p className="text-slate-900 font-bold text-lg mb-12 max-w-md">Generate a custom math diagram with AI to see the concept clearly.</p>
                      <button 
                        onClick={handleGenerateImage} 
                        disabled={isGeneratingImage}
                        className="bg-emerald-800 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-emerald-900 transition-all shadow-2xl shadow-emerald-200 disabled:opacity-50 active:scale-95 uppercase tracking-widest"
                      >
                        {isGeneratingImage ? 'Generating...' : 'Create Visual Aid'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {mode === 'solve' && (
              <div className="space-y-8 animate-in fade-in duration-300 pb-20">
                <div className="bg-white p-10 rounded-[2.5rem] border-4 border-slate-200 shadow-2xl">
                  <label className="block text-sm font-black text-slate-900 mb-6 uppercase tracking-[0.4em] text-center">Input Your Math Problem</label>
                  <div className="flex flex-col md:flex-row gap-6">
                    <input 
                      type="text" 
                      value={solveInput}
                      onChange={(e) => setSolveInput(e.target.value)}
                      placeholder={getPlaceholder(selectedSubTopic.title)}
                      className="flex-1 border-4 border-slate-100 p-8 rounded-[1.5rem] focus:ring-8 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none font-black text-3xl transition-all uppercase placeholder:text-slate-300"
                    />
                    <button onClick={runSolver} className="bg-emerald-800 text-white px-12 py-6 rounded-[1.5rem] font-black text-2xl hover:bg-emerald-900 shadow-2xl shadow-emerald-300 transition-all active:scale-95 uppercase">Solve</button>
                  </div>
                  {solveResult?.error && <p className="mt-6 text-red-700 text-lg font-black uppercase flex items-center gap-3">ERROR: {solveResult.error}</p>}
                </div>

                {solveResult && !solveResult.error && (
                  <div className="bg-white p-12 rounded-[3rem] border-4 border-slate-200 shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
                    <div className="flex justify-between items-center mb-12 border-b-4 border-slate-100 pb-8">
                      <h3 className="font-black text-2xl text-slate-900 flex items-center gap-4 uppercase tracking-tighter">
                        <span className="bg-emerald-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl">STEP</span> 
                        Solving Steps
                      </h3>
                      <span className="text-xs font-black text-slate-400 uppercase tracking-[0.5em]">Logic Verified</span>
                    </div>
                    <div className="space-y-10 mb-16">
                      {solveResult.steps.map((step: any, i: number) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-slate-50 border-2 border-slate-100">
                          <div className="flex items-start gap-6 flex-1">
                            <span className="text-emerald-700 font-black text-2xl">#{i+1}</span>
                            <MathRenderer math={step.description} className="text-slate-900 text-xl font-black leading-tight uppercase" />
                          </div>
                          <div className="bg-white border-4 border-emerald-500/20 px-10 py-5 rounded-2xl shadow-inner">
                            <MathRenderer math={step.expression} className="font-black text-slate-900 text-3xl text-right" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-emerald-800 p-12 rounded-[2.5rem] text-white text-center shadow-[0_20px_50px_rgba(6,78,59,0.3)] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl font-black">Σ</div>
                      <div className="text-sm opacity-80 uppercase font-black tracking-[0.5em] mb-6">Final Solution</div>
                      <MathRenderer math={solveResult.finalAnswer} className="text-7xl font-black" />
                    </div>
                    
                    <div className="mt-16 pt-12 border-t-4 border-slate-100">
                      {!aiExplanation ? (
                        <button onClick={askAi} disabled={isExplaining} className="w-full bg-slate-900 py-8 rounded-3xl text-white font-black text-2xl flex items-center justify-center gap-4 hover:bg-black transition-all shadow-2xl disabled:opacity-50 uppercase tracking-widest">
                          {isExplaining ? 'Instructor is Thinking...' : 'Request Full Explanation'}
                        </button>
                      ) : (
                        <div className="bg-blue-100 p-12 rounded-[2.5rem] border-4 border-blue-200 shadow-inner text-center">
                          <div className="flex items-center gap-4 mb-8 justify-center">
                            <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center text-white text-xl font-black">AI</div>
                            <h4 className="font-black text-blue-900 text-lg uppercase tracking-[0.3em]">Instructor's Logic Note</h4>
                          </div>
                          <MathRenderer math={aiExplanation} className="text-blue-900 text-2xl leading-relaxed font-black uppercase tracking-tight" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {mode === 'practice' && (
              <div className="space-y-6 pb-20">
                <div className="bg-white p-24 rounded-[4rem] border-8 border-dashed border-slate-100 shadow-sm text-center">
                  <h3 className="text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Preparing Exercises</h3>
                  <p className="text-slate-900 font-bold text-2xl max-w-xl mx-auto leading-relaxed uppercase">
                    Practice sets for <span className="text-emerald-700 font-black underline">{selectedSubTopic.title}</span> are coming soon to NaijaMath!
                  </p>
                  <button onClick={handleBack} className="mt-16 px-12 py-6 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-black transition-all uppercase tracking-widest shadow-xl">Go Back</button>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default App;
