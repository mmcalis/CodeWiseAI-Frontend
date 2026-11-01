# Mustafa — Modül C için ölçülebilir görevler

## Hafta 1: 26 Ekim – 1 Kasım 2026
- [ ] Üç kişi aynı kapsamı kabul ediyor: **çoklu dil statik analiz**; ML iddiaları dil/veri kümesi bazında ayrı doğrulanacak.
- [ ] Ortak GitHub repo ve dal adlandırma kuralları (T08). Öneri: `main`, `feature/web-*`, `feature/api-*`, `feature/analyzer-*`.
- [ ] İki mevcut depoyu silmeden veya taşımadan ilk prototip denetimi yapılacak.
- [ ] Bu arayüz demo iskeleti yerelde çalıştırılacak (`npm run dev`).
- [ ] İlk commit ve README hazırlanacak.

## Hafta 2: 2–8 Kasım 2026
- [ ] SRS / kullanım senaryoları (T07). Gerçek ve mock özellikler ayrıştırılsın.
- [ ] Wireframe (T09): projeler, yükleme, durum, rapor, sohbet, tarihçe.
- [ ] Örnek analiz JSON'u Alihan'dan alınsın.
- [ ] OpenAPI taslak endpointleri Zehra ile görüşülsün; web yalnızca .NET ile konuşsun.

## Hafta 3–4: 9–22 Kasım 2026
- [ ] React projesini ekip reposuna ekle (T16).
- [ ] Sayfaları farklı bileşenlere ayır: `pages/`, `components/`, `api/`.
- [ ] Gerçek login ve yükleme endpointlerine güvenli HTTP bağlama; yükleme durumlarını göster.
- [ ] Docker Compose kurulumu için Zehra ve Alihan'la destekleş (T17).
- [ ] T13 veritabanı şemasında Zehra ile ortak çalış; frontend DB'ye doğrudan bağlanmaz.

## Hafta 5–8: 23 Kasım – 20 Aralık 2026
- [ ] Analiz durumu: queued/running/completed/failed (T24).
- [ ] Analiz raporu gerçek JSON'dan üretilecek; dil filtresi, risk sıralaması (T24).
- [ ] Sohbet paneli gerçek .NET sohbet API'sine bağlanacak (T25).
- [ ] Kullanıcı ZIP yükler → analiz tamamlanır → rapor görür → asistana soru sorar: uçtan uca MVP (T26).

## Hafta 9–11: 21 Aralık – 10 Ocak 2027
- [ ] Hata ve yükleme güvenlik mesajları (T29). Gerçek güvenlik backend'de uygulanmalı.
- [ ] Frontend için basit otomatik testler, klavye erişilebilirliği, en az 1 gerçek demo.
- [ ] Kurulum, API istemcisi, çevresel değişken örneği, ekran görüntüsü dokümante edildi.
- [ ] Zehra ve Alihan kendi bilgisayarlarında frontend'i bağımsız çalıştırabiliyor.
- [ ] Bitirme I raporuna katkı ve dönem sonu demo (T30/T31).

## Teslim testi / Definition of Done
1. `npm run build` hata vermiyor.
2. Arayüz bütün sayfalara erişebiliyor, küçük ekranlarda da kullanılabiliyor.
3. Gerçek API var olduğunda sunucu bağlantısı durumları doğru görünüyor.
4. Mock veri ile gerçek API verisi karışmıyor.
5. API hatası, boş rapor, bekleyen analiz, başarısız analiz için ekran var.
6. Gizli anahtarlar frontend içine yazılmıyor.
7. Başka geliştirici README ile sıfırdan kurulum yapabiliyor.
