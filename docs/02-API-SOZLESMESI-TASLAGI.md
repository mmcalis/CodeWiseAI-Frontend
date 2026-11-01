# API planı: Bugün gerçekten çalışanlar ve sonra geliştireceklerimiz

## Gerçek mevcut kodda doğrulanan uç noktalar — 30 Ekim 2026

### Alihan'ın CodeRiskAI / Python FastAPI
- `GET /api/health`
- `POST /api/analyze`: `multipart/form-data`, alan adı **files** (bir veya birden fazla dosya/ZIP); JSON çıktı: `files`, `methods`, `summary`.
- `GET /api/model-info`: JM1 modelinin raporu.
- `POST /api/predict`: JM1 modelinin 21 metrikten tahmini. **Yüklenen proje kodunun risk skoru DEĞİLDİR.**

`methods` elemanları şu alanları içerir: `file`, `language`, `method`, `start_line`, `end_line`, `lines`, `cyclomatic_complexity`, `complexity_warning`, `long_method_warning`.

Dikkat: mevcut `POST /api/analyze` **riskScore döndürmüyor**. Karmaşıklık metriği ve uyarılar mevcut. RiskScore tasarımı için Alihan'ın algoritma geliştirmesi gerekiyor. Bu nedenle `src/data/mock.ts` içindeki örnek risk skorları gerçek değil.

KAYNAK: https://github.com/Alihan2929/CodeRiskAI/blob/main/backend/analyzer.py ve `backend/main.py`.

### Zehra'nın Ai_Assistant / ASP.NET Core
- `POST /auth/register` ve `POST /auth/login`
- `POST /chat/sessions` (JWT gerekiyor)
- `POST /chat` (JWT, mesajları **SSE text/event-stream** akışıyla gönderiyor)
- `GET /chat/sessions` ve `GET /chat/sessions/{sessionId}/messages`
- `POST /document/upload` (doküman yükleme; **analiz ZIP endpointi değildir**)

KAYNAK: https://github.com/zehra-demir34/Ai_Assistant/tree/main/src/web.api/Controllers

## Sonra birlikte belirlenecek .NET endpointleri — ÖNERİ, HENÜZ KODDA YOK

**Kural:** React → ASP.NET Core (Zehra) → FastAPI (Alihan). Web doğrudan analiz servisinin sunucu portuna istek atmayacak.

| Önerilen .NET endpointi | Kullanım |
|---|---|
| `GET /api/projects` | Projeleri listele |
| `POST /api/projects` | Proje oluştur |
| `POST /api/projects/{id}/analyses` | ZIP ile analiz başlat |
| `GET /api/analyses/{id}` | queued/running/completed/failed |
| `GET /api/analyses/{id}/report` | Risk / karmaşıklık raporu |
| `GET /api/projects/{id}/analyses` | Geçmiş |

Bunlar yalnızca ekipçe kararlaştırılacak taslak isimlerdir. Zehra'nın mevcut auth/chat endpointleriyle isim çakışmasını engelleyin. Analiz JSON'unda `language`, `scoringMethod` (`static`/`ml`), `modelVersion` alanları açıkça bulunmalı; model kapsamı dil bazında ifade edilmeli.

## Örnek STATİK analiz çıktısı (mevcut alanlar üzerinden)
```json
{
  "files": [{"file":"src/Main.java","language":"java","non_empty_lines":70,"method_count":1,"max_method_complexity":14,"long_method_count":0,"long_file_warning":false,"complex_method_warning":true,"warnings":["Karmaşık metot"]}],
  "methods": [{"file":"src/Main.java","language":"java","method":"run","start_line":5,"end_line":40,"lines":30,"cyclomatic_complexity":14,"complexity_warning":true,"long_method_warning":false}],
  "summary": {"file_count":1,"method_count":1,"long_file_count":0,"complex_file_count":1,"complex_method_count":1,"long_method_count":0,"languages":{"java":1}}
}
```

## Dört net soru
1. **Alihan:** Analizden çıkan `cyclomatic_complexity` ve diğer metrikleri `riskScore` ve risk seviyesine nasıl dönüştüreceğiz? Kural tabanlı ilk skorun matematiği ne? Çoklu dil kıyaslaması nasıl yapılacak?
2. **Zehra:** Mevcut `POST /chat` SSE akışını frontend'de nasıl okuyacağız? Analiz raporu hangi yeni .NET endpointinden gelecek?
3. **Ekip:** Tek ZIP içindeki Java + Python + JavaScript dosyalarını beraber nasıl raporlayacağız?
4. **Danışman:** Çoklu dil statik analizi + öncelikle Python için ML deneyi kapsam güncellemesi onaylanıyor mu?
