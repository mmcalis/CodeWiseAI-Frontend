import { useState } from 'react';
import type { AnalyzerResponse } from './api/analyzerTypes';

export default function AnalizOlcumTablosu({ data }: { data: AnalyzerResponse }) {
  const [dosya, setDosya] = useState('');
  const [yalnizUyarili, setYalnizUyarili] = useState(false);
  const satirlar = data.methods.filter(metot => {
    const dosyaEslesiyor = dosya === '' || dosya === metot.file;
    const uyarisiVar = metot.complexity_warning || metot.long_method_warning;
    return dosyaEslesiyor && (!yalnizUyarili || uyarisiVar);
  });

  function filtreleriTemizle() {
    setDosya('');
    setYalnizUyarili(false);
  }

  return (
    <section className="panel olcum-paneli" aria-labelledby="olcum-basligi">
      <div className="olcum-ust">
        <div>
          <h2 id="olcum-basligi">Metot ölçümleri</h2>
          <p aria-live="polite">{satirlar.length} / {data.methods.length} metot gösteriliyor.</p>
        </div>
        <div className="rapor-filtreleri" role="group" aria-label="Metot filtreleri">
          <label className="filter">
            Dosya filtresi
            <select value={dosya} onChange={event => setDosya(event.target.value)}>
              <option value="">Tüm dosyalar</option>
              {data.files.map(file => <option key={file.file} value={file.file}>{file.file}</option>)}
            </select>
          </label>
          <label className="filter">
            <input
              type="checkbox"
              checked={yalnizUyarili}
              onChange={event => setYalnizUyarili(event.target.checked)}
            />
            Yalnızca uyarılı metotlar
          </label>
          <button type="button" className="ghost" disabled={!dosya && !yalnizUyarili} onClick={filtreleriTemizle}>
            Filtreleri temizle
          </button>
        </div>
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
      ) : (
        <p role="status">
          {data.methods.length === 0 ? 'Bu analizde metot kaydı yok.' : 'Seçtiğin filtrelere uyan metot yok.'}
        </p>
      )}
    </section>
  );
}
