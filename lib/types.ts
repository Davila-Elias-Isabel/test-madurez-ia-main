export interface Option {
  id: string;
  text: string;
  score: number;
}

export interface Question {
  id: number;
  dimension: string;
  dimensionIcon: string;
  text: string;
  options: Option[];
}

export interface Answer {
  questionId: number;
  optionId: string;
  score: number;
}

export interface MaturityLevel {
  label: string;
  range: [number, number];
  color: string;
  bgColor: string;
  description: string;
  recommendation: string;
}

export interface TestResult {
  answers: Answer[];
  totalScore: number;
  dimensionScores: Record<string, number>;
  completedAt: string;
}
