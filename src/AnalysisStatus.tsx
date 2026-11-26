import { useState } from 'react';
import './analysis-status.css';

const scenarios = [
  { id: 'queued', label: 'Sırada', message: 'Analiz, önceki işlerin bitmesini bekliyor.' },
  { id: 'running', label: 'Analiz ediliyor', message: 'Dosyalar inceleniyor. İşlem tamamlandığında raporu açabilirsin.' },
  { id: 'completed', label: 'Tamamlandı', message: 'Dosya ve metot sonuçlarını raporda inceleyebilirsin.' },
  { id: 'failed', label: 'Başarısız', message: 'Analiz tamamlanamadı. Yükleme ekranına dönüp dosya seçimini gözden geçirebilirsin.' },
] as const;

type Props = {
  fileName: string | null;
  onReport: () => void;
  onUpload: () => void;
};

export default function AnalysisStatus({ fileName, onReport, onUpload }: Props) {
  const [scenario, setScenario] = useState<(typeof scenarios)[number]>(scenarios[0]);

  return (
    <section className="panel analysis-preview" aria-label="Analiz durumu önizlemesi">
      <h2>Tasarım önizlemesi</h2>
      <p>Aşağıdan bir durum seçerek ekranda nasıl görüneceğini deneyebilirsin.</p>
      {fileName && <p className="analysis-filename">Önizleme dosyası <strong>{fileName}</strong></p>}

      <div className="analysis-choices" role="group" aria-label="Gösterilecek durum">
        {scenarios.map(item => (
          <button key={item.id} type="button" className="ghost"
            aria-pressed={scenario.id === item.id} onClick={() => setScenario(item)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="analysis-state" data-state={scenario.id} role="status">
        <h3>{scenario.label}</h3>
        <p>{scenario.message}</p>
      </div>
      {scenario.id === 'completed' && (
        <button type="button" className="primary" onClick={onReport}>Örnek raporu aç</button>
      )}
      {scenario.id === 'failed' && (
        <button type="button" className="ghost" onClick={onUpload}>Dosya seçimine dön</button>
      )}
    </section>
  );
}
