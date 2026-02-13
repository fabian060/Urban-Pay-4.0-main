import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the db module (provide a mocked default export with a query fn)
vi.mock('../../db/index.js', () => {
  return { default: { query: vi.fn() } };
});

import db from '../../db/index.js';
import paymentRepository from './payment.repository.js';

describe('paymentRepository.addPayment', () => {
  it('debe seleccionar una cuota disponible para la casa del usuario', async () => {
    // Setup mocks inside the test
    db.query
      .mockImplementationOnce(() => Promise.resolve({ rows: [{ house_number: 'A1' }], rowCount: 1 })) // User query
      .mockImplementationOnce(() => Promise.resolve({ rows: [{ id: 10 }], rowCount: 1 })) // Cuota query
      .mockImplementationOnce(() => Promise.resolve({ rows: [{ id: 99, cuota_id: 10, user_id: 2, house_number: 'A1' }], rowCount: 1 })); // Insert query

    const payload = { date: '2025-01-01', payment_reference: '0001', userId: 2, payment_methods_id: 1, monto: 100, house_number: 'A1' };

    const result = await paymentRepository.addPayment(payload);

    // Asegurarnos de que la consulta de selección filtra por house_number en lugar de user_id
    const secondCallSql = db.query.mock.calls[1][0]; // The cuota query is the second call
    expect(secondCallSql).toContain('NOT EXISTS');
    expect(secondCallSql).toContain('u.house_number = $1');
    expect(secondCallSql).not.toContain('p.user_id = $1');

    // Y que el resultado contiene la cuota asignada
    expect(result.cuota_id).toBe(10);
  });

  it('no debe bloquear la selección si existen pagos en otras casas para la misma cuota (NOT EXISTS filtra por house_number)', async () => {
    // Setup mocks inside the test
    db.query
      .mockImplementationOnce(() => Promise.resolve({ rows: [{ house_number: 'B2' }], rowCount: 1 })) // User query
      .mockImplementationOnce(() => Promise.resolve({ rows: [{ id: 20 }], rowCount: 1 })) // Cuota query
      .mockImplementationOnce(() => Promise.resolve({ rows: [{ id: 100, cuota_id: 20, user_id: 3, house_number: 'B2' }], rowCount: 1 })); // Insert query

    const payload = { date: '2025-02-01', payment_reference: '0002', userId: 3, payment_methods_id: 1, monto: 150, house_number: 'B2' };

    const result = await paymentRepository.addPayment(payload);

    // Verificamos que la consulta contiene NOT EXISTS y que dentro de la subconsulta se filtra por p.house_number = $1
    const secondCallSql = db.query.mock.calls[1][0]; // The cuota query is the second call
    expect(secondCallSql).toContain('NOT EXISTS');
    expect(secondCallSql).toContain('u.house_number = $1');

    // Y que el resultado contiene la cuota asignada (no fue bloqueada)
    expect(result.cuota_id).toBe(20);
  });
});
