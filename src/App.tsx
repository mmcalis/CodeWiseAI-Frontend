import { useRef, useState } from 'react';
import Login from './Login';
import AnalysisStatus from './AnalysisStatus';
import UploadRequestDemo from './UploadRequestDemo';
import type { ChangeEvent } from 'react';
import type { Page, Language, MethodRisk } from './types';
import { methods, projects, riskCounts } from './data/mock';

const pageNames: Record<Page, string> = {
  dashboard: 'Projeler', upload: 'Proje Yükle', report: 'Risk Raporu',
  status: 'Analiz Durumu', assistant: 'AI Asistan', history: 'Analiz Geçmişi',
};
const nav: { id: Page; icon: string; label: string }[] = [
  { id: 'dashboard', icon: '▦', label: 'Projeler' },
  { id: 'upload', icon: '⇧', label: 'Proje yükle' },
  { id: 'status', icon: '◴', label: 'Analiz durumu' },
  { id: 'report', icon: '▥', label: 'Risk raporu' },
  { id: 'assistant', icon: '✳', label: 'AI asistan' },
  { id: 'history', icon: '◷', label: 'Analiz geçmişi' },
];
function riskLevel(score: number) { return score >= 70 ? 'Yüksek' : score >= 40 ? 'Orta' : 'Düşük'; }
function Badge({ score }: { score: number }) {
  const level = riskLevel(score);
  return <span className={`risk-badge ${level === 'Yüksek' ? 'red' : level === 'Orta' ? 'orange' : 'green'}`}>{level} risk</span>;
}
function Stat({ value, label, hint }: { value: string; label: string; hint: string }) {
  return <article className="stat"><p className="stat-label">{label}</p><strong>{value}</strong><span>{hint}</span></article>;
}
function RiskTable({ rows }: { rows: MethodRisk[] }) {
  return <div className="table-scroll"><table><thead><tr><th>Dosya ve metot</th><th>Dil</th><th>Karmaşıklık</th><th>Risk puanı</th><th>Durum</th></tr></thead>
    <tbody>{rows.map(m => <tr key={m.id}><td><strong>{m.method}</strong><small>{m.file}</small></td><td>{m.language}</td><td>{m.complexity}</td><td><strong>{m.score}/100</strong></td><td><Badge score={m.score} /></td></tr>)}</tbody>
  </table></div>;
}
function Dashboard({ go }: { go: (p: Page) => void }) {
  return <>
    <section className="hero"><div><span className="eyebrow">PROJE MERKEZİ</span><h2>Kodunu analiz et,<br/>risklerini keşfet.</h2><p>Farklı programlama dillerindeki projeleri tek bir merkezden izle. Bu sürümdeki tüm sonuçlar örnek veridir.</p><button className="primary" onClick={() => go('upload')}>+ Yeni proje yükle</button></div><div className="hero-graphic"><div className="orbit">&lt;/&gt;</div><span>Analyze · Explain · Improve</span></div></section>
    <div className="stat-grid"><Stat
  value={String(projects.length)}
  label="Örnek proje"
  hint="Demo proje listesi"
/><Stat value="460" label="Örnek metot" hint="Temsili toplam" /><Stat value="2" label="Yüksek riskli örnek" hint="İncelenmesi önerilen" /></div>
    <div className="section-title"><div><h3>Projelerin</h3><p>Örnek proje kartları · gerçek veritabanına bağlı değil</p></div><button className="ghost" onClick={() => go('report')}>Raporları gör →</button></div>
    <div className="projects-grid">{projects.map(p => <article className="project-card" key={p.id}><div className="project-icon">{p.language.slice(0,2)}</div><div><h4>{p.name}</h4><p>{p.language} · {p.methods} metot</p><small>{p.lastAnalyzed}</small></div><div className="project-footer"><Badge score={p.score}/><button className="text-button" onClick={() => go('report')}>İncele →</button></div></article>)}</div>
  </>;
}
const uploadExtensions = ['.zip', '.py', '.java', '.cpp'];
function Upload({ go, onPreviewStatus }: {
  go: (page: Page) => void;
  onPreviewStatus: (fileName: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

  function clearSelection(message = '') {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setFile(null);
    setError(message);
  }

  function select(event: ChangeEvent<HTMLInputElement>) {
    const picked = event.currentTarget.files?.[0];

    if (!picked) {
      clearSelection();
      return;
    }

    const name = picked.name.toLowerCase();

    if (!uploadExtensions.some(ext => name.endsWith(ext))) {
      clearSelection(`Bu dosya türü desteklenmiyor. ${uploadExtensions.join(', ')} uzantılı bir dosya seç.`);
      return;
    }

    if (picked.size === 0) {
      clearSelection('Dosya boş (0 bayt). İçeriği olan bir dosya seç.');
      return;
    }

    if (picked.size > 25 * 1024 * 1024) {
      clearSelection('Dosya 25 MB sınırını aşıyor. Daha küçük bir dosya seç.');
      return;
    }

    setError('');
    setFile(picked);
  }
  return <div className="two-col"><section className="panel"><div className="panel-header"><h3>	ZIP veya kaynak kod dosyası seç</h3><p>Bir ZIP arşivi veya tek bir Python, Java ya da C++ dosyası seçebilirsin.</p></div>
        <label className="dropzone">
      <span className="upload-symbol">⇧</span>
      <strong>Dosya seçmek için tıkla</strong>
      <span>{uploadExtensions.join(', ')} · demo sınırı 25 MB</span>

      <input
        ref={fileInputRef}
        type="file"
        aria-label="ZIP veya kaynak kod dosyası seç"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'upload-error' : undefined}
        accept={[...uploadExtensions, 'application/zip'].join(',')}
        onChange={select}
      />
    </label>

    {file && (
      <div className="file-selected">
        <strong>Seçilen dosya</strong>
        <span>{file.name} · {file.size.toLocaleString('tr-TR')} bayt</span>
        <button type="button" className="text-button" onClick={() => clearSelection()}>
          Seçimi kaldır
        </button>
      </div>
    )}

    {error && <p id="upload-error" className="error" role="alert">{error}</p>}
    {file && <UploadRequestDemo file={file} onPreviewStatus={() => onPreviewStatus(file.name)} />}
    <div className="notice"><strong>Henüz gerçek yükleme yapılmıyor.</strong><p>Dosya yalnızca bu tarayıcı sekmesinde seçiliyor. Sunucuya gönderilmiyor; dosya içeriği okunmuyor. Gerçek API bağlantısını sonraki aşamada ekleyeceğiz.</p></div>
    <button className="primary" disabled={!file} onClick={() => go('report')}>Örnek raporu görüntüle →</button>
    <p className="fineprint">Bu düğme seçtiğin dosyayı analiz etmez; sadece demo raporu açar.</p>
  </section><aside className="panel"><h3>Gerçek sürümün iş akışı</h3><ol className="steps"><li><strong>ZIP yükle</strong><span>.NET API dosyayı kabul eder, güvenliğini kontrol eder.</span></li><li><strong>Analizi başlat</strong><span>API, Alihan'ın FastAPI analiz servisini çağırır.</span></li><li><strong>Sonuçları göster</strong><span>Dosyalar ve metotlar risk skorlarıyla listelenir.</span></li><li><strong>Asistana sor</strong><span>Zehra'nın .NET asistanı gerçek analiz çıktısını kullanır.</span></li></ol></aside></div>;
}
function Report({ go }: { go: (p: Page) => void }) {
  const [filter, setFilter] = useState<'Tümü' | Language>('Tümü');
  const rows = filter === 'Tümü' ? methods : methods.filter(m => m.language === filter);
  return <><div className="notice slim"><strong>DEMO RAPORU</strong> — Bu metrikler temsili veridir, gerçek kod analizi yapılmamıştır.</div>
    <div className="stat-grid"><Stat value="5" label="Örnek metot" hint="4 programlama dili"/><Stat value="2" label="Yüksek risk" hint="Örnek analiz"/><Stat value="89/100" label="En yüksek risk" hint="processPayment()"/></div>
    <div className="two-col report-summary"><section className="panel"><h3>Risk dağılımı</h3><div className="bars">{riskCounts.map(r => <div className="bar-item" key={r.label}><div><span>{r.label}</span><strong>{r.value}</strong></div><div className="bar-bg"><div className={`bar-fill ${r.className}`} style={{ width: `${r.value / 5 * 100}%` }}/></div></div>)}</div></section><section className="panel"><h3>Örnek bulgu</h3><p className="method-label">src/PaymentService.java</p><h4>processPayment()</h4><p>Yüksek döngüsel karmaşıklık ve çok sayıda karar dalı nedeniyle inceleme öneriliyor.</p><button className="ghost" onClick={() => go('assistant')}>Asistana sor →</button></section></div>
    <div className="section-title"><div><h3>Metot riskleri</h3><p>Dile göre filtrele ve örnek verileri incele.</p></div><label className="filter">Dil <select value={filter} onChange={e => setFilter(e.target.value as 'Tümü' | Language)}><option>Tümü</option><option>Python</option><option>Java</option><option>JavaScript</option><option>C#</option></select></label></div>
    <section className="panel no-padding"><RiskTable rows={rows}/></section>
  </>;
}
function Assistant() {
  const [messages,setMessages] = useState<{ role:'assistant'|'user'; text:string }[]>([{role:'assistant',text:'Merhaba! Bu ekran bir sohbet taslağıdır. Gerçek yapay zekâya ve analiz sonuçlarına henüz bağlı değil.'}]);
  const [input,setInput] = useState('');
  function send() { const message=input.trim(); if (!message) return; setMessages(old=>[...old,{role:'user',text:message},{role:'assistant',text:'Demo modu: Gerçek analiz verisini yorumlamak için Zehra’nın API bağlantısı gereklidir. Şu an yanıt üretmiyorum.'}]); setInput(''); }
  return <section className="panel chat-panel"><div className="panel-header"><h3>Kod Risk Asistanı</h3><p>Bu sürüm sohbet ekranını gösterir; gerçek LLM çağrısı yapılmaz.</p></div><div className="chat-messages">{messages.map((m,i)=><div className={`bubble ${m.role}`} key={i}>{m.text}</div>)}</div><form className="chat-form" onSubmit={e=>{e.preventDefault();send();}}><input aria-label="Asistana mesaj" value={input} onChange={e=>setInput(e.target.value)} placeholder="Örn. En riskli metot hangisi?"/><button className="primary" type="submit">Gönder →</button></form><p className="fineprint">Demo modu: bu ekranda mesajlar başka bir sunucuya iletilmez.</p></section>;
}
function History() { return <section className="panel history-panel"><div className="empty-symbol">◷</div><h3>Analiz geçmişi</h3><p>Gerçek analiz geçmişini Zehra'nın .NET API'si PostgreSQL'den döndürecek. Bu ekranda henüz kayıt yok.</p><div className="notice slim"><strong>Gelecek sürüm:</strong> Analiz tarihi, proje sürümü, risk farkı ve iki sürümün karşılaştırılması.</div></section>; }
export default function App() {
 const [page,setPage] = useState<Page>('dashboard');
 const [demoLoggedIn, setDemoLoggedIn] = useState(false);
 const [previewFile, setPreviewFile] = useState<string | null>(null);

 function previewAnalysis(fileName: string) {
   setPreviewFile(fileName);
   setPage('status');
 }

 if (!demoLoggedIn) {
   return <Login onDemoLogin={() => setDemoLoggedIn(true)} />;
 }
 return <div className="app-shell"><aside className="sidebar"><div className="brand"><div className="brand-icon">&lt;/&gt;</div><div><strong>CodeWise <em>AI</em></strong><span>Risk & Development Advisor</span></div></div><div className="sidebar-caption">ÇALIŞMA ALANI</div><nav aria-label="Ana menü">{nav.map(item=><button key={item.id} className={`nav-link ${item.id===page?'active':''}`} onClick={() => {
   setPreviewFile(null);
   setPage(item.id);
 }}><span className="nav-icon" aria-hidden="true">{item.icon}</span>{item.label}</button>)}</nav>
<div className="sidebar-bottom">
  <span className="demo-dot" /> DEMO MODU
  <small>Mustafa · Frontend v0.1</small>

  <button
    type="button"
    className="text-button"
    style={{ marginTop: 16, color: '#ffffff' }}
    onClick={() => {
      setDemoLoggedIn(false);
      setPreviewFile(null);
      setPage('dashboard');
    }}
  >
    Çıkış Yap (Demo)
  </button>
</div>
</aside>
 <main className="content"><header className="topbar"><div><span className="eyebrow">CODEWISE AI / PLATFORM</span><h1>{pageNames[page]}</h1></div><div className="top-status"><span className="demo-dot"/> Örnek verilerle çalışıyor</div></header>
 <div className="page-body">
   {page === 'dashboard' && <Dashboard go={setPage} />}
   {page === 'upload' && <Upload go={setPage} onPreviewStatus={previewAnalysis} />}
   {page === 'status' && (
     <AnalysisStatus fileName={previewFile} onReport={() => setPage('report')} onUpload={() => setPage('upload')} />
   )}
   {page === 'report' && <Report go={setPage} />}
   {page === 'assistant' && <Assistant />}
   {page === 'history' && <History />}
 </div><footer>Bitirme Projesi · Modül C — Frontend prototipi · Veri kaynağı: mock</footer></main></div>;
}
