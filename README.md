# CodeWise AI — Mustafa / Frontend Başlangıç Projesi

Bu paket **hocanın ZIP'inin veya arkadaşların GitHub depolarının yerine geçmez**. Mustafa'nın Modül C (arayüz) geliştirmeye başlayabilmesi için bağımsız bir **React + TypeScript demo iskeletidir**.

## Başlatma (Windows, VS Code)
1. Güncel **Node.js LTS** kurulu olmalı. `node --version` ve `npm --version` kontrol et.
2. Bu klasörü VS Code ile aç (`package.json` dosyasının olduğu klasör).
3. VS Code terminalinde aşağıdaki komutları çalıştır:

```powershell
npm install
npm run dev
```

4. Terminalin verdiği yerel adresi tarayıcıda aç (genellikle `http://127.0.0.1:5173/`).
5. Projeyi kontrol etmek için `npm run build` komutunu kullan.

## Ekranlar
- Projeler — örnek proje kartları
- Proje yükle — `.zip` seçimi ve dosya adı/boyut kontrolü; **yükleme yok**
- Risk raporu — Python, Java, JavaScript, C# örnek riskleri ve dil filtresi
- AI asistan — sohbet arayüzü; **gerçek AI yok**
- Analiz geçmişi — gelecekteki API entegrasyonu için boş ekran

Tüm sayısal bilgiler **örnektir**. Dosyalar sunucuya gönderilmez; kod analizi/LLM çalışmaz.

## Dosya haritası
- `src/App.tsx`: sayfalar, menü ve kullanıcı etkileşimi
- `src/styles.css`: görünüm
- `src/types.ts`: örnek arayüz veri türleri / TypeScript arayüzleri
- `src/api/analyzerTypes.ts`: Alihan'ın **gerçek** mevcut statik analiz JSON alanlarının tipleri
- `src/data/mock.ts`: örnek proje ve metot verileri
- `docs/01-GOREVLER.md`: hangi hafta ne yapacaksın
- `docs/02-API-SOZLESMESI-TASLAGI.md`: Zehra ve Alihan'la netleştirilecek veri sözleşmesi
- `docs/03-SRS-BASLANGIC.md`: başlangıç gereksinimleri

## İlk güvenli Git iş akışı
```powershell
git init
git add .
git commit -m "feat(web): initial React demo dashboard"
```

**Not:** Ekibin ortak deposu oluşturulmuşsa `git init` yapma; ilgili depoyu `git clone` ile indirip `web/` içinde ilerle. `node_modules`, `.env`, gerçek kullanıcı ZIP'leri Git'e eklenmez.

## Kritik mimari kural
Web arayüzü **yalnızca Zehra'nın .NET API'siyle** haberleşmeli. Alihan'ın FastAPI adresine doğrudan istek göndermemeli. Gerçek API hazır olunca `src/data/mock.ts` yerine tipli bir `src/api/client.ts` katmanı kullanılmalı.
