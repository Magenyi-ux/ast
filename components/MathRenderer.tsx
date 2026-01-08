
import React from 'react';

/**
 * Renders mixed text and LaTeX content using KaTeX's renderToString.
 * Also handles Markdown-style bolding (**bold**) for regular text segments.
 */
export const MathRenderer: React.FC<{ math: string; className?: string }> = ({ math, className = "" }) => {
  const katex = (window as any).katex;

  if (!katex || !math) {
    return <div className={`${className} font-bold`}>{math || ""}</div>;
  }

  // Split string by math delimiters ($...$ or $$...$$) while keeping delimiters in results
  const parts = math.split(/(\$\$.*?\$\$|\$.*?\$)/gs);

  return (
    <div className={`${className} math-container font-bold`}>
      {parts.map((part, i) => {
        if (!part) return null;

        try {
          // Handle block math: $$ formula $$
          if (part.startsWith('$$') && part.endsWith('$$')) {
            const formula = part.slice(2, -2);
            const html = katex.renderToString(formula, { 
              displayMode: true, 
              throwOnError: false,
              trust: true
            });
            return <div key={i} dangerouslySetInnerHTML={{ __html: html }} className="my-2 overflow-x-auto font-bold" />;
          } 
          
          // Handle inline math: $ formula $
          if (part.startsWith('$') && part.endsWith('$')) {
            const formula = part.slice(1, -1);
            const html = katex.renderToString(formula, { 
              displayMode: false, 
              throwOnError: false,
              trust: true
            });
            return <span key={i} dangerouslySetInnerHTML={{ __html: html }} className="font-bold" />;
          }
        } catch (e) {
          console.error("KaTeX part rendering failed:", part, e);
          return <span key={i} className="font-bold">{part}</span>;
        }

        // Handle regular text with support for **bold**
        const textParts = part.split(/(\*\*.*?\*\*)/gs);
        return (
          <span key={i} className="font-bold">
            {textParts.map((t, j) => {
              if (t.startsWith('**') && t.endsWith('**')) {
                return <strong key={j} className="font-black text-slate-900">{t.slice(2, -2)}</strong>;
              }
              return t;
            })}
          </span>
        );
      })}
    </div>
  );
};
