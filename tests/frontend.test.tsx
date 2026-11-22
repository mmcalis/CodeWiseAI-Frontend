// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import App from '../src/App';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function submitLogin(email: string, password: string) {
  fireEvent.change(screen.getByLabelText('E-posta'), { target: { value: email } });
  fireEvent.change(screen.getByLabelText('Şifre'), { target: { value: password } });
  fireEvent.click(screen.getByRole('button', { name: 'Demo Giriş' }));
}

function openUpload() {
  render(<App />);
  submitLogin('test@example.com', 'deneme123');
  fireEvent.click(screen.getByRole('button', { name: /Yeni proje yükle/ }));
  return screen.getByLabelText('ZIP veya kaynak kod dosyası seç');
}

function pickFile(input: HTMLElement, file: File) {
  fireEvent.change(input, { target: { files: [file] } });
}

describe('Demo giriş ve çıkış', () => {
  it.each([
    ['boş e-posta', '', '', 'Lütfen e-posta adresinizi girin.'],
    ['geçersiz e-posta', 'mustafa', 'deneme123', 'Geçerli bir e-posta adresi girin.'],
    ['boş şifre', 'test@example.com', '', 'Lütfen şifrenizi girin.'],
    ['kısa şifre', 'test@example.com', '123', 'Demo şifresi en az 6 karakter olmalıdır.'],
  ])('%s için uyarı gösterir', (_scenario, email, password, message) => {
    render(<App />);
    submitLogin(email, password);
    expect(screen.getByRole('alert').textContent).toBe(message);
    expect(screen.queryByRole('heading', { name: 'Projeler' })).toBeNull();
  });

  it('girişten sonra Projeler açılır, çıkış giriş formuna döndürür', () => {
    render(<App />);
    submitLogin('test@example.com', 'deneme123');
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Projeler');
    fireEvent.click(screen.getByRole('button', { name: 'Çıkış Yap (Demo)' }));
    expect(screen.getByLabelText<HTMLInputElement>('E-posta').value).toBe('');
    expect(screen.queryByRole('navigation')).toBeNull();
  });
});

describe('Yükleme ekranı', () => {
  it.each(['avl.ZIP', 'ornek.py', 'Main.java', 'main.cpp'])('%s seçimini kabul eder', name => {
    const input = openUpload();
    pickFile(input, new File(['abc'], name));
    expect(screen.getByText(name + ' · 3 bayt')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'İsteği dene (demo)' })).toBeTruthy();
  });

  it.each([
    ['notlar.txt', 3, 'Bu dosya türü desteklenmiyor'],
    ['bos.py', 0, 'Dosya boş'],
    ['buyuk.zip', 25 * 1024 * 1024 + 1, 'Dosya 25 MB sınırını aşıyor'],
  ])('%s seçilince hata gösterir ve önceki seçimi temizler', (name, size, message) => {
    const input = openUpload();
    pickFile(input, new File(['abc'], 'ilk.py'));
    pickFile(input, new File([new Uint8Array(size)], name));
    expect(screen.getByRole('alert').textContent).toContain(message);
    expect(screen.queryByText('Seçilen dosya')).toBeNull();
    expect(screen.queryByRole('button', { name: 'İsteği dene (demo)' })).toBeNull();
  });

  it('tam 25 MB kabul edilir ve kullanıcı seçimi kaldırabilir', () => {
    const input = openUpload();
    pickFile(input, new File([new Uint8Array(25 * 1024 * 1024)], 'sinir.zip'));
    expect(screen.queryByRole('alert')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Seçimi kaldır' }));
    expect(screen.queryByText('Seçilen dosya')).toBeNull();
    expect(screen.getByRole<HTMLButtonElement>('button', { name: /Örnek raporu görüntüle/ }).disabled).toBe(true);
  });

  it('demo isteği proje seçilince yerelde doğrulanır, proje değişince eski sonuç kalkar', () => {
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    const xhr = vi.spyOn(XMLHttpRequest.prototype, 'send').mockImplementation(() => {});
    const input = openUpload();
    pickFile(input, new File(['abc'], 'avl.zip'));
    const submit = screen.getByRole('button', { name: 'İsteği dene (demo)' });
    fireEvent.click(submit);
    expect(screen.queryByRole('status')).toBeNull();

    const project = screen.getByRole('combobox');
    fireEvent.change(project, { target: { value: 'p-1' } });
    fireEvent.click(submit);
    const reply = within(screen.getByRole('status'));
    expect(reply.getByText('POST /api/projects/p-1/analyses')).toBeTruthy();
    expect(reply.getByText('Dosya: avl.zip · 3 bayt')).toBeTruthy();
    expect(reply.getByText('Sürüm: Belirtilmedi')).toBeTruthy();
    fireEvent.change(project, { target: { value: 'p-2' } });
    expect(screen.queryByRole('status')).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
    expect(xhr).not.toHaveBeenCalled();
  });
});
