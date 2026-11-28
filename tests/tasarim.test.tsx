// @vitest-environment jsdom
import { afterEach, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import App from '../src/App';
import AnalizOlcumTablosu from '../src/AnalizOlcumTablosu';
import analizOrnegi from '../src/data/analiz-ornegi.json';
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

it('dosya ve uyarı filtrelerini birlikte uygular, temizleme düğmesi tüm satırları geri getirir', () => {
  openReport();
  const uyarilar = screen.getByRole('checkbox', { name: 'Yalnızca uyarılı metotlar' }) as HTMLInputElement;
  const dosya = screen.getByLabelText('Dosya filtresi') as HTMLSelectElement;
  fireEvent.click(uyarilar);
  expect(screen.getByText('1 / 3 metot gösteriliyor.')).toBeTruthy();
  expect(within(screen.getByRole('table')).getByText('puan_araligi')).toBeTruthy();

  fireEvent.change(dosya, { target: { value: 'Sayac.java' } });
  expect(screen.getByRole('status').textContent).toBe('Seçtiğin filtrelere uyan metot yok.');
  expect(screen.queryByRole('table')).toBeNull();

  fireEvent.click(screen.getByRole('button', { name: 'Filtreleri temizle' }));
  expect(uyarilar.checked).toBe(false);
  expect(dosya.value).toBe('');
  expect(within(screen.getByRole('table')).getAllByRole('row')).toHaveLength(4);
  expect(screen.getByText('3 / 3 metot gösteriliyor.')).toBeTruthy();
});

it('yalnız uzunluk uyarısı olan metodu da filtrede gösterir', () => {
  const uzunMetot = {
    ...analizOrnegi.methods[0],
    method: 'uzun_metot',
    start_line: 1,
    end_line: 150,
    lines: 150,
    complexity_warning: false,
    long_method_warning: true,
  };
  render(<AnalizOlcumTablosu data={{ ...analizOrnegi, methods: [uzunMetot] }} />);
  fireEvent.click(screen.getByRole('checkbox', { name: 'Yalnızca uyarılı metotlar' }));
  const tablo = within(screen.getByRole('table'));
  expect(tablo.getByText('uzun_metot')).toBeTruthy();
  expect(tablo.getByText('Uzun metot')).toBeTruthy();
});

it('hiç metot ölçülmeyen rapor için ayrı açıklama gösterir', () => {
  render(<AnalizOlcumTablosu data={{ ...analizOrnegi, methods: [] }} />);
  expect(screen.getByRole('status').textContent).toBe('Bu analizde metot kaydı yok.');
  expect(screen.queryByRole('table')).toBeNull();
});
