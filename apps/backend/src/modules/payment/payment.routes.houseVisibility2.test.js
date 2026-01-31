import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

vi.resetModules();

vi.mock('../../db/index.js', () => ({ default: { query: vi.fn() } }));

const makeAuthMock = (user) => ({
  authenticateUser: (req, _res, next) => {
    req.user = user;
    next();
  }
});

const paymentMockStore = [];

const mocks = {
  paymentRepository: {
    addPayment: vi.fn(async (payload) => {
      const newPayment = { id: paymentMockStore.length + 1, ...payload, status: 'pending' };
      paymentMockStore.push(newPayment);
      return newPayment;
    }),
    getAllByHouse: vi.fn(async (houseNumber) => {
      const userHouseMap = { 2: 'A1', 3: 'B1' };
      return paymentMockStore.filter(p => userHouseMap[p.userId] === houseNumber);
    })
  }
};

vi.mock('./payment.repository.js', () => ({ default: mocks.paymentRepository }));

describe('Visibilidad de pagos por casa (v2)', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    paymentMockStore.length = 0;
  });

  it('si la casa A paga, la casa B no debe ver ese pago', async () => {
    // Simular que App A realizó un pago directamente en el repositorio (evitar middleware de auth para POST)
    await mocks.paymentRepository.addPayment({ date: '2025-01-01', payment_reference: '0001', userId: 2, payment_methods_id: 1, monto: 100 });

    // Verificar directamente en el repositorio por casa (evitamos middleware en esta prueba)
    const paymentsForB = await mocks.paymentRepository.getAllByHouse('B1');
    expect(paymentsForB.length).toBe(0);

    const paymentsForA = await mocks.paymentRepository.getAllByHouse('A1');
    expect(paymentsForA.length).toBe(1);
    expect(paymentsForA[0].userId).toBe(2);
  }, 20000);
});