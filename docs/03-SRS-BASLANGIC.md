# CodeWise AI — Yazılım Gereksinimleri Belgesi (SRS)

**Proje:** Yapay Zekâ Destekli Kod Analizi ve Danışmanlık Platformu  
**Görev:** T07 — SRS ve Kullanım Senaryoları  
**Hazırlayan:** Muhammet Mustafa Çalış — 3. Geliştirici, Modül C  
**Durum:** Taslak v0.1 — Ekip ve danışman değerlendirmesi bekleniyor  
**Tarih:** 1 Kasım 2026

## 1. Projenin Amacı

CodeWise AI, yazılım geliştiricilerin kaynak kodlarını incelemelerine, olası kod risklerini değerlendirmelerine ve yapay zekâ destekli iyileştirme önerileri almalarına yardımcı olmak amacıyla tasarlanan bir web platformudur.

Proje, CodeRiskAI'nin kod analizi altyapısını ve Ai_Assistant'ın yapay zekâ destekli etkileşim altyapısını bütünleştirecektir.

Sistem, desteklenen programlama dillerindeki kaynak kodları statik olarak analiz etmeyi, dosya ve metot düzeyinde çeşitli metrikleri göstermeyi, riskli kod bölümlerini önceliklendirmeyi ve analiz sonuçlarına dayalı sohbet imkânı sunmayı hedeflemektedir.

## 2. Projenin Kapsamı

Planlanan temel işlevler:

- Kullanıcı kaydı ve oturum yönetimi.
- Yazılım projelerinin veya kaynak kod dosyalarının yüklenmesi.
- Desteklenen programlama dillerinde statik kod analizi.
- Dosya ve metot düzeyinde analiz sonuçlarının görüntülenmesi.
- Riskli metotların belirlenmesi ve filtrelenmesi.
- Yapay zekâ asistanıyla analiz sonuçları hakkında sohbet.
- Kod iyileştirme ve test önerileri.
- Analiz geçmişinin saklanması.
- İleriki aşamada iki sürümün karşılaştırılması.

**Kapsam kararı:** Mevcut CodeRiskAI sisteminin çoklu dil statik analiz desteği korunmak istenmektedir. Ancak orijinal proje planındaki makine öğrenmesi araştırmaları Python odaklıdır. Çoklu dil desteğinin kapsamı ekip ve danışmanla kesinleştirilecektir.

## 3. Kullanıcı Rolleri

**Kullanıcı:** Sisteme kayıt olur, oturum açar, projesini yükler, analiz başlatır, raporları inceler ve yapay zekâ asistanına sorular sorar.

**Sistem:** Kullanıcının isteklerini işler, analiz servisini çağırır, sonuçları kaydeder ve görüntülenmek üzere arayüze sunar.

## 4. Fonksiyonel Gereksinimler (FR)

**FR-01 — Kullanıcı Kaydı:** Kullanıcı hesap oluşturabilmelidir.

**FR-02 — Oturum Açma:** Kullanıcı kendi hesabıyla giriş yapabilmeli ve oturumunu yönetebilmelidir.

**FR-03 — Proje Yönetimi:** Kullanıcı yeni bir proje kaydı oluşturabilmeli ve mevcut projelerini görüntüleyebilmelidir.

**FR-04 — Dosya Yükleme:** Kullanıcı ZIP arşivi veya desteklenen kaynak kod dosyalarını seçerek analiz amacıyla sisteme gönderebilmelidir. Birden fazla kaynak dosyası seçimi desteklenmesi hedeflenen bir özelliktir.

**FR-05 — Analiz Başlatma:** Kullanıcı yüklediği kaynak kod için analiz başlatabilmelidir.

**FR-06 — Analiz Durumu:** Kullanıcı analiz işleminin bekliyor, çalışıyor, tamamlandı veya başarısız durumlarını görüntüleyebilmelidir.

**FR-07 — Risk Raporu:** Kullanıcı dosya ve metot düzeyindeki analiz sonuçlarını tablo veya grafiklerle görüntüleyebilmelidir. Risk skoru yalnızca ilgili analiz yöntemi tarafından üretildiğinde gösterilmelidir.

**FR-08 — Filtreleme:** Kullanıcı rapor sonuçlarını programlama dili, dosya veya risk ölçütlerine göre filtreleyebilmelidir.

**FR-09 — Yapay Zekâ Sohbeti:** Kullanıcı analiz edilmiş bir proje veya metot hakkında asistana soru sorabilmelidir.

**FR-10 — İyileştirme Önerisi:** Asistan, mevcut analiz bulgularına dayanarak olası refactoring ve test önerileri sunabilmelidir.

**FR-11 — Analiz Geçmişi:** Kullanıcı daha önce gerçekleştirdiği analizlere erişebilmelidir.

**FR-12 — Sürüm Karşılaştırması:** Daha sonraki geliştirme aşamalarında kullanıcı iki analiz sonucunu karşılaştırarak değişen metrikleri görebilmelidir.

## 5. Fonksiyonel Olmayan Gereksinimler (NFR)

**NFR-01 — Güvenlik:** Kullanıcıların yüklediği kaynak kodlar analiz sırasında doğrudan çalıştırılmamalıdır.

**NFR-02 — Dosya Kontrolleri:** Dosya boyutu, türü, sayısı ve arşiv güvenliği backend tarafında denetlenmelidir.

**NFR-03 — Gizlilik:** Kullanıcının kodları ve oturum verileri yetkisiz erişimlere karşı korunmalıdır. Harici bir yapay zekâ sağlayıcısına veri gönderilecekse kullanıcı açıkça bilgilendirilmelidir.

**NFR-04 — Kullanılabilirlik:** Arayüz anlaşılır, tutarlı ve farklı ekran boyutlarında kullanılabilir olmalıdır.

**NFR-05 — Hata Yönetimi:** Dosya yükleme, analiz ve API işlemlerindeki hatalar kullanıcıya anlaşılır mesajlarla gösterilmelidir.

**NFR-06 — Bakım Kolaylığı:** React arayüzü, .NET API ve Python analiz servisi birbirinden ayrılmış modüller olarak geliştirilebilmelidir.

**NFR-07 — Analiz Şeffaflığı:** Sonuçların hangi analiz yöntemiyle üretildiği ve desteklenen özellikler kullanıcıya açıklanmalıdır.

**NFR-08 — İzlenebilirlik:** Gereksinimler, testler ve GitHub görevleri birbirleriyle ilişkilendirilebilmelidir.

## 6. Kullanım Senaryoları (UC)

### UC-01 — Kullanıcı Girişi

**Aktör:** Kullanıcı  
**Ön koşul:** Kullanıcı hesabı oluşturulmuştur.

**Normal akış:**

1. Kullanıcı giriş sayfasını açar.
2. E-posta ve parolasını girer.
3. Sisteme giriş isteği gönderilir.
4. Bilgiler doğrulanır.
5. Kullanıcı proje sayfasına yönlendirilir.

**Alternatif akış:** Bilgiler hatalıysa kullanıcıya hata mesajı gösterilir.

**Beklenen sonuç:** Yetkili kullanıcı kendi projelerine erişebilir.

### UC-02 — Kaynak Kod Yükleme ve Analiz

**Aktör:** Kullanıcı  
**Ön koşul:** Kullanıcı giriş yapmıştır.

**Normal akış:**

1. Kullanıcı proje veya yükleme ekranını açar.
2. ZIP arşivi veya desteklenen kaynak kod dosyalarını seçer.
3. Sistem, dosya türü ve boyutu gibi ön kontrolleri gerçekleştirir.
4. Kullanıcı analiz başlatma işlemini onaylar.
5. Backend, dosyaları güvenli şekilde analiz servisine iletir.
6. Analiz sonuçları alınır.
7. Kullanıcı sonuç ekranına yönlendirilir.

**Alternatif akış:** Geçersiz veya desteklenmeyen dosyalar için hata gösterilir. Analiz başarısız olursa kullanıcı bilgilendirilir.

**Beklenen sonuç:** Desteklenen bir dosya için analiz işlemi tamamlanır ve sonuçlar görüntülenebilir.

### UC-03 — Risk Raporunu İnceleme

**Aktör:** Kullanıcı  
**Ön koşul:** Tamamlanmış bir analiz bulunmalıdır.

**Normal akış:**

1. Kullanıcı analiz raporunu açar.
2. Sistem dosya ve metot metriklerini listeler.
3. Kullanıcı bir programlama dili veya dosya filtresi seçer.
4. Liste seçilen filtrelere göre güncellenir.
5. Kullanıcı bir metodu seçerek ayrıntılarını görüntüler.

**Beklenen sonuç:** Kullanıcı riskli veya karmaşık metotları belirleyebilir ve analiz bulgularını inceleyebilir.

### UC-04 — Yapay Zekâ Asistanına Soru Sorma

**Aktör:** Kullanıcı  
**Ön koşul:** Kullanıcı sisteme giriş yapmıştır; analize ilişkin sorularda ilgili analiz verileri erişilebilir olmalıdır.

**Normal akış:**

1. Kullanıcı sohbet panelini açar.
2. Bir metot veya analiz hakkında soru sorar.
3. Asistan gerekli analiz bilgilerini araçlar üzerinden alır.
4. Asistan sonuçları yorumlayarak cevap oluşturur.
5. Kullanıcı açıklama, refactoring veya test önerilerini görüntüler.

**Alternatif akış:** Yeterli analiz verisi yoksa asistan bu eksikliği belirtir.

**Beklenen sonuç:** Kullanıcı, analiz bulgularına dayalı açıklama ve öneriler alır.

### UC-05 — Analiz Geçmişini Görüntüleme

**Aktör:** Kullanıcı  
**Ön koşul:** Kullanıcının daha önce kaydedilmiş analizleri olmalıdır.

**Normal akış:**

1. Kullanıcı analiz geçmişi sayfasını açar.
2. Sistemin sakladığı analizler listelenir.
3. Kullanıcı önceki analizlerden birini seçer.
4. İlgili rapor görüntülenir.

**Beklenen sonuç:** Kullanıcı önceki analiz kayıtlarına erişebilir.

## 7. Teknik Mimari

Planlanan teknoloji ve sorumluluklar:

- **React + TypeScript:** Kullanıcı arayüzü, dosya seçimi, raporlar, grafikler ve sohbet ekranı.
- **ASP.NET Core Web API:** Kimlik doğrulama, proje ve analiz yönetimi, asistan ile servislerin koordinasyonu.
- **Python + FastAPI:** Kaynak kodların statik analizi ve risk değerlendirmesi.
- **PostgreSQL:** Kullanıcı, proje, analiz ve sohbet kayıtlarının saklanması.
- **LLM entegrasyonu:** Analiz sonuçlarına dayalı açıklamalar ve öneriler.
- **Docker Compose:** Servislerin birlikte çalıştırılması.
- **GitHub Actions:** Otomatik derleme ve test kontrolleri.

Arayüzün ana iletişim noktası .NET API olacaktır. Python analiz servisiyle iletişim backend üzerinden gerçekleştirilecektir.

## 8. İlk Dönem ve İleri Aşamalar

**İlk dönem hedefi:** Proje yükleme, analiz, raporlama ve yapay zekâya soru sorma işlemlerinin uçtan uca çalışan bir prototipini hazırlamak.

**İkinci dönem hedefi:** Risk modeli, açıklanabilirlik, sürüm karşılaştırması, önerilerin yeniden değerlendirilmesi, kapsamlı testler ve akademik deneylerle sistemi geliştirmek.

## 9. İlk Dönemde Kapsam Dışı İşlevler

- IDE eklentisi geliştirme.
- Tam otomatik kod değiştirme.
- GitHub pull request botu.
- Her programlama dili için doğrulanmış makine öğrenmesi hata tahmini.
- Kullanıcı kodlarının doğrudan çalıştırılması.

## 10. Onay Bekleyen Konular

1. Çoklu dil desteğinin kesin kapsamı.
2. İlk sürümde desteklenecek yükleme yöntemleri ve dosya türleri.
3. Analiz servisinin nihai JSON veri sözleşmesi.
4. Risk puanlama ve risk seviyesi gösterimi.
5. API endpoint isimleri ve istek/yanıt biçimleri.
6. İkinci dönem iki kişilik ekip için görev dağılımının güncellenmesi.

## 11. Kabul Kriterleri
FR-04 Dosya yükleme	Desteklenen dosya seçildiğinde listelenmeli; desteklenmeyen türde uyarı gösterilmeli
FR-06 Analiz durumu	Bekleme, çalışma, başarı ve hata durumlarının her biri arayüzde gösterilebilmeli
FR-08 Filtreleme	Dil filtresi değiştirildiğinde yalnızca ilgili sonuçlar gösterilmeli

**Not:** Bu belge, geliştirici tarafından hazırlanan ilk gereksinim taslağıdır. Nihai hâli ekip ve danışman değerlendirmesiyle kesinleştirilecektir.