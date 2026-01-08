
import { SolverResult, SolutionStep } from '../types';

/**
 * Deterministic Solver Engine
 * Handles specific math patterns based on the Nigerian Syllabus
 */
export class SolverEngine {
  /**
   * Helper to find GCD/HCF
   */
  private static gcd(a: number, b: number): number {
    return b === 0 ? Math.abs(a) : this.gcd(b, a % b);
  }

  /**
   * Helper to simplify fractions using HCF (JSS1 Method)
   */
  private static simplifyFraction(n: number, d: number, steps: SolutionStep[]): SolverResult {
    const commonDivisor = this.gcd(n, d);
    
    if (commonDivisor > 1) {
      const simpleN = n / commonDivisor;
      const simpleD = d / commonDivisor;
      steps.push({ 
        description: `Find the highest number that divides both top and bottom (HCF of ${n} and ${d} is ${commonDivisor})`, 
        expression: `$HCF = ${commonDivisor}$` 
      });
      steps.push({ 
        description: `Divide numerator and denominator by their HCF to simplify`, 
        expression: `$\\frac{${n}}{${d}} = \\frac{${n} \\div ${commonDivisor}}{${d} \\div ${commonDivisor}} = \\frac{${simpleN}}{${simpleD}}$` 
      });
      return { steps, finalAnswer: `$\\frac{${simpleN}}{${simpleD}}$` };
    }
    return { steps, finalAnswer: `$\\frac{${n}}{${d}}$` };
  }

  /**
   * Solves standard form conversion
   * Format: std:45000 | std:0.007
   */
  static solveStandardForm(input: string): SolverResult {
    const cleaned = input.toLowerCase().replace('std:', '').trim();
    const num = parseFloat(cleaned);
    if (isNaN(num)) return { steps: [], finalAnswer: '', error: 'Enter a valid number' };

    const steps: SolutionStep[] = [];
    if (num === 0) return { steps, finalAnswer: '$0$' };
    
    const exponent = Math.floor(Math.log10(Math.abs(num)));
    const a = num / Math.pow(10, exponent);
    
    steps.push({ description: 'Identify number', expression: `$${num}$` });
    steps.push({ 
      description: exponent >= 0 ? 'Count places to move decimal LEFT' : 'Count places to move decimal RIGHT', 
      expression: `$n = ${exponent}$` 
    });
    steps.push({ 
      description: 'Move decimal to get a value between 1 and 10', 
      expression: `$a = ${a.toFixed(2)}$` 
    });

    return { 
      steps, 
      finalAnswer: `$${a.toFixed(2)} \\times 10^{${exponent}}$` 
    };
  }

  /**
   * Solves integer arithmetic
   * Format: int:5+(-3) | int:(-2)*(-4)
   */
  static solveIntegers(input: string): SolverResult {
    const cleaned = input.toLowerCase().replace('int:', '').replace(/\s+/g, '');
    const steps: SolutionStep[] = [];

    try {
      // Basic parser for a op b
      const match = cleaned.match(/^(\(-?\d+\)|-?\d+)([+\-*\/])(\(-?\d+\)|-?\d+)$/);
      if (!match) return { steps: [], finalAnswer: '', error: 'Use format: int:a+b or int:a*b' };

      const parseNum = (s: string) => parseInt(s.replace('(', '').replace(')', ''));
      const a = parseNum(match[1]);
      const op = match[2];
      const b = parseNum(match[3]);

      steps.push({ description: 'Identify numbers and operator', expression: `$${a} ${op} ${b}$` });

      let result: number = 0;
      if (op === '+') {
        result = a + b;
        if (a < 0 && b < 0) steps.push({ description: 'Adding two negatives: Sum numbers, keep sign', expression: `$${a} + ${b} = ${result}$` });
        else if (a < 0 || b < 0) steps.push({ description: 'Adding different signs: Subtract smaller from larger, keep larger sign', expression: `$|${a}|, |${b}| \\rightarrow ${result}$` });
      } else if (op === '-') {
        result = a - b;
        steps.push({ description: 'Change subtraction to addition of the opposite', expression: `$${a} + (${-b})$` });
      } else if (op === '*') {
        result = a * b;
        const same = (a < 0 && b < 0) || (a > 0 && b > 0);
        steps.push({ description: same ? 'Same signs = Positive' : 'Different signs = Negative', expression: `$${a} \\times ${b} = ${result}$` });
      } else if (op === '/') {
        if (b === 0) throw new Error("Division by zero");
        result = a / b;
        steps.push({ description: 'Divide values and apply sign rules', expression: `$${a} \\div ${b} = ${result}$` });
      }

      return { steps, finalAnswer: `$${result}$` };
    } catch (e) {
      return { steps: [], finalAnswer: '', error: 'Parsing error or Division by zero' };
    }
  }

  /**
   * Solves Ratio simplification
   * Format: ratio:12:18
   */
  static solveRatio(input: string): SolverResult {
    const cleaned = input.toLowerCase().replace('ratio:', '').trim();
    const parts = cleaned.split(':').map(Number);
    if (parts.length !== 2 || parts.some(isNaN)) return { steps: [], finalAnswer: '', error: 'Use format: ratio:12:18' };

    const steps: SolutionStep[] = [];
    const hcf = this.gcd(parts[0], parts[1]);
    
    steps.push({ description: 'Identify ratio parts', expression: `$${parts[0]} : ${parts[1]}$` });
    steps.push({ description: 'Find HCF of both parts', expression: `$HCF(${parts[0]}, ${parts[1]}) = ${hcf}$` });
    
    if (hcf > 1) {
      const res1 = parts[0] / hcf;
      const res2 = parts[1] / hcf;
      steps.push({ description: 'Divide both parts by the HCF', expression: `$(${parts[0]} \\div ${hcf}) : (${parts[1]} \\div ${hcf})$` });
      return { steps, finalAnswer: `$${res1} : ${res2}$` };
    }

    return { steps, finalAnswer: `$${parts[0]} : ${parts[1]}$` };
  }

  /**
   * Solves basic statistics problems (Ordering, Frequency)
   */
  static solveStatistics(input: string): SolverResult {
    const cleaned = input.toLowerCase().replace(/\s+/g, '');
    const steps: SolutionStep[] = [];

    // Order data: order:5,8,6,10,7
    if (cleaned.startsWith('order:')) {
      const dataStr = cleaned.replace('order:', '');
      const nums = dataStr.split(',').map(Number).filter(n => !isNaN(n));
      if (nums.length === 0) return { steps: [], finalAnswer: '', error: 'Provide a list of numbers: order:5,8,6' };

      steps.push({ description: 'Identify Raw Data', expression: `\\{${nums.join(', ')}\\}` });
      const sorted = [...nums].sort((a, b) => a - b);
      steps.push({ description: 'Arrange in Ascending Order (Smallest to Largest)', expression: `\\{${sorted.join(', ')}\\}` });
      return { steps, finalAnswer: `\\text{Ordered Set: } \\{${sorted.join(', ')}\\}` };
    }

    // Frequency table: freq:2,4,6,4,2,4,8
    if (cleaned.startsWith('freq:')) {
      const dataStr = cleaned.replace('freq:', '');
      const nums = dataStr.split(',').map(n => n.trim()).filter(n => n !== '');
      if (nums.length === 0) return { steps: [], finalAnswer: '', error: 'Provide a list of values: freq:2,4,6' };

      steps.push({ description: 'Identify Raw Data values', expression: `\\text{Count: } ${nums.length}` });
      
      const counts: Record<string, number> = {};
      nums.forEach(n => counts[n] = (counts[n] || 0) + 1);

      const uniqueValues = Object.keys(counts).sort((a, b) => isNaN(Number(a)) ? a.localeCompare(b) : Number(a) - Number(b));
      
      uniqueValues.forEach(val => {
        const tallyCount = counts[val];
        let tally = '';
        for(let i=1; i<=tallyCount; i++) {
          tally += (i % 5 === 0) ? '/ ' : '|';
        }
        steps.push({ 
          description: `Count occurrences of value "${val}"`, 
          expression: `\\text{Tally: } ${tally} \\rightarrow f = ${counts[val]}` 
        });
      });

      const finalRows = uniqueValues.map(v => `${v} (${counts[v]})`).join(', ');
      return { steps, finalAnswer: `\\text{Frequencies: } ${finalRows}` };
    }

    return { 
      steps: [], 
      finalAnswer: '', 
      error: 'Format: order:5,8,6 | freq:2,4,2,6' 
    };
  }

  /**
   * Solves area for common shapes and missing dimensions
   */
  static solveArea(input: string): SolverResult {
    const cleaned = input.toLowerCase().replace(/\s+/g, '');
    const steps: SolutionStep[] = [];

    // Missing side in rectangle: find:breadth,area=48,l=8
    if (cleaned.includes('find:breadth') && cleaned.includes('area=')) {
        const aMatch = cleaned.match(/area=(\d+\.?\d*)/);
        const lMatch = cleaned.match(/l=(\d+\.?\d*)/);
        if (aMatch && lMatch) {
            const a = parseFloat(aMatch[1]);
            const l = parseFloat(lMatch[1]);
            const b = a / l;
            steps.push({ description: 'Identify shape: Rectangle', expression: '$\\text{Rectangle}$' });
            steps.push({ description: 'Given Area ($A$) and Length ($l$)', expression: `$A = ${a}, l = ${l}$` });
            steps.push({ description: 'Apply formula $A = l \\times b$', expression: `$${a} = ${l} \\times b$` });
            steps.push({ description: 'Divide area by length to find breadth', expression: `$b = \\frac{${a}}{${l}}$` });
            return { steps, finalAnswer: `$b = ${b}$` };
        }
    }

    // Missing side in rectangle: find:length,area=48,b=6
    if (cleaned.includes('find:length') && cleaned.includes('area=')) {
        const aMatch = cleaned.match(/area=(\d+\.?\d*)/);
        const bMatch = cleaned.match(/b=(\d+\.?\d*)/);
        if (aMatch && bMatch) {
            const a = parseFloat(aMatch[1]);
            const b = parseFloat(bMatch[2]);
            const l = a / b;
            steps.push({ description: 'Identify shape: Rectangle', expression: '$\\text{Rectangle}$' });
            steps.push({ description: 'Given Area ($A$) and Breadth ($b$)', expression: `$A = ${a}, b = ${b}$` });
            steps.push({ description: 'Apply formula $A = l \\times b$', expression: `$${a} = l \\times ${b}$` });
            steps.push({ description: 'Divide area by breadth to find length', expression: `$l = \\frac{${a}}{${b}}$` });
            return { steps, finalAnswer: `$l = ${l}$` };
        }
    }

    // Rectangle Area: rect:l=8,b=5
    if (cleaned.startsWith('rect')) {
        const match = cleaned.match(/l=(\d+\.?\d*),b=(\d+\.?\d*)/);
        if (match) {
            const l = parseFloat(match[1]);
            const b = parseFloat(match[2]);
            const area = l * b;
            steps.push({ description: 'Identify shape: Rectangle', expression: '$\\text{Rectangle}$' });
            steps.push({ description: 'Identify dimensions', expression: `$l = ${l}, b = ${b}$` });
            steps.push({ description: 'Apply formula $Area = l \\times b$', expression: `$Area = ${l} \\times ${b}$` });
            return { steps, finalAnswer: `$Area = ${area}$` };
        }
    }

    // Square Area: square:s=6
    if (cleaned.startsWith('square')) {
        const match = cleaned.match(/s=(\d+\.?\d*)/);
        if (match) {
            const s = parseFloat(match[1]);
            const area = s * s;
            steps.push({ description: 'Identify shape: Square', expression: '$\\text{Square}$' });
            steps.push({ description: 'Identify side ($s$)', expression: `$s = ${s}$` });
            steps.push({ description: 'Apply formula $Area = s^2$', expression: `$Area = ${s} \\times ${s}$` });
            return { steps, finalAnswer: `$Area = ${area}$` };
        }
    }

    return { 
        steps: [], 
        finalAnswer: '', 
        error: 'Format: rect:l=8,b=5 | square:s=6 | find:breadth,area=48,l=8' 
    };
  }

  /**
   * Solves perimeter for common shapes
   */
  static solvePerimeter(input: string): SolverResult {
    const cleaned = input.toLowerCase().replace(/\s+/g, '');
    const steps: SolutionStep[] = [];

    // Missing side: find:breadth,p=26,l=8
    if (cleaned.includes('find:breadth')) {
      const pMatch = cleaned.match(/p=(\d+\.?\d*)/);
      const lMatch = cleaned.match(/l=(\d+\.?\d*)/);
      if (pMatch && lMatch) {
        const p = parseFloat(pMatch[1]);
        const l = parseFloat(lMatch[1]);
        const b = (p / 2) - l;
        steps.push({ description: 'Identify Goal: Find Breadth ($b$)', expression: '$\\text{Rectangle}$' });
        steps.push({ description: 'Given Perimeter ($P$) and Length ($l$)', expression: `$P = ${p}, l = ${l}$` });
        steps.push({ description: 'Apply formula $P = 2(l + b)$', expression: `$${p} = 2(${l} + b)$` });
        steps.push({ description: 'Divide both sides by 2', expression: `$\\frac{${p}}{2} = ${l} + b \\rightarrow ${p/2} = ${l} + b$` });
        steps.push({ description: 'Subtract length from both sides to find breadth', expression: `$b = ${p/2} - ${l}$` });
        return { steps, finalAnswer: `$b = ${b}$` };
      }
    }

    // Rectangle: rect:l=8,b=5
    if (cleaned.startsWith('rect')) {
      const match = cleaned.match(/l=(\d+\.?\d*),b=(\d+\.?\d*)/);
      if (match) {
        const l = parseFloat(match[1]);
        const b = parseFloat(match[2]);
        const p = 2 * (l + b);
        steps.push({ description: 'Identify shape: Rectangle', expression: '$\\text{Rectangle}$' });
        steps.push({ description: 'Identify length ($l$) and breadth ($b$)', expression: `$l = ${l}, b = ${b}$` });
        steps.push({ description: 'Apply formula $P = 2(l + b)$', expression: `$P = 2(${l} + ${b})$` });
        steps.push({ description: 'Sum dimensions inside brackets', expression: `$P = 2(${l + b})$` });
        steps.push({ description: 'Calculate final perimeter', expression: `$P = ${p}$` });
        return { steps, finalAnswer: `$P = ${p}$` };
      }
    }

    return { 
      steps: [], 
      finalAnswer: '', 
      error: 'Format: rect:l=8,b=5 | find:breadth,p=26,l=8' 
    };
  }

  /**
   * Solves linear equations of format: ax + b = c
   */
  static solveLinear(input: string): SolverResult {
    const match = input.toLowerCase().replace(/\s+/g, '').match(/^([+-]?\d*)x([+-]\d+)=([+-]?\d+)$/);

    if (!match) {
      return {
        steps: [],
        finalAnswer: '',
        error: 'Please use format: ax + b = c (e.g., 2x + 4 = 10)'
      };
    }

    let [, aStr, bStr, cStr] = match;
    let a = aStr === '' ? 1 : (aStr === '+' ? 1 : (aStr === '-' ? -1 : parseInt(aStr)));
    const b = parseInt(bStr);
    const c = parseInt(cStr);

    const steps: SolutionStep[] = [];
    const aText = a === 1 ? '' : (a === -1 ? '-' : a.toString());
    steps.push({ description: 'Original equation', expression: `$${aText}x ${b >= 0 ? '+' : ''}${b} = ${c}$` });

    const newC = c - b;
    steps.push({ description: `${b >= 0 ? 'Subtract' : 'Add'} ${Math.abs(b)} from both sides`, expression: `$${aText}x = ${c} - (${b >= 0 ? '' : ''}${b}) = ${newC}$` });

    if (a !== 1) {
      const x = newC / a;
      steps.push({ description: `Divide both sides by ${a}`, expression: `$x = \\frac{${newC}}{${a}}$` });
      steps.push({ description: 'Final result', expression: `$x = ${x}$` });
      return { steps, finalAnswer: `$x = ${x}$` };
    } else {
      steps.push({ description: 'Final result', expression: `$x = ${newC}$` });
      return { steps, finalAnswer: `$x = ${newC}$` };
    }
  }

  /**
   * Simplifies algebraic expressions like 3x + 5y - x + 2
   */
  static solveAlgebraicExpression(input: string): SolverResult {
    const cleaned = input.toLowerCase().replace(/\s+/g, '');
    const termRegex = /([+-]?\d*[a-z]?)/g;
    const terms = cleaned.match(termRegex)?.filter(t => t !== '') || [];
    
    if (terms.length === 0) return { steps: [], finalAnswer: '', error: 'Enter a valid expression' };

    const steps: SolutionStep[] = [];
    const groups: Record<string, number> = {};

    steps.push({ description: 'Identify all terms in the expression', expression: `$${input}$` });

    terms.forEach(term => {
      const varMatch = term.match(/([+-]?\d*)([a-z]?)/);
      if (varMatch) {
        let coeffStr = varMatch[1];
        let variable = varMatch[2] || 'constant';
        let coeff = coeffStr === '' || coeffStr === '+' ? 1 : (coeffStr === '-' ? -1 : parseInt(coeffStr));
        groups[variable] = (groups[variable] || 0) + coeff;
      }
    });

    const finalParts: string[] = [];
    Object.entries(groups).forEach(([variable, coefficient]) => {
      if (coefficient === 0) return;
      if (variable === 'constant') {
        finalParts.push(`${coefficient >= 0 ? '+' : ''}${coefficient}`);
      } else {
        const cStr = coefficient === 1 ? '' : (coefficient === -1 ? '-' : coefficient.toString());
        finalParts.push(`${coefficient >= 0 ? '+' : ''}${cStr}${variable}`);
      }
    });

    let finalAnswer = finalParts.join(' ').replace(/^\+/, '');
    if (finalAnswer === '') finalAnswer = '0';

    steps.push({ description: 'Combine coefficients of like terms', expression: `$${finalAnswer}$` });

    return { steps, finalAnswer: `$${finalAnswer}$` };
  }

  /**
   * Handles expansion of brackets like 3(x + 4)
   */
  static solveExpansion(input: string): SolverResult {
    const match = input.toLowerCase().replace(/\s+/g, '').match(/^([+-]?\d*)\(([+-]?\d*[a-z]?)([+-]\d+[a-z]?)\)$/);
    
    if (!match) return { steps: [], finalAnswer: '', error: 'Format: a(bx + c). Example: 3(x + 4)' };

    let [, outerStr, term1Str, term2Str] = match;
    const outer = outerStr === '' || outerStr === '+' ? 1 : (outerStr === '-' ? -1 : parseInt(outerStr));
    
    const steps: SolutionStep[] = [];
    steps.push({ description: 'Original expression', expression: `$${input}$` });
    steps.push({ description: 'Multiply the outside term by every term inside the bracket', expression: `$${outer} \\times (${term1Str}) + ${outer} \\times (${term2Str})$` });

    const solveTerm = (t: string) => {
      const m = t.match(/([+-]?\d*)([a-z]?)/);
      const c = m![1] === '' || m![1] === '+' ? 1 : (m![1] === '-' ? -1 : parseInt(m![1]));
      return { coeff: outer * c, variable: m![2] };
    };

    const res1 = solveTerm(term1Str);
    const res2 = solveTerm(term2Str);

    const fmt = (r: { coeff: number, variable: string }, isLeading: boolean) => {
      let s = r.coeff === 1 && r.variable !== '' ? '' : (r.coeff === -1 && r.variable !== '' ? '-' : r.coeff.toString());
      if (!isLeading && r.coeff > 0) s = '+' + s;
      return `${s}${r.variable}`;
    };

    const finalAnswer = `${fmt(res1, true)} ${fmt(res2, false)}`;
    steps.push({ description: 'Final expanded form', expression: `$${finalAnswer}$` });

    return { steps, finalAnswer: `$${finalAnswer}$` };
  }

  /**
   * Handles substitution like x=3; 2x + 5
   */
  static solveSubstitution(input: string): SolverResult {
    const parts = input.toLowerCase().replace(/\s+/g, '').split(';');
    if (parts.length < 2) return { steps: [], finalAnswer: '', error: 'Format: x=3; 2x + 5' };

    const assignment = parts[0].match(/^([a-z])=([+-]?\d+)$/);
    if (!assignment) return { steps: [], finalAnswer: '', error: 'Invalid variable assignment. Example: x=3' };

    const variable = assignment[1];
    const value = parseInt(assignment[2]);
    const expression = parts[1];

    const steps: SolutionStep[] = [];
    steps.push({ description: `Substitute ${variable} = ${value} into the expression`, expression: `$${expression}$` });

    const exprMatch = expression.match(/^([+-]?\d*)([a-z])([+-]\d+)$/);
    if (exprMatch && exprMatch[2] === variable) {
      const a = exprMatch[1] === '' || exprMatch[1] === '+' ? 1 : (exprMatch[1] === '-' ? -1 : parseInt(exprMatch[1]));
      const b = parseInt(exprMatch[3]);
      const product = a * value;
      const final = product + b;
      
      steps.push({ description: 'Replace variable with number', expression: `$${a}(${value}) ${b >= 0 ? '+' : ''}${b}$` });
      steps.push({ description: 'Multiply', expression: `$${product} ${b >= 0 ? '+' : ''}${b}$` });
      steps.push({ description: 'Add/Subtract', expression: `$${final}$` });
      
      return { steps, finalAnswer: `$${final}$` };
    }

    return { steps: [], finalAnswer: '', error: 'Currently supports linear substitution like x=3; 2x+5' };
  }

  /**
   * Solves fraction operations
   */
  static solveFractions(input: string): SolverResult {
    const cleaned = input.replace(/\s+/g, '');
    const match = cleaned.match(/^(\d+)\/(\d+)([+\-*\/])(\d+)\/(\d+)$/);
    if (!match) return { steps: [], finalAnswer: '', error: 'Use format: a/b + c/d, a/b * c/d, etc.' };

    let [, n1Str, d1Str, op, n2Str, d2Str] = match;
    const n1 = parseInt(n1Str), d1 = parseInt(d1Str);
    const n2 = parseInt(n2Str), d2 = parseInt(d2Str);

    if (d1 === 0 || d2 === 0) return { steps: [], finalAnswer: '', error: 'Denominator cannot be zero' };

    const gcdFn = (a: number, b: number): number => b === 0 ? Math.abs(a) : gcdFn(b, a % b);
    const steps: SolutionStep[] = [];

    if (op === '+' || op === '-') {
      if (d1 === d2) {
        const finalN = op === '+' ? n1 + n2 : n1 - n2;
        steps.push({ 
          description: `${op === '+' ? 'Add' : 'Subtract'} numerators, keep denominator the same`, 
          expression: `$\\frac{${n1} ${op} ${n2}}{${d1}} = \\frac{${finalN}}{${d1}}$` 
        });
        return this.simplifyFraction(finalN, d1, steps);
      } else {
        const commonD = (d1 * d2) / gcdFn(d1, d2);
        steps.push({ description: 'Find the LCM of denominators', expression: `$\\text{LCM}(${d1}, ${d2}) = ${commonD}$` });

        const mult1 = commonD / d1;
        const mult2 = commonD / d2;
        const newN1 = n1 * mult1;
        const newN2 = n2 * mult2;

        steps.push({ description: `Convert each fraction to the LCM denominator`, expression: `$\\frac{${n1}}{${d1}} = \\frac{${newN1}}{${commonD}}, \\quad \\frac{${n2}}{${d2}} = \\frac{${newN2}}{${commonD}}$` });

        const finalN = op === '+' ? newN1 + newN2 : newN1 - newN2;
        steps.push({ description: `${op === '+' ? 'Add' : 'Subtract'} numerators`, expression: `$\\frac{${newN1} ${op} ${newN2}}{${commonD}} = \\frac{${finalN}}{${commonD}}$` });
        
        return this.simplifyFraction(finalN, commonD, steps);
      }
    } 
    else if (op === '*') {
      const finalN = n1 * n2;
      const finalD = d1 * d2;
      steps.push({ description: 'Multiply numerators together', expression: `$${n1} \\times ${n2} = ${finalN}$` });
      steps.push({ description: 'Multiply denominators together', expression: `$${d1} \\times ${d2} = ${finalD}$` });
      return this.simplifyFraction(finalN, finalD, steps);
    } 
    else if (op === '/') {
      if (n2 === 0) return { steps: [], finalAnswer: '', error: 'Cannot divide by zero' };
      steps.push({ description: 'Change the division sign to multiplication', expression: `$\\frac{${n1}}{${d1}} \\div \\frac{${n2}}{${d2}} \\rightarrow \\frac{${n1}}{${d1}} \\times ?$` });
      steps.push({ description: 'Turn the second fraction upside down (Reciprocal)', expression: `$\\frac{${n2}}{${d2}} \\rightarrow \\frac{${d2}}{${n2}}$` });
      const finalN = n1 * d2;
      const finalD = d1 * n2;
      steps.push({ description: 'Multiply', expression: `$\\frac{${n1}}{${d1}} \\times \\frac{${d2}}{${n2}} = \\frac{${finalN}}{${finalD}}$` });
      return this.simplifyFraction(finalN, finalD, steps);
    }

    return { steps: [], finalAnswer: '', error: 'Unsupported operation' };
  }

  /**
   * Solves binary to decimal and decimal to binary conversion
   */
  static solveBinary(input: string): SolverResult {
    const steps: SolutionStep[] = [];
    if (/^[01]+$/.test(input)) {
      let decimal = 0;
      const bits = input.split('').reverse();
      steps.push({ description: `Expand binary digits using powers of 2`, expression: bits.map((b, i) => `(${b} \\times 2^{${i}})`).reverse().join(' + ') });
      bits.forEach((bit, i) => {
        if (bit === '1') decimal += Math.pow(2, i);
      });
      return { steps, finalAnswer: `$${decimal}_{10}$` };
    } else if (/^\d+$/.test(input)) {
      let n = parseInt(input);
      const remainders = [];
      while (n > 0) {
        remainders.push(n % 2);
        steps.push({ description: `${n} divided by 2`, expression: `${n} = ${Math.floor(n / 2)} \\text{ r } ${n % 2}` });
        n = Math.floor(n / 2);
      }
      return { steps, finalAnswer: `$${remainders.reverse().join('')}_{2}$` };
    }
    return { steps, finalAnswer: '', error: 'Enter binary (0101) or decimal (10)' };
  }

  /**
   * Solves Quadratic Equations: ax^2 + bx + c = 0
   * Format: 1x^2 - 5x + 6 = 0
   */
  static solveQuadratic(input: string): SolverResult {
    const cleaned = input.toLowerCase().replace(/\s+/g, '');
    const match = cleaned.match(/^([+-]?\d*)x\^2([+-]\d*)x([+-]\d+)=0$/);

    if (!match) return { steps: [], finalAnswer: '', error: 'Format: ax^2 + bx + c = 0' };

    let [, aStr, bStr, cStr] = match;
    const a = aStr === '' || aStr === '+' ? 1 : (aStr === '-' ? -1 : parseInt(aStr));
    const b = bStr === '' || bStr === '+' ? 1 : (bStr === '-' ? -1 : parseInt(bStr));
    const c = parseInt(cStr);

    const steps: SolutionStep[] = [];
    steps.push({ description: 'Identify coefficients a, b, and c', expression: `$a=${a}, b=${b}, c=${c}$` });

    const discriminant = b * b - 4 * a * c;
    steps.push({ 
      description: 'Calculate Discriminant ($D = b^2 - 4ac$)', 
      expression: `$D = (${b})^2 - 4(${a})(${c}) = ${discriminant}$` 
    });

    if (discriminant < 0) {
      return { steps, finalAnswer: '\\text{No Real Roots}', error: 'The equation has complex roots.' };
    }

    const sqrtD = Math.sqrt(discriminant);
    steps.push({ description: 'Apply Quadratic Formula', expression: `$x = \\frac{-b \\pm \\sqrt{D}}{2a}$` });

    const x1 = (-b + sqrtD) / (2 * a);
    const x2 = (-b - sqrtD) / (2 * a);

    steps.push({ 
      description: 'Calculate final roots', 
      expression: `$x = \\frac{${-b} \\pm ${sqrtD.toFixed(2)}}{${2 * a}}$` 
    });

    return { 
      steps, 
      finalAnswer: `$x = ${x1.toFixed(2)} \\text{ or } x = ${x2.toFixed(2)}$` 
    };
  }

  /**
   * Solves Place Value identification
   */
  static solvePlaceValue(input: string): SolverResult {
    const cleaned = input.replace(/\s+/g, '');
    const num = parseInt(cleaned);
    if (isNaN(num)) return { steps: [], finalAnswer: '', error: 'Enter a valid whole number' };

    const steps: SolutionStep[] = [];
    const digits = cleaned.split('').reverse();
    const names = ['Units', 'Tens', 'Hundreds', 'Thousands', 'Ten Thousands', 'Hundred Thousands', 'Millions'];

    steps.push({ description: 'Identify number for place value analysis', expression: `$${num}$` });

    const parts: string[] = [];
    digits.forEach((digit, i) => {
      const placeValue = Math.pow(10, i);
      const value = parseInt(digit) * placeValue;
      const name = names[i] || `10^{${i}}`;
      steps.push({ 
        description: `Digit ${digit} is in the ${name} place`, 
        expression: `$${digit} \\times ${placeValue} = ${value}$` 
      });
      if (value > 0) parts.push(value.toString());
    });

    return { 
      steps, 
      finalAnswer: `\\text{Expanded Form: } ${parts.reverse().join(' + ')}` 
    };
  }

  /**
   * Solves HCF (Highest Common Factor) for a set of numbers
   */
  static solveHCF(input: string): SolverResult {
    const nums = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    if (nums.length < 2) return { steps: [], finalAnswer: '', error: 'Provide at least two numbers separated by commas.' };

    const steps: SolutionStep[] = [];
    steps.push({ description: 'List the numbers provided', expression: `\\{${nums.join(', ')}\\}` });

    let hcf = nums[0];
    for (let i = 1; i < nums.length; i++) {
      const currentHcf = this.gcd(hcf, nums[i]);
      steps.push({ 
        description: `Find HCF of ${hcf} and ${nums[i]}`, 
        expression: `$HCF(${hcf}, ${nums[i]}) = ${currentHcf}$` 
      });
      hcf = currentHcf;
    }

    return { steps, finalAnswer: `$HCF = ${hcf}$` };
  }

  /**
   * Solves LCM (Lowest Common Multiple) for a set of numbers
   */
  static solveLCM(input: string): SolverResult {
    const nums = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    if (nums.length < 2) return { steps: [], finalAnswer: '', error: 'Provide at least two numbers separated by commas.' };

    const steps: SolutionStep[] = [];
    steps.push({ description: 'List the numbers provided', expression: `\\{${nums.join(', ')}\\}` });

    const getLCM = (a: number, b: number) => (Math.abs(a * b) / this.gcd(a, b));

    let lcm = nums[0];
    for (let i = 1; i < nums.length; i++) {
      const currentLcm = getLCM(lcm, nums[i]);
      steps.push({ 
        description: `Find LCM of ${lcm} and ${nums[i]}`, 
        expression: `$LCM(${lcm}, ${nums[i]}) = ${currentLcm}$` 
      });
      lcm = currentLcm;
    }

    return { steps, finalAnswer: `$LCM = ${lcm}$` };
  }
}
