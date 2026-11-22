import { describe, expect, it } from 'vitest';
import { buildUploadRequest, receiveDemoUpload } from '../src/api/client';

describe('Yükleme isteğinin hazırlanması', () => {
  it('proje kimliğini URL için kodlar, dosyayı ve sürümü POST gövdesine koyar', () => {
    const file = new File(['abc'], 'ornek.py');
    const request = buildUploadRequest('ders/1', file, '  v1.0  ');

    expect(request.path).toBe('/api/projects/ders%2F1/analyses');
    expect(request.options.method).toBe('POST');
    expect(request.options.body.get('file')).toBe(file);
    expect(request.options.body.get('versionTag')).toBe('v1.0');
  });

  it('boş sürüm isteğe eklenmez ve dosya yine doğrulanır', () => {
    const request = buildUploadRequest('p-1', new File(['abc'], 'avl.zip'), '   ');
    expect(request.options.body.has('versionTag')).toBe(false);
    expect(receiveDemoUpload(request)).toEqual({
      ok: true,
      target: 'POST /api/projects/p-1/analyses',
      fileName: 'avl.zip',
      bytes: 3,
      versionTag: '',
    });
  });

  it.each(['eksik', 'metin'])('dosya alanı %s olunca alıcı hata döndürür', kind => {
    const body = new FormData();
    if (kind === 'metin') body.set('file', 'avl.zip');
    const reply = receiveDemoUpload({
      path: '/api/projects/p-1/analyses',
      options: { method: 'POST', body },
    });
    expect(reply.ok).toBe(false);
  });
});
