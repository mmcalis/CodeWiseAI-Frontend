import { useState } from 'react';
import type { AnalyzerResponse } from './api/analyzerTypes';

export default function AnalizOlcumTablosu({ data }: { data: AnalyzerResponse }) {
  const [dosya, setDosya] = useState('');
  const satirlar = dosya ? data.methods.filter(metot => metot.file === dosya) : data.methods;

  return (
    <section className="panel olcum-paneli" aria-labelledby="olcum-basligi">
      <div className="olcum-ust">
        <div>
          <h2 id="olcum-basligi">Metot ölçümleri</h2>
          <p aria-live="polite">{satirlar.length} / {data.methods.length} metot gösteriliyor.</p>
        </div>
        <label className="filter">
          Dosya filtresi
          <select value={dosya} onChange={event => setDosya(event.target.value)}>
            <option value="">Tüm dosyalar</option>
            {data.files.map(file => <option key={file.file} value={file.file}>{file.file}</option>)}
          </select>
        </label>
      </div>
      {satirlar.length > 0 ? (
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Metot ölçümleri tablosu">
          <table>
            <thead>
              <tr>
                <th scope="col">Dosya</th>
                <th scope="col">Fonksiyon / metot</th>
                <th scope="col">Satırlar</th>
                <th scope="col">Karmaşıklık</th>
                <th scope="col">Uyarı</th>
              </tr>
            </thead>
            <tbody>
              {satirlar.map(metot => (
                <tr key={JSON.stringify([metot.file, metot.start_line, metot.method])}>
                  <td>{metot.file}</td>
                  <td><code>{metot.method}</code></td>
                  <td>{metot.start_line}–{metot.end_line}</td>
                  <td>{metot.cyclomatic_complexity}</td>
                  <td>{[
                    metot.complexity_warning && 'Karmaşık metot',
                    metot.long_method_warning && 'Uzun metot',
                  ].filter(Boolean).join(' · ') || 'Uyarı yok'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <p role="status">Bu seçim için metot bulunamadı.</p>}
    </section>
  );
}
