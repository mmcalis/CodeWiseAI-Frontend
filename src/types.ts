export type Language = 'Python' | 'Java' | 'JavaScript' | 'C#';
export type RiskLevel = 'Düşük' | 'Orta' | 'Yüksek';
export type Page = 'dashboard' | 'upload' | 'report' | 'assistant' | 'history';
export interface MethodRisk {
  id: string;
  file: string;
  method: string;
  language: Language;
  score: number;
  level: RiskLevel;
  complexity: number;
  reason: string;
}
export interface DemoProject {
  id: string;
  name: string;
  language: Language;
  lastAnalyzed: string;
  methods: number;
  score: number;
}
