# CodeWise AI — Ekran Taslakları (Wireframe)

**Görev:** T09

**Hazırlayan:** Muhammet Mustafa Çalış

**Tarih:** 01.11.2026

**Durum:** İlk taslak — ekip değerlendirmesi bekleniyor

## Amaç

Bu belge, CodeWise AI platformunun temel ekranlarını, kullanıcı akışlarını ve beklenen etkileşimlerini tanımlar.

## Tasarım Kapsamı

Proje planında yedi temel ekran esas alınmıştır.

AI Asistan ve analiz geçmişi bu ekranlarla ilişkilendirilmiştir.

Hazırlanan ekranlar ilk taslak niteliğindedir.

Nihai görsel tasarım ve uygulama sonraki geliştirme aşamalarında gerçekleştirilecektir.

## 1. Giriş ve Kayıt Ekranı

```text
+--------------------------------------+
|             CodeWise AI              |
|                                      |
|          Kullanıcı Girişi            |
|                                      |
|  E-posta                             |
|  [____________________________]      |
|                                      |
|  Şifre                               |
|  [____________________________]      |
|                                      |
|          [ GİRİŞ YAP ]               |
|                                      |
|       Hesabın yok mu? Kayıt Ol       |
+--------------------------------------+
```

**Amaç:** Kullanıcının sisteme giriş yapması.

**Kullanıcı işlemi:** E-posta ve şifre girer, giriş butonuna basar.

**Sonraki ekran:** Başarılı girişte Projeler ekranı açılır.

**Hata durumu:** Eksik veya yanlış bilgiler için uyarı gösterilir.

---

## 2. Projeler Ekranı

```text
+------------------------------------------------+
| CodeWise AI                [Kullanıcı Profili]  |
+------------+-----------------------------------+
| MENÜ       | PROJELERİM                        |
|            |                                   |
| Projeler   | [ + YENİ PROJE YÜKLE ]           |
| Yükleme    |                                   |
| Raporlar   | [Proje] [Analiz] [Son Analiz]     |
| Asistan    |                                   |
| Geçmiş     | SON PROJELER                      |
|            | +-----------------------------+   |
|            | | Proje A        [İNCELE]      |   |
|            | +-----------------------------+   |
|            | | Proje B        [İNCELE]      |   |
|            | +-----------------------------+   |
+------------+-----------------------------------+
```

**Amaç:** Kullanıcının projelerini görüntülemesi.

**Kullanıcı işlemi:** Proje seçer veya yeni yükleme başlatır.

**Sonraki ekran:** Yükleme ya da proje raporu.

**Boş durum:** Henüz proje yoksa yeni proje oluşturma önerilir.

---

## 3. Proje Yükleme Ekranı

```text
+----------------------------------------------+
|             YENİ ANALİZ                      |
|                                              |
|  Proje adı:   [____________________]         |
|  Sürüm:       [ v1.0 _____________]         |
|                                              |
|  +----------------------------------------+  |
|  |                                        |  |
|  |        ZIP DOSYASI SEÇ                |  |
|  |                                        |  |
|  +----------------------------------------+  |
|                                              |
|  Seçilen dosya: proje.zip                    |
|  Dosya boyutu: ...                           |
|                                              |
|          [ ANALİZİ BAŞLAT ]                  |
+----------------------------------------------+
```

**Amaç:** Kaynak kod projesini sisteme yüklemek.

**Kullanıcı işlemi:** Projeyi ve sürümü belirler, dosya seçer.

**Sonraki ekran:** Analiz Durumu.

**Hata durumu:** Geçersiz dosya türü veya boyutu için uyarı gösterilir.

**Not:** Mevcut demo gerçek yükleme veya analiz gerçekleştirmiyor.

---

## 4. Analiz Durumu Ekranı

```text
+----------------------------------------------+
|              ANALİZ DURUMU                   |
|                                              |
|  Proje: proje.zip                            |
|  Sürüm: v1.0                                 |
|                                              |
|  Durum: ANALİZ EDİLİYOR                     |
|                                              |
|  [ İşlem devam ediyor... ]                   |
|                                              |
|  Bekliyor                                    |
|  Çalışıyor                                   |
|  Tamamlandı                                  |
|  Başarısız                                   |
|                                              |
|  [ RAPORU GÖR ]  (Analiz bitince)            |
+----------------------------------------------+
```

**Amaç:** Kullanıcıya analiz işleminin durumunu göstermek.

**Kullanıcı işlemi:** Analiz tamamlanana kadar durumu takip eder.

**Sonraki ekran:** Analiz tamamlandığında Risk Raporu.

**Hata durumu:** Analiz başarısızsa hata açıklaması gösterilir.

**Not:** Backend ilerleme yüzdesi göndermiyorsa sahte yüzde gösterilmez.

---

## 5. Risk Raporu Ekranı

```text
+------------------------------------------------+
|                  RİSK RAPORU                   |
|                                                |
| [Toplam Metot] [Riskli Metot] [Dosya Sayısı]   |
|                                                |
| +--------------------------------------------+ |
| |           RİSK DAĞILIM GRAFİĞİ            | |
| +--------------------------------------------+ |
|                                                |
| Dil filtresi: [ TÜMÜ v ]                       |
|                                                |
| +--------------------------------------------+ |
| | METOT       | KARMAŞIKLIK | RİSK           | |
| |-------------|-------------|----------------| |
| | Metot A     | ...         | ...            | |
| | Metot B     | ...         | ...            | |
| +--------------------------------------------+ |
|                                                |
| [ METOT DETAYINI AÇ ]  [ AI ASİSTANA SOR ]    |
+------------------------------------------------+
```

**Amaç:** Kod analiz sonuçlarını sunmak.

**Kullanıcı işlemi:** Filtre kullanır, riskleri inceler ve metot seçer.

**Sonraki ekran:** Metot Detayı veya AI Asistan paneli.

**Boş durum:** Sonuç yoksa açıklayıcı mesaj gösterilir.

**Not:** Gerçek rapor verileri henüz API'ye bağlı değildir.

---

## 6. Metot Detayı Ekranı

```text
+----------------------------------------------+
|               METOT DETAYI                   |
|                                              |
|  Metot: processPayment()                     |
|  Dosya: PaymentService.java                  |
|                                              |
|  +----------------------------------------+  |
|  |          KAYNAK KOD GÖRÜNÜMÜ           |  |
|  |                                        |  |
|  |  1  function processPayment() {       |  |
|  |  2    // Kaynak kod satırları          |  |
|  |  3  }                                 |  |
|  +----------------------------------------+  |
|                                              |
|  [Karmaşıklık]  [Kod Metrikleri]              |
|                                              |
|  [Model açıklaması - ileri aşama]            |
|                                              |
|          [ AI ASİSTANA SOR ]                  |
+----------------------------------------------+
```

**Amaç:** Seçilen metodun analiz ayrıntılarını göstermek.

**Kullanıcı işlemi:** Kod satırlarını ve metrikleri inceler.

**Sonraki ekran:** Risk Raporu veya AI Asistan.

**Not:** SHAP/model açıklamaları ileri dönem hedefidir.

---

## 7. Karşılaştırma Ekranı

```text
+----------------------------------------------+
|          ANALİZ KARŞILAŞTIRMA                |
|                                              |
|  İlk sürüm:    [ v1.0 v ]                    |
|  İkinci sürüm: [ v1.1 v ]                    |
|                                              |
|          [ KARŞILAŞTIR ]                     |
|                                              |
|  +----------------------------------------+  |
|  |         RİSK DEĞİŞİM GRAFİĞİ          |  |
|  +----------------------------------------+  |
|                                              |
|  [Yeni Riskler] [Düzelenler] [Kötüleşenler] |
|                                              |
|         [ KARŞILAŞTIRMA RAPORU ]             |
+----------------------------------------------+
```

**Amaç:** Bir projenin iki analiz sürümünü karşılaştırmak.

**Kullanıcı işlemi:** İki analiz sürümü seçer.

**Sonraki ekran:** Karşılaştırma sonuçları.

**Not:** Bu özelliğin uygulanması ileri dönem çalışmalarındadır.

---

## Ek Bileşenler

### AI Asistan Paneli

Risk Raporu ve Metot Detayı üzerinden açılabilir.

- Sohbet mesajları

- Mesaj yazma alanı

- Gönder butonu

- Seçili analiz veya metot bilgisi

- Hata ve bağlantı durumları

### Analiz Geçmişi

Projeler bölümünden erişilebilir.

- Proje adı

- Analiz tarihi

- Sürüm etiketi

- Önceki raporu açma seçeneği

**Not:** Bunlar tasarım kararlarıdır; mevcut demoda asistan ve geçmiş ayrı menü ekranlarıdır.

## Kullanıcı Akışı

```text
Giriş / Kayıt
      |
      v
    Projeler
      |
      v
  Proje Yükleme
      |
      v
  Analiz Durumu
      |
      v
   Risk Raporu
      |
      +------> Metot Detayı
      |             |
      |             v
      |        AI Asistan
      |
      +------> Analiz Geçmişi
      |
      +------> Karşılaştırma
                (İleri aşama)
```

## Buton ve İşlem Davranışları

| Buton veya işlem | Beklenen davranış |
|---|---|
| Giriş Yap | Giriş doğrulanır, başarılıysa Projeler açılır |
| Yeni Proje | Yükleme ekranı açılır |
| Dosya Seç | Bilgisayardan ZIP seçilir |
| Analizi Başlat | Geçerli dosya backend'e gönderilir (hedeflenen davranış) |
| Raporu Gör | Tamamlanan analiz raporu açılır |
| Metodu İncele | Seçilen metodun ayrıntısı gösterilir |
| AI Asistana Sor | Seçili metot bağlamıyla sohbet açılır |
| Geçmiş | Önceki analizler listelenir |
| Karşılaştır | İki analiz sürümü karşılaştırılır; ileri aşama |

## Arayüz ve Erişilebilirlik Notları

- Masaüstünde sol menü, mobilde daraltılabilir menü kullanılabilir.

- Hata mesajları kullanıcıya açık biçimde gösterilir.

- Tablolar küçük ekranlarda taşmadan veya yatay kaydırılarak görüntülenir.

- Rapor grafiklerinde yalnızca renge güvenilmez; metin etiketleri de bulunur.

- Gerçek backend'e bağlı olmayan ekranlarda demo olduğu belirtilir.
