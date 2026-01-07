
import { SolverResult, SolutionStep } from '../types';

/**
 * Deterministic Solver Engine
 * Handles specific math patterns based on the Nigerian Syllabus
 */
export class SolverEngine {
  /**
   * Solves linear equations of format: ax + b = c
   */
  static solveLinear(input: string): SolverResult {
    // Basic regex to match patterns like "2x + 4 = 10" or "x - 5 = 2"
    const regex = /^(\d*)x\s*([+-])\s*(\d+)\s*=\s*(\d+)$/;
    const match = input.toLowerCase().replace(/\s+/g, '').match(/^(\d*)x([+-])(\d+)=(\d+)$/);

    if (!match) {
      return {
        steps: [],
        finalAnswer: '',
        error: 'Please use the format: ax + b = c (e.g., 2x + 4 = 10)'
      };
    }

    let [, aStr, op, bStr, cStr] = match;
    const a = aStr === '' ? 1 : parseInt(aStr);
    const b = parseInt(bStr);
    const c = parseInt(cStr);

    const steps: SolutionStep[] = [];
    steps.push({ description: 'Original equation', expression: `${a}x ${op} ${b} = ${c}` });

    // Step 1: Move constant to other side
    const newC = op === '+' ? c - b : c + b;
    const moveDesc = op === '+' ? `Subtract ${b} from both sides` : `Add ${b} to both sides`;
    steps.push({ description: moveDesc, expression: `${a}x = ${newC}` });

    // Step 2: Divide by coefficient
    if (a !== 1) {
      const x = newC / a;
      steps.push({ description: `Divide both sides by ${a}`, expression: `x = ${newC} / ${a}` });
      steps.push({ description: 'Final result', expression: `x = ${x}` });
      return { steps, finalAnswer: `x = ${x}` };
    } else {
      steps.push({ description: 'Final result', expression: `x = ${newC}` });
      return { steps, finalAnswer: `x = ${newC}` };
    }
  }

  /**
   * Solves quadratic equations of format: ax^2 + bx + c = 0
   */
  static solveQuadratic(input: string): SolverResult {
     // Simplified regex for ax^2 + bx + c = 0
     const match = input.toLowerCase().replace(/\s+/g, '').match(/^(\d*)x\^2([+-]\d+)x([+-]\d+)=0$/);
     
     if (!match) {
       return {
         steps: [],
         finalAnswer: '',
         error: 'Please use format: ax^2 + bx + c = 0 (e.g., 1x^2 - 5x + 6 = 0)'
       };
     }

     let [, aStr, bStr, cStr] = match;
     const a = aStr === '' ? 1 : parseInt(aStr);
     const b = parseInt(bStr);
     const c = parseInt(cStr);

     const steps: SolutionStep[] = [];
     const discriminant = b * b - 4 * a * c;

     steps.push({ description: 'Identify coefficients', expression: `a=${a}, b=${b}, c=${c}` });
     steps.push({ description: 'Calculate discriminant (D = b² - 4ac)', expression: `D = (${b})² - 4(${a})(${c}) = ${discriminant}` });

     if (discriminant < 0) {
        return { steps, finalAnswer: 'No real roots', error: 'Discriminant is negative.' };
     }

     const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
     const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);

     steps.push({ description: 'Apply Quadratic Formula', expression: `x = [-(${b}) ± √${discriminant}] / 2(${a})` });
     
     if (x1 === x2) {
        steps.push({ description: 'Final result (Equal roots)', expression: `x = ${x1}` });
        return { steps, finalAnswer: `x = ${x1}` };
     } else {
        steps.push({ description: 'Final results', expression: `x = ${x1} or x = ${x2}` });
        return { steps, finalAnswer: `x = ${x1}, ${x2}` };
     }
  }
}
