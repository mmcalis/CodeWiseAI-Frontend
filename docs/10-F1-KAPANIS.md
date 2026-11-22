# CodeWise AI · F1 kapanış notu

**Muhammet Mustafa Çalış · Modül C (Arayüz, veri ve DevOps) · 22 Kasım 2026**

F1 sonunda giriş ve dosya seçme akışı ekip incelemesine hazır. Kullanıcı demo girişinden sonra bir proje ve dosya seçebiliyor. Arayüz yükleme isteğini tarayıcıda hazırlıyor. Sunucuya gönderim ve gerçek analiz sonucunun gösterimi F2 entegrasyonunda doğrulanacak. İncelenen kişisel dal `feature/f1-tests`, kaynak kod kaydı `4d47d7e`. [İncelenen sürüm](https://github.com/mmcalis/CodeWiseAI-Frontend/tree/4d47d7ed72e5429cfd2294039be2c503728c7332)

## Doğrulanan çalışmalar

| Çalışma | 22 Kasım'daki sonuç |
|---|---|
| T16 · Giriş ve yükleme arayüzü | E-posta ve şifre kontrolleri, demo giriş ve çıkış, proje seçimi ve isteğe bağlı sürüm etiketi çalışıyor. Arayüz ZIP, Python, Java ve C++ dosyalarını seçebiliyor. Boş, desteklenmeyen veya 25 MB sınırını aşan dosyalarda kullanıcıya uyarı gösteriyor. [İstek hazırlama kodu](https://github.com/mmcalis/CodeWiseAI-Frontend/blob/4d47d7ed72e5429cfd2294039be2c503728c7332/src/api/client.ts) |
| T13 · Proje ve analiz kayıtları | Bir projeye birden fazla analiz bağlayan PostgreSQL modeli hazırlandı. EF Core migration'ı, backend projesinin ayrı bir kopyasında PostgreSQL 16.2 ile uygulandı ve geri alındı. Önceden oluşturulan kullanıcı ve sohbet kaydı korundu. Ekip veritabanına uygulama Zehra ile birlikte ele alınacak. [Veri modeli](07-T13-VERI-MODELI.md) · [Migration yaması](08-T13-EF-CORE.patch) |
| T17 · Yerel Docker kurulumu | Mustafa'nın bilgisayarında `docker compose ps` çıktısı hem `web` (nginx) hem `db` (PostgreSQL 16) için `healthy` gösterdi. Arayüzün yerel adresi `http://127.0.0.1:8088/`. Dört servisin ortak başlatma denemesi için .NET API ve FastAPI analiz servisi de Compose'a eklenecek. [Çalıştırma yapılandırması](../docker-compose.yml) |
| Otomatik test ve derleme | GitHub Actions iki test dosyasında 18 testin tamamını geçirdi. Ardından TypeScript ve Vite üretim derlemesi tamamlandı. Kontroller giriş, çıkış, dosya seçimi, boyut sınırı ve demo yükleme isteğini kapsıyor. [Test ve derleme kaydı](https://github.com/mmcalis/CodeWiseAI-Frontend/actions/runs/45000687919/job/137141350739) |

## Ekipçe doğrulanacak işler

1. Mustafa, Zehra ve Alihan ortak depodaki arayüz klasörünü ve hedef dalı belirleyecek. Kişisel daldaki değişiklikler inceleme isteğiyle (Pull Request) sunulabilir.
2. Zehra ve Mustafa, .NET tarafında yükleme adresini, dosya alanını ve başarılı isteğin döndüreceği analiz kimliğini netleştirecek. Arayüzdeki `POST /api/projects/{id}/analyses` yolu şu anda taslak. [API sözleşme taslağı](02-API-SOZLESMESI-TASLAGI.md)
3. Alihan, örnek bir ZIP için analiz sonucunu JSON olarak paylaşacak. Ekip, .NET'in arayüze hangi alanları ileteceğini belirleyecek. Mustafa da rapor tablosunu bu alanlarla test edecek.
4. Ekip `web`, `api`, `analyzer` ve `db` servislerini tek komutla başlatıp kontrol edecek. K1 için gereksinim belgesi (SRS) ve mimari tasarımın danışman onayı ayrıca teyit edilecek.

## F2'de ilk gösterim

Kullanıcı küçük bir ZIP seçer ve yüklemeyi başlatır. .NET API yüklemeyi kabul edip bir analiz kimliği döndürür. React aynı kimlikle durumu izler ve analiz tamamlandığında ilgili raporu açar. İlk ortak denemenin başarı ölçütü, seçilen dosyanın sunucuda oluşan analizle eşleşmesidir.

| Planlanan dönem | Modül C teslimi |
|---|---|
| 23 Kasım–13 Aralık · T24 | Analizin sırada, çalışıyor, tamamlandı veya başarısız durumlarını göstermek. Tamamlanan analizin gerçek sonuçlarını filtrelenebilir rapor tablosuna taşımak. |
| 7–20 Aralık · T25 | Rapor bağlamını sohbet paneline taşımak. Kullanıcının seçtiği metot hakkında asistana soru sorabilmesini sağlamak. |
| 14–20 Aralık · T26 / K2 | Ekipçe bir ZIP üzerinde yükleme, analiz, rapor ve asistana soru adımlarını uçtan uca göstermek. |

Bu tarihler `02_Gantt_Gorev_Tablosu.xlsx` ve `Mustafa_CodeRisk_Baslangic_Plani.xlsx` dosyalarındaki çalışma takviminden alınmıştır.

## 25 Kasım ilerleme raporu için kısa metin

Modül C kapsamında React arayüzünde demo giriş ve dosya seçme akışlarını geliştirdim. Bir projeye ait birden fazla analiz kaydını destekleyen PostgreSQL modelini hazırladım. Arayüz ve veritabanı Docker Compose ile yerelde birlikte çalıştı. GitHub Actions üzerinde 18 otomatik test ve üretim derlemesi başarıyla tamamlandı. Bir sonraki çalışmam, ekiple yükleme ve analiz yanıtlarını netleştirip arayüzde gerçek analiz durumunu ve raporunu göstermek olacak.
