# SRS — Yazılım gereksinimleri (başlangıç taslağı)

## Amaç
CodeWise AI, kaynak kod yükleyerek metrik/risk raporu alan ve bu raporları yapay zekâ asistanıyla yorumlayan bir platformdur. Çoklu dil statik analiz hedeflenir. Hata tahmininde ML deneyleri yalnızca doğrulanmış veri ve dil için sunulur.

## Roller
- Kullanıcı: proje oluşturur, ZIP yükler, rapor görüntüler ve asistanla konuşur.
- Sistem: yüklenen kodu **çalıştırmadan** analiz eder, sonucu saklar ve gerekli metrikleri gösterir.

## Fonksiyonel gereksinimler
- FR-01: Kullanıcı kayıt ve oturum açma yapabilmeli.
- FR-02: Kullanıcı bir proje kaydı oluşturabilmeli.
- FR-03: Kullanıcı güvenli dosya yükleme akışıyla ZIP seçip gönderebilmeli.
- FR-04: Kullanıcı analiz durumunu görebilmeli.
- FR-05: Kullanıcı raporu dil, dosya, metot ve risk seviyesine göre filtreleyebilmeli.
- FR-06: Kullanıcı bir risk bulgusunu açıklatabilmeli (asistan araç çıktısına dayanır).
- FR-07: Kullanıcı analiz geçmişine erişebilmeli.
- FR-08: İkinci dönemde sürümleri karşılaştırabilmeli.

## Fonksiyonel olmayan gereksinimler
- NFR-01: ZIP içeriği yürütülmez. Dosya boyutu ve arşiv açma kontrolleri backend'de yapılır.
- NFR-02: Kullanıcının sırları/frontend'e gömülmez. API anahtarları sunucu tarafında tutulur.
- NFR-03: Ekranlar klavyeyle kullanılabilir ve mobil çözünürlükte taşmadan açılır.
- NFR-04: Her API durumu için yükleniyor / boş / hata arayüzleri bulunur.
- NFR-05: Rapor, kullanılan analiz yöntemi ve desteklenen dil bilgisini gösterir.

## Dış kapsam (ilk dönem)
- IDE eklentisi, GitHub PR botu, otomatik kod düzenleme, çoklu dilde ML hata olasılığı iddiası.
