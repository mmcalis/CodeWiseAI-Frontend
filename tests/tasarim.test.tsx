// @vitest-environment jsdom
import { afterEach, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import App from '../src/App';
import { projects as ornekProjeler } from '../src/data/mock';

afterEach(cleanup);

function openApp() {
  render(<App />);
  fireEvent.change(screen.getByLabelText('E-posta'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('Şifre'), { target: { value: 'deneme123' } });
  fireEvent.click(screen.getByRole('button', { name: 'Demo Giriş' }));
}

function openReport() {
  openApp();
  const menu = screen.getByRole('navigation', { name: 'Ana menü' });
  fireEvent.click(within(menu).getByRole('button', { name: 'Risk raporu' }));
}

it('projeleri gösterir ve başlıktaki tek yükleme düğmesiyle dosya seçimine gider', () => {
  openApp();
  const projects = screen.getByRole('region', { name: 'Proje listesi' });
  expect(within(projects).getAllByRole('article')).toHaveLength(4);
  for (const proje of ornekProjeler) {
    const kart = within(projects).getByRole('article', { name: proje.name });
    const puan = within(kart).getByRole('meter', { name: 'Örnek risk puanı' }) as HTMLMeterElement;
    expect([puan.min, puan.max, puan.value]).toEqual([0, 100, proje.score]);
  }
  const upload = screen.getByRole('button', { name: /Yeni proje yükle/ });
  const title = screen.getByRole('heading', { name: 'Projeler', level: 1 });
  expect(title.closest('header')?.contains(upload)).toBe(true);
  fireEvent.click(upload);
  expect(screen.getByLabelText('ZIP veya kaynak kod dosyası seç')).toBeTruthy();
});

it('kaydedilen üç metodu gösterir ve dosya filtresi yalnız ilgili satırları bırakır', () => {
  openReport();
  const table = within(screen.getByRole('table'));
  expect(table.getAllByRole('row')).toHaveLength(4);
  const band = table.getByText('puan_araligi').closest('tr')!;
  expect(within(band).getByText('12')).toBeTruthy();
  expect(within(band).getByText('Karmaşık metot')).toBeTruthy();
  expect(table.queryByRole('columnheader', { name: 'Risk puanı' })).toBeNull();

  const files = screen.getByLabelText('Dosya filtresi');
  fireEvent.change(files, { target: { value: 'notlar.py' } });
  expect(table.getAllByRole('row')).toHaveLength(3);
  expect(table.queryByText('Sayac::pozitifleriSay')).toBeNull();
  fireEvent.change(files, { target: { value: 'Sayac.java' } });
  expect(table.getAllByRole('row')).toHaveLength(2);
  expect(table.getByText('Sayac::pozitifleriSay')).toBeTruthy();
  fireEvent.change(files, { target: { value: '' } });
  expect(table.getAllByRole('row')).toHaveLength(4);
});

it('temsili risk örneğine geçip dil filtresini kullanır ve ölçümlere döner', () => {
  openReport();
  const source = screen.getByLabelText('Rapor örneği');
  fireEvent.change(source, { target: { value: 'puan' } });
  expect(screen.getByRole('columnheader', { name: 'Risk puanı' })).toBeTruthy();
  fireEvent.change(screen.getByLabelText('Dil'), { target: { value: 'Python' } });
  expect(within(screen.getByRole('table')).getAllByRole('row')).toHaveLength(2);
  expect(screen.getByText('check_permissions()')).toBeTruthy();
  expect(screen.getByRole('button', { name: /Asistana sor/ })).toBeTruthy();
  fireEvent.change(source, { target: { value: 'olcum' } });
  expect(screen.getByLabelText('Dosya filtresi')).toBeTruthy();
});
