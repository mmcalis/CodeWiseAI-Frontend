-- CodeWise AI · F1 / T13 / 7. gün
-- Başlangıç noktası: zehra-demir34/Ai_Assistant, b6f65a9.
-- Migration: AddProjectsAndAnalyses (EF Core 8.0.29, PostgreSQL sağlayıcısı Npgsql).
-- PGlite sorgu alanına bu dosyanın tümünü yapıştırıp Enter'a bas.
-- Geçici kullanıcı ve geçmiş tabloları deneme içindir. Up ve Down SQL'i EF Core'dan üretilmiştir.

BEGIN;

CREATE TEMP TABLE t13_gun7_sonuc (
    sira integer PRIMARY KEY,
    asama text,
    projeler boolean,
    analizler boolean,
    ornek_kullanici boolean,
    yeni_migration boolean
);

-- İleri ve geri yöndeki bütün tablo işlemleri bu oturumun geçici alanında çalışır.
SET LOCAL search_path TO pg_temp;
CREATE TEMP TABLE "AspNetUsers" ("Id" uuid PRIMARY KEY);
CREATE TEMP TABLE "__EFMigrationsHistory" (
    "MigrationId" varchar(150) PRIMARY KEY,
    "ProductVersion" varchar(32) NOT NULL
);

INSERT INTO "AspNetUsers" ("Id") VALUES ('10000000-0000-4000-8000-000000000001');
INSERT INTO "__EFMigrationsHistory" VALUES ('20260918122215_AddDocumentEntity', '8.0.29');

CREATE TEMP VIEW t13_gun7_durum AS
SELECT
    to_regclass('pg_temp.projects') IS NOT NULL AS projeler,
    to_regclass('pg_temp.analyses') IS NOT NULL AS analizler,
    EXISTS (SELECT 1 FROM "AspNetUsers"
            WHERE "Id" = '10000000-0000-4000-8000-000000000001') AS ornek_kullanici,
    EXISTS (SELECT 1 FROM "__EFMigrationsHistory"
            WHERE "MigrationId" = '20261121142039_AddProjectsAndAnalyses') AS yeni_migration;

INSERT INTO t13_gun7_sonuc SELECT 1, 'Başlangıç', d.* FROM t13_gun7_durum AS d;

-- Up: kullanıcıya bağlı projeler ve projeye bağlı analizler.
CREATE TABLE projects (
    id uuid NOT NULL DEFAULT (gen_random_uuid()),
    owner_id uuid NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT (now()),
    CONSTRAINT "PK_projects" PRIMARY KEY (id),
    CONSTRAINT "FK_projects_AspNetUsers_owner_id" FOREIGN KEY (owner_id) REFERENCES "AspNetUsers" ("Id")
);

CREATE TABLE analyses (
    id uuid NOT NULL DEFAULT (gen_random_uuid()),
    project_id uuid NOT NULL,
    version_tag text,
    status text NOT NULL DEFAULT 'queued',
    model_version text,
    summary jsonb,
    created_at timestamp with time zone NOT NULL DEFAULT (now()),
    CONSTRAINT "PK_analyses" PRIMARY KEY (id),
    CONSTRAINT ck_analyses_status CHECK (status IN ('queued', 'running', 'completed', 'failed')),
    CONSTRAINT "FK_analyses_projects_project_id" FOREIGN KEY (project_id) REFERENCES projects (id)
);

CREATE INDEX "IX_analyses_project_id" ON analyses (project_id);

CREATE INDEX "IX_projects_owner_id" ON projects (owner_id);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20261121142039_AddProjectsAndAnalyses', '8.0.29');

INSERT INTO projects (id, owner_id, name) VALUES (
    '20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'AVL Ödevi'
);
INSERT INTO analyses (project_id, version_tag)
VALUES ('20000000-0000-4000-8000-000000000001', 'v1.1');
INSERT INTO t13_gun7_sonuc SELECT 2, 'Up sonrası', d.* FROM t13_gun7_durum AS d;

-- Down: bu migration'ın eklediği tablolar ve geçmişteki kaydı geri alınır.
DROP TABLE analyses;

DROP TABLE projects;

DELETE FROM "__EFMigrationsHistory"
WHERE "MigrationId" = '20261121142039_AddProjectsAndAnalyses';

INSERT INTO t13_gun7_sonuc SELECT 3, 'Down sonrası', d.* FROM t13_gun7_durum AS d;

SELECT asama,
       CASE WHEN projeler THEN 'var' ELSE 'yok' END AS projects,
       CASE WHEN analizler THEN 'var' ELSE 'yok' END AS analyses,
       CASE WHEN ornek_kullanici THEN 'var' ELSE 'yok' END AS ornek_kullanici,
       CASE WHEN yeni_migration THEN 'var' ELSE 'yok' END AS migration_kaydi
FROM t13_gun7_sonuc
ORDER BY sira;

ROLLBACK;
