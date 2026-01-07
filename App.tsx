
import React, { useState, useMemo } from 'react';
import { Header, Container, Footer } from './components/Layout';
import { EducationLevel, Topic, SubTopic, Syllabus } from './types';
import { NIGERIAN_SYLLABUS } from './constants';
import { SolverEngine } from './services/solverEngine';
import { getExplanation } from './services/geminiService';

const App: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedSubTopic, setSelectedSubTopic] = useState<SubTopic | null>(null);
  const [mode, setMode] = useState<'menu' | 'learn' | 'practice' | 'solve'>('menu');

  // Solver State
  const [solveInput, setSolveInput] = useState('');
  const [solveResult, setSolveResult] = useState<any>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  // Practice State
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const currentSyllabus = useMemo(() => 
    NIGERIAN_SYLLABUS.find(s => s.level === selectedLevel), [selectedLevel]);

  const handleBack = () => {
    if (mode !== 'menu') {
      setMode('menu');
      setSolveResult(null);
      setAiExplanation(null);
    } else if (selectedSubTopic) {
      setSelectedSubTopic(null);
    } else if (selectedTopic) {
      setSelectedTopic(null);
    } else {
      setSelectedLevel(null);
    }
  };

  const runSolver = () => {
    if (!selectedSubTopic) return;
    
    let result;
    const title = selectedSubTopic.title.toLowerCase();
    
    if (title.includes('linear equation') || title.includes('simple equation')) {
      result = SolverEngine.solveLinear(solveInput);
    } else if (title.includes('quadratic equation')) {
      result = SolverEngine.solveQuadratic(solveInput);
    } else {
      result = { steps: [], finalAnswer: '', error: 'Engine for this topic is still being developed.' };
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <Container>
        {/* Navigation Breadcrumbs / Back */}
        {(selectedLevel || selectedTopic) && (
          <button 
            onClick={handleBack}
            className="mb-4 text-emerald-700 flex items-center gap-1 font-medium hover:underline"
          >
            ← Back
          </button>
        )}

        {/* Level Selection */}
        {!selectedLevel && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <h2 className="col-span-full text-2xl font-bold text-slate-800 mb-2">Select Your Level</h2>
            {Object.values(EducationLevel).map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all text-left"
              >
                <div className="text-emerald-600 font-bold mb-1 uppercase text-xs">Secondary School</div>
                <div className="text-xl font-bold">{level}</div>
              </button>
            ))}
          </div>
        )}

        {/* Topic Selection */}
        {selectedLevel && !selectedTopic && (
          <div className="space-y-4">
            <div className="bg-emerald-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-bold text-emerald-900">Level: {selectedLevel}</h2>
              <p className="text-emerald-700 text-sm">Pick a topic from the National Curriculum</p>
            </div>
            <div className="grid gap-3">
              {currentSyllabus?.topics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-lg">{topic.title}</span>
                  <span className="text-slate-400">→</span>
                </button>
              ))}
              {(!currentSyllabus || currentSyllabus.topics.length === 0) && (
                <div className="text-center py-10 text-slate-400 italic">Topics for this level are coming soon.</div>
              )}
            </div>
          </div>
        )}

        {/* Sub-Topic Selection */}
        {selectedTopic && !selectedSubTopic && (
          <div className="space-y-4">
             <div className="bg-slate-100 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-bold text-slate-900">{selectedTopic.title}</h2>
              <p className="text-slate-600 text-sm">Choose a specific area to focus on</p>
            </div>
            <div className="grid gap-3">
              {selectedTopic.subTopics.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubTopic(sub)}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-left hover:border-emerald-300 transition-all group"
                >
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-lg mb-1 group-hover:text-emerald-700">{sub.title}</div>
                    {sub.canSolve && <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest">Solvable</span>}
                  </div>
                  <p className="text-sm text-slate-500">{sub.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Mode: SubTopic Details */}
        {selectedSubTopic && (
          <div className="space-y-6">
            {mode === 'menu' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-2xl font-bold mb-2">{selectedSubTopic.title}</h2>
                  <p className="text-slate-600 mb-6">{selectedSubTopic.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                      onClick={() => setMode('learn')}
                      className="flex flex-col items-center gap-3 p-6 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <div className="text-2xl">📖</div>
                      <span className="font-bold uppercase tracking-wider text-xs">Learn</span>
                    </button>
                    <button 
                      onClick={() => { setMode('practice'); setPracticeIndex(0); setShowSolution(false); }}
                      className="flex flex-col items-center gap-3 p-6 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-colors"
                    >
                      <div className="text-2xl">✍️</div>
                      <span className="font-bold uppercase tracking-wider text-xs">Practice</span>
                    </button>
                    {selectedSubTopic.canSolve && (
                      <button 
                        onClick={() => setMode('solve')}
                        className="flex flex-col items-center gap-3 p-6 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors"
                      >
                        <div className="text-2xl">⚙️</div>
                        <span className="font-bold uppercase tracking-wider text-xs">Solve</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Learn Mode */}
            {mode === 'learn' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <section>
                  <h3 className="text-lg font-bold text-slate-800 border-l-4 border-emerald-500 pl-3 mb-4 uppercase tracking-tight">Formulas</h3>
                  {selectedSubTopic.formulas.length > 0 ? (
                    <div className="grid gap-3">
                      {selectedSubTopic.formulas.map((f, i) => (
                        <div key={i} className="bg-emerald-50 p-4 rounded-xl flex items-center justify-between border border-emerald-100">
                          <div>
                            <div className="font-bold text-emerald-900">{f.name}</div>
                            <div className="text-sm text-emerald-700">Variables: {f.variables.join(', ')}</div>
                          </div>
                          <div className="bg-white px-4 py-2 rounded-lg font-mono text-lg border border-emerald-200">
                            {f.latex}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-slate-400 italic bg-slate-50 p-4 rounded-lg">Detailed formulas for this topic are currently being populated. Check back soon.</p>}
                </section>

                <section>
                  <h3 className="text-lg font-bold text-slate-800 border-l-4 border-blue-500 pl-3 mb-4 uppercase tracking-tight">Worked Examples</h3>
                  {selectedSubTopic.examples.length > 0 ? (
                    <div className="space-y-4">
                      {selectedSubTopic.examples.map((ex, i) => (
                        <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                          <div className="font-bold text-lg mb-3">Q: {ex.question}</div>
                          <div className="space-y-2 mb-4">
                            {ex.steps.map((step, si) => (
                              <div key={si} className="flex gap-3 text-slate-600 text-sm">
                                <span className="bg-slate-100 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">{si + 1}</span>
                                <p>{step}</p>
                              </div>
                            ))}
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg text-blue-800 font-bold border border-blue-100">
                            Final Answer: {ex.answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-slate-400 italic bg-slate-50 p-4 rounded-lg text-sm">Our curriculum experts are preparing worked examples for this sub-topic.</p>}
                </section>
              </div>
            )}

            {/* Solve Mode */}
            {mode === 'solve' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Enter Equation</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={solveInput}
                      onChange={(e) => setSolveInput(e.target.value)}
                      placeholder={selectedSubTopic.title.toLowerCase().includes('linear') ? 'e.g. 2x + 4 = 10' : 'e.g. 1x^2 - 5x + 6 = 0'}
                      className="flex-1 border p-4 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-lg"
                    />
                    <button 
                      onClick={runSolver}
                      className="bg-emerald-600 text-white px-8 rounded-xl font-bold hover:bg-emerald-700 shadow-md transition-colors"
                    >
                      Solve
                    </button>
                  </div>
                  {solveResult?.error && (
                    <p className="mt-2 text-red-500 text-sm font-medium">{solveResult.error}</p>
                  )}
                </div>

                {solveResult && !solveResult.error && (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg animate-in slide-in-from-bottom duration-300">
                    <h3 className="font-bold text-lg mb-4 text-emerald-800 flex items-center gap-2">
                      <span>✓</span> Solution Engine Output
                    </h3>
                    <div className="space-y-4 mb-6">
                      {solveResult.steps.map((step: any, i: number) => (
                        <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-3">
                          <span className="text-slate-500 text-sm italic">{step.description}</span>
                          <span className="font-mono font-bold text-slate-800 text-lg">{step.expression}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-emerald-600 p-4 rounded-xl text-white text-center">
                      <div className="text-xs opacity-80 uppercase font-bold tracking-widest mb-1">Final Answer</div>
                      <div className="text-2xl font-bold font-mono">{solveResult.finalAnswer}</div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                      {!aiExplanation ? (
                        <button 
                          onClick={askAi}
                          disabled={isExplaining}
                          className="w-full bg-slate-100 py-3 rounded-xl text-slate-700 font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors disabled:opacity-50"
                        >
                          {isExplaining ? 'Asking Teacher...' : '✨ Explain these steps (AI Teacher)'}
                        </button>
                      ) : (
                        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                            <span>🎓</span> Teacher's Explanation
                          </h4>
                          <p className="text-blue-800 text-sm leading-relaxed whitespace-pre-wrap">
                            {aiExplanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Practice Mode */}
            {mode === 'practice' && (
              <div className="space-y-6">
                {selectedSubTopic.practice.length > 0 ? (
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
                     <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold uppercase mb-4">
                      Question {practiceIndex + 1} of {selectedSubTopic.practice.length}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
                      {selectedSubTopic.practice[practiceIndex].question}
                    </h3>
                    
                    {!showSolution ? (
                      <button 
                        onClick={() => setShowSolution(true)}
                        className="bg-orange-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:bg-orange-700 transition-transform active:scale-95"
                      >
                        Reveal Solution
                      </button>
                    ) : (
                      <div className="space-y-6 animate-in zoom-in duration-300">
                        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                          <div className="text-xs uppercase font-bold text-green-700 mb-2">Answer</div>
                          <div className="text-3xl font-bold text-green-900">{selectedSubTopic.practice[practiceIndex].answer}</div>
                        </div>
                        <div className="text-left bg-slate-50 p-6 rounded-xl">
                          <div className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-widest">Logic Steps</div>
                          <ul className="space-y-3">
                            {selectedSubTopic.practice[practiceIndex].solution.map((s, idx) => (
                              <li key={idx} className="flex gap-3 text-slate-600">
                                <span className="text-emerald-500 font-bold">•</span>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button 
                          onClick={() => {
                            const next = (practiceIndex + 1) % selectedSubTopic.practice.length;
                            setPracticeIndex(next);
                            setShowSolution(false);
                          }}
                          className="w-full border-2 border-orange-600 text-orange-600 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors"
                        >
                          Next Question
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <div className="text-4xl mb-4">⏳</div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Practice Set Coming Soon</h3>
                    <p className="text-slate-500">Our team is manually curating high-quality WAEC/NECO questions for this topic.</p>
                  </div>
                )}
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
