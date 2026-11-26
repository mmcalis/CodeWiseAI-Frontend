// @vitest-environment jsdom
import { afterEach, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import App from '../src/App';

afterEach(cleanup);

function openApp() {
  render(<App />);
  fireEvent.change(screen.getByLabelText('E-posta'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('Şifre'), { target: { value: 'deneme123' } });
  fireEvent.click(screen.getByRole('button', { name: 'Demo Giriş' }));
}

function press(name: string) {
  fireEvent.click(screen.getByRole('button', { name }));
}

it('seçilen dosyanın durumunu önizler ve tamamlandı görünümünden örnek raporu açar', () => {
  openApp();
  fireEvent.click(screen.getByRole('button', { name: /Yeni proje yükle/ }));
  const file = new File(['print(1)'], 'ornekyukleme.py');
  fireEvent.change(screen.getByLabelText('ZIP veya kaynak kod dosyası seç'), { target: { files: [file] } });
  fireEvent.change(screen.getByLabelText('Demo proje'), { target: { value: 'p-1' } });
  press('İsteği dene (demo)');
  press('Analiz durumunu önizle');

  expect(screen.getByText(file.name)).toBeTruthy();
  expect(within(screen.getByRole('status')).getByText('Sırada')).toBeTruthy();
  press('Analiz ediliyor');
  expect(within(screen.getByRole('status')).getByText('Analiz ediliyor')).toBeTruthy();
  expect(screen.queryByRole('button', { name: 'Örnek raporu aç' })).toBeNull();
  press('Tamamlandı');
  press('Örnek raporu aç');
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Risk Raporu');
});

it('menüden açılan başarısız durumunda dosya seçimine döner', () => {
  openApp();
  press('Analiz durumu');
  press('Başarısız');
  expect(within(screen.getByRole('status')).getByText('Başarısız')).toBeTruthy();
  expect(screen.queryByRole('button', { name: 'Örnek raporu aç' })).toBeNull();
  press('Dosya seçimine dön');
  expect(screen.getByLabelText('ZIP veya kaynak kod dosyası seç')).toBeTruthy();
});
