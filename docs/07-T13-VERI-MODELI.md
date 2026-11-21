# T13 · Proje ve analiz veri modeli

Bir kullanıcı aynı projeyi birkaç kez yükleyebilir. Örneğin Mustafa, AVL Ödevi’nin ilk sürümünü yükledikten sonra kodu düzeltip tekrar yüklediğinde, iki analiz de aynı projenin geçmişinde görünür. Tamamlanan analizin raporu kendi analiz kimliğiyle açılır.

## Hangi bilgiler tutulacak?

Hocanın proje planındaki veri modelini React ekranlarıyla aşağıdaki gibi eşleştiriyoruz. Sütun adları EF Core tarafı için öneridir.

| Kayıt | Önerilen alanlar | Arayüzde kullanımı |
|---|---|---|
| Kullanıcı | Mevcut Identity kaydı, `AspNetUsers.Id` (UUID) | Kişinin kendi projeleri |
| `projects` | `id` (UUID), `owner_id` (kullanıcıya bağlı), `name`, `created_at` | Yükleme ekranındaki proje adı ve proje listesi |
| `analyses` | `id` (UUID), `project_id` (projeye bağlı), `version_tag` (isteğe bağlı), `status`, `model_version`, `summary` (JSONB), `created_at` | Yüklemenin ait olduğu proje, analiz durumu, geçmiş ve rapor özeti |
| `file_metrics` | Analiz kimliği, dosya yolu, dosya düzeyi metrikler | Seçilen analizin dosya listesi |
| `method_metrics` | Analiz kimliği, nitelikli metot adı, skor, risk sınıfı, öznitelikler ve SHAP açıklamaları | Seçilen analizin metot detayları |

Kullanıcı ile proje ve proje ile analiz arasında bire-çok ilişki vardır. Rapor ekranı `analyses.summary` özetini ve aynı analiz kimliğine bağlı dosya/metot ölçümlerini kullanır. Hesaplanmamış ölçümler boş kalır. Örneğin sıradaki bir analizin metot sayısını “0” diye göstermeyiz.

## Yükleme ekranıyla bağlantı

1. Kullanıcı projeyi adıyla seçer. Frontend, proje kimliğini yükleme adresine koyar. Mevcut arayüzdeki `p-1` örnek kimliktir. Gerçek bağlantıda kimlik .NET API’den gelecektir.
2. Yükleme kabul edildiğinde .NET API, seçilen projeye bağlı yeni bir analiz kaydı oluşturur. Sürüm etiketi boş bırakılabilir. Analiz kimliği her yüklemede farklıdır.
3. API, analiz servisinden aldığı sonucu PostgreSQL’e yazar. React, .NET API üzerinden önce durumu, sonra raporu okur. Önerilen durumlar `queued` (sırada), `running` (çalışıyor), `completed` (tamamlandı) ve `failed` (başarısız).

## PostgreSQL üzerinde kontrol

Aynı klasördeki [07-T13-PROJE-ANALIZ.sql](07-T13-PROJE-ANALIZ.sql) dosyası, örnek bir kullanıcı ile bir proje oluşturur ve bu projeye iki analiz bağlar. `psql` kullanıyorsan dosyanın tamamını yerel geliştirme veritabanında çalıştırabilirsin. pgAdmin kullanıyorsan veritabanına sağ tıkla, **Query Tool** seç ve SQL dosyasını aç. `BEGIN;` satırından `ORDER BY a.version_tag;` satırının sonuna kadar seçip **F5** tuşuna bas. **Data Output** bölümünde şu iki satırı görmen beklenir.

| proje | surum | durum | metot_sayisi |
|---|---|---|---|
| AVL Ödevi | v1.0 | completed | 3 |
| AVL Ödevi | v1.1 | queued | NULL |

Bunlar SQL denemesi için yazılmış örnek kayıtlardır. pgAdmin’de sonuçları gördükten sonra son satırdaki `ROLLBACK;` komutunu seçip **F5** tuşuna bas. Bu komut geçici tabloları ve kayıtları geri alır. Aynı dosya tekrar çalıştırılabilir.

## Kalıcı EF Core migration için devir

Zehra’nın başlangıç projesindeki `ApplicationDbContext`, ASP.NET Core Identity kullanıyor. Mevcut model kullanıcı kimliğini `AspNetUsers.Id` üzerinde UUID olarak tutuyor. Kalıcı eşlemede proje sahibinin yabancı anahtarı bu tabloyu kullanacak. [Mevcut EF Core modeli](https://github.com/zehra-demir34/Ai_Assistant/blob/b6f65a9bfe9d8edb78af318eededa22336c5bd2c/src/Infrastructure/Migrations/ApplicationDbContextModelSnapshot.cs)

Ortak .NET dalında önce güncel modeli kontrol edeceğiz. Zehra ile proje ve analiz varlıklarını bu modele ekleyip EF Core migration üreteceğiz. Başarı kontrolü, yeni migration’ın mevcut kullanıcı kayıtlarıyla uyumlu olması ve bir geliştirme veritabanında aynı projeye birden fazla analiz kaydedilebilmesidir. ZIP’in yüklendiği geçici dosya alanı ve analiz servisi bağlantısı API tarafında ele alınır.
