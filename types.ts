
export enum EducationLevel {
  JSS1 = 'JSS 1',
  JSS2 = 'JSS 2',
  JSS3 = 'JSS 3',
  SS1 = 'SS 1',
  SS2 = 'SS 2',
  SS3 = 'SS 3'
}

export interface Formula {
  name: string;
  latex: string;
  variables: string[];
}

export interface Example {
  question: string;
  steps: string[];
  answer: string;
}

export interface PracticeQuestion {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  answer: string;
  solution: string[];
}

export interface SubTopic {
  id: string;
  title: string;
  description: string;
  formulas: Formula[];
  examples: Example[];
  practice: PracticeQuestion[];
  canSolve: boolean;
}

export interface Topic {
  id: string;
  title: string;
  subTopics: SubTopic[];
}

export interface Syllabus {
  level: EducationLevel;
  topics: Topic[];
}

export interface SolutionStep {
  description: string;
  expression: string;
}

export interface SolverResult {
  steps: SolutionStep[];
  finalAnswer: string;
  error?: string;
}
