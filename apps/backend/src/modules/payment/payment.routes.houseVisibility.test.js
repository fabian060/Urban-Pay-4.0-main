import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

vi.resetModules();

// Mock db to avoid real DB
vi.mock('../../db/index.js', () => ({ default: { query: vi.fn() } }));

// We'll mock the authenticateUser middleware per-test by mocking the module
// and re-importing the app after setting the desired behavior.

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
      // Simulate inserting and returning a payment object
      const newPayment = { id: paymentMockStore.length + 1, ...payload, status: 'pending' };
      paymentMockStore.push(newPayment);
      return newPayment;
    }),
    getAllByHouse: vi.fn(async (houseNumber) => {
      // Return payments whose user_id belongs to a user with that house
      // For test simplicity, we infer house by user id mapping below
      const userHouseMap = { 2: 'A1', 3: 'B1' };
      return paymentMockStore.filter(p => userHouseMap[p.userId] === houseNumber);
    })
  }
};

vi.mock('./payment.repository.js', () => ({ default: mocks.paymentRepository }));

describe('Visibilidad de pagos por casa', () => {
  // Aumentar timeout para evitar falsos negativos en entornos lentos
  vi.setTimeout(20000);
  beforeEach(() => {
    vi.resetAllMocks();
    paymentMockStore.length = 0;
  });

  it('si la casa A paga, la casa B no debe ver ese pago', async () => {
    // 1) App with authenticateUser mocked as user A (id:2, house A1)
    vi.mock('../../auth/auth.middlewares.js', () => makeAuthMock({ id: 2, is_admin: false, house_number: 'A1' }));
    const appA = (await import('../../../app.js')).default;

    // Post a payment as user A
    const payload = { date: '2025-01-01', payment_reference: '0001', userId: 2, payment_methods_id: '1', monto: '100' };
    const postResp = await request(appA).post('/api/payment').send(payload);
    expect(postResp.statusCode).toBe(200);
    expect(postResp.body.userId).toBe(2);

    // 2) App with authenticateUser mocked as user B (id:3, house B1)
    vi.resetModules();
    vi.mock('../../db/index.js', () => ({ default: { query: vi.fn() } }));
    vi.mock('./payment.repository.js', () => ({ default: mocks.paymentRepository }));
    vi.mock('../../auth/auth.middlewares.js', () => makeAuthMock({ id: 3, is_admin: false, house_number: 'B1' }));

    const appB = (await import('../../../app.js')).default;

    const getRespB = await request(appB).get('/api/payment');
    // Casa B should not see payments from Casa A
    expect(getRespB.statusCode).toBe(200);
    expect(getRespB.body).toBeInstanceOf(Array);
    expect(getRespB.body.length).toBe(0);

    // 3) App with user A again should see the payment
    vi.resetModules();
    vi.mock('../../db/index.js', () => ({ default: { query: vi.fn() } }));
    vi.mock('./payment.repository.js', () => ({ default: mocks.paymentRepository }));
    vi.mock('../../auth/auth.middlewares.js', () => makeAuthMock({ id: 2, is_admin: false, house_number: 'A1' }));

    const appA2 = (await import('../../../app.js')).default;
    const getRespA = await request(appA2).get('/api/payment');
    expect(getRespA.statusCode).toBe(200);
    expect(getRespA.body).toBeInstanceOf(Array);
    expect(getRespA.body.length).toBe(1);
    expect(getRespA.body[0].userId).toBe(2);
  });
});
