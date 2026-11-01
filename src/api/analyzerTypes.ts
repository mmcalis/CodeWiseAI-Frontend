/**
 * Alihan'ın CodeRiskAI backend/analyzer.py dosyasından doğrulanmış
 * MEVCUT /api/analyze JSON biçimi. Şu an .NET üzerinden kullanılmıyor.
 * ÖNEMLİ: Henüz riskScore veya ML olasılığı döndürmüyor.
 */
export interface AnalyzerMethod {
  file: string;
  language: string; // örnek: "java", "py", "js", "cs"
  method: string;
  start_line: number;
  end_line: number;
  lines: number;
  cyclomatic_complexity: number;
  complexity_warning: boolean;
  long_method_warning: boolean;
}
export interface AnalyzerFile {
  file: string;
  language: string;
  non_empty_lines: number;
  method_count: number;
  max_method_complexity: number;
  long_method_count: number;
  long_file_warning: boolean;
  complex_method_warning: boolean;
  warnings: string[];
  error?: string;
}
export interface AnalyzerResponse {
  files: AnalyzerFile[];
  methods: AnalyzerMethod[];
  summary: {
    file_count: number;
    method_count: number;
    long_file_count: number;
    complex_file_count: number;
    complex_method_count: number;
    long_method_count: number;
    languages: Record<string, number>;
  };
}
