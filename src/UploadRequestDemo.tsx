import { useState } from 'react';
import type { FormEvent } from 'react';
import { buildUploadRequest, receiveDemoUpload } from './api/client';
import { projects } from './data/mock';

type Trial = {
  file: File;
  reply: ReturnType<typeof receiveDemoUpload>;
};

export default function UploadRequestDemo({ file }: { file: File }) {
  const [trial, setTrial] = useState<Trial | null>(null);
  const reply = trial?.file === file ? trial.reply : null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const projectId = String(fields.get('projectId') ?? '');
    const versionTag = String(fields.get('versionTag') ?? '');

    const request = buildUploadRequest(projectId, file, versionTag);
    setTrial({ file, reply: receiveDemoUpload(request) });
  }

  return (
    <form className="notice" onSubmit={handleSubmit} onChange={() => setTrial(null)}>
      <p><strong>Yükleme isteği (taslak)</strong></p>
      <label className="filter">
        Demo proje
        <select name="projectId" defaultValue="" required>
          <option value="">Proje seç</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </label>
      <p>
        <label>
          Sürüm etiketi (isteğe bağlı) <input name="versionTag" placeholder="v1.0" />
        </label>
      </p>
      <button type="submit" className="ghost">İsteği dene (demo)</button>

      {reply?.ok && (
        <div role="status">
          <p><strong>Demo isteği doğrulandı.</strong></p>
          <p><code>{reply.target}</code></p>
          <p>Dosya: {reply.fileName} · {reply.bytes.toLocaleString('tr-TR')} bayt</p>
          <p>Sürüm: {reply.versionTag || 'Belirtilmedi'}</p>
        </div>
      )}
      {reply?.ok === false && <p className="error" role="alert">{reply.message}</p>}
    </form>
  );
}