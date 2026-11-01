import type { DemoProject, MethodRisk } from '../types';
// ÖRNEK VERİ: Gerçek projelerden alınmamıştır, gerçek analiz sonucu değildir.
export const projects: DemoProject[] = [
  { id: 'p-1', name: 'mustafa-test-projesi', language: 'Java', lastAnalyzed: 'Örnek: 27 Ekim 2026', methods: 186, score: 76 },
  { id: 'p-2', name: 'dashboard-service', language: 'Python', lastAnalyzed: 'Örnek: 26 Ekim 2026', methods: 92, score: 42 },
  { id: 'p-3', name: 'client-portal', language: 'JavaScript', lastAnalyzed: 'Örnek: 24 Ekim 2026', methods: 74, score: 59 },
  { id: 'p-4', name: 'inventory-core', language: 'C#', lastAnalyzed: 'Örnek: 23 Ekim 2026', methods: 108, score: 28 },
];
export const methods: MethodRisk[] = [
  { id: 'm1', file: 'src/PaymentService.java', method: 'processPayment()', language: 'Java', score: 89, level: 'Yüksek', complexity: 26, reason: 'Yüksek döngüsel karmaşıklık; çok sayıda koşul.' },
  { id: 'm2', file: 'src/OrderManager.java', method: 'applyDiscounts()', language: 'Java', score: 77, level: 'Yüksek', complexity: 21, reason: 'Uzun metot ve iç içe koşullar.' },
  { id: 'm3', file: 'api/auth.py', method: 'check_permissions()', language: 'Python', score: 64, level: 'Orta', complexity: 17, reason: 'Karar dalları artmış.' },
  { id: 'm4', file: 'web/cart.js', method: 'calculateTotal()', language: 'JavaScript', score: 48, level: 'Orta', complexity: 12, reason: 'Birden fazla sorumluluk içerebilir.' },
  { id: 'm5', file: 'Services/StockService.cs', method: 'Recalculate()', language: 'C#', score: 21, level: 'Düşük', complexity: 5, reason: 'Düşük karmaşıklık.' },
];
export const riskCounts = [{ label: 'Yüksek risk', value: 2, className: 'red' }, { label: 'Orta risk', value: 2, className: 'orange' }, { label: 'Düşük risk', value: 1, className: 'green' }];
