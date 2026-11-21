-- CodeWise AI / F1 / T13
-- PostgreSQL 16 için proje ve analiz ilişkisi denemesi.
-- psql ile yerel geliştirme veritabanında dosyanın tümünü çalıştırabilirsin.
-- pgAdmin için aynı klasördeki veri modeli notunda iki seçim adımı bulunur.
-- Geçici tablolar oturuma aittir. Sondaki ROLLBACK deneme kayıtlarını geri alır.

BEGIN;

-- Bu örnek tablo, Identity kullanıcısının UUID tipindeki anahtarını temsil eder.
CREATE TEMP TABLE t13_sample_users (
    id uuid PRIMARY KEY
);

CREATE TEMP TABLE t13_projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id uuid NOT NULL REFERENCES t13_sample_users (id),
    name text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TEMP TABLE t13_analyses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id uuid NOT NULL REFERENCES t13_projects (id),
    version_tag text,
    status text NOT NULL CHECK (status IN ('queued', 'running', 'completed', 'failed')),
    model_version text,
    summary jsonb,
    created_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO t13_sample_users (id)
VALUES ('10000000-0000-4000-8000-000000000001');

INSERT INTO t13_projects (id, owner_id, name)
VALUES (
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000001',
    'AVL Ödevi'
);

-- Sayılar bu deneme için verilmiştir. İki yükleme aynı projeye aittir.
INSERT INTO t13_analyses (project_id, version_tag, status, summary)
VALUES
    ('20000000-0000-4000-8000-000000000001', 'v1.0', 'completed',
     '{"file_count": 1, "method_count": 3}'),
    ('20000000-0000-4000-8000-000000000001', 'v1.1', 'queued', NULL);

SELECT
    p.name AS proje,
    a.version_tag AS surum,
    a.status AS durum,
    (a.summary ->> 'method_count')::integer AS metot_sayisi
FROM t13_projects AS p
JOIN t13_analyses AS a ON a.project_id = p.id
ORDER BY a.version_tag;

ROLLBACK;
