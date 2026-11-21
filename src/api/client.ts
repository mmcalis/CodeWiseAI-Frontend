// .NET yolu ve form alanları, ekip OpenAPI sözleşmesini kesinleştirene kadar taslaktır.
export function buildUploadRequest(projectId: string, file: File, versionTag: string) {
  const body = new FormData();
  body.set('file', file);

  const tag = versionTag.trim();
  if (tag) body.set('versionTag', tag);

  return {
    path: `/api/projects/${encodeURIComponent(projectId)}/analyses`,
    options: { method: 'POST' as const, body },
  };
}

// Yerel demo alıcısı, istek gövdesini tarayıcıda kontrol eder.
export function receiveDemoUpload(request: ReturnType<typeof buildUploadRequest>) {
  const file = request.options.body.get('file');
  if (!file || typeof file === 'string') {
    return { ok: false as const, message: 'İstekte dosya alanı eksik.' };
  }

  return {
    ok: true as const,
    target: `${request.options.method} ${request.path}`,
    fileName: file.name,
    bytes: file.size,
    versionTag: String(request.options.body.get('versionTag') ?? ''),
  };
}