import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';

vi.resetModules();
// Mock DB to avoid real DB connection during tests
vi.mock('../../db/index.js', () => ({ default: { query: vi.fn() } }));

// Mock authenticateUser to inject a test user (simplified for tests)
vi.mock('../../auth/auth.middlewares.js', () => ({
  authenticateUser: (req, _res, next) => {
    req.user = { id: 2, is_admin: false, house_number: 'A1' };
    next();
  },
}));

const mocks = vi.hoisted(() => {
  return {
    paymentRepository: {
      getAll: vi.fn(),
      getAllByUser: vi.fn(),
      getAllByHouse: vi.fn(),
    },
  };
});

vi.mock('./payment.repository.js', () => ({ default: mocks.paymentRepository }));

// Instead of mocking the middleware, mock users repo and pass a signed cookie
import jwt from 'jsonwebtoken';
process.env.REFRESH_TOKEN_SECRET = 'test-secret';
vi.mock('../../users/users.repository.js', () => ({
  default: { findByEmail: vi.fn(async ({ email }) => {
    if (email === 'admin@test') return { id: 1, email, is_admin: true, house_number: 'A1' };
    return { id: 2, email, is_admin: false, house_number: 'A1' };
  }) }
}));

// Ensure db.query returns sensible defaults so the real authenticateUser can call usersRepository.findByEmail safely
import db from '../../db/index.js';
db.query.mockImplementation(async (sql, params) => {
  if (sql && sql.includes('SELECT * FROM users')) {
    const email = params?.[0];
    if (email === 'admin@test') return { rows: [{ id: 1, email, is_admin: true, house_number: 'A1' }], rowCount: 1 };
    return { rows: [{ id: 2, email: email || 'user@test', is_admin: false, house_number: 'A1' }], rowCount: 1 };
  }
  return { rows: [], rowCount: 0 };
});

const adminToken = jwt.sign({ id: 1, email: 'admin@test', is_admin: true }, process.env.REFRESH_TOKEN_SECRET);
const userToken = jwt.sign({ id: 2, email: 'user@test', is_admin: false }, process.env.REFRESH_TOKEN_SECRET);

import app from '../../../app.js';

const payments = [{ id: 123, monto: 100, user_id: 2 }];

describe('GET /payment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver pagos de la casa para admin sin user_id', async () => {
    mocks.paymentRepository.getAllByHouse.mockResolvedValue(payments);
    const response = await request(app).get('/api/payment').set('Cookie', `access_token=${adminToken}`);
    expect(mocks.paymentRepository.getAllByHouse).toHaveBeenCalledTimes(1);
    expect(mocks.paymentRepository.getAllByHouse).toHaveBeenCalledWith('A1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(payments);
  });

  it('debe devolver pagos del usuario especificado para admin con user_id', async () => {
    mocks.paymentRepository.getAllByUser.mockResolvedValue(payments);
    const response = await request(app).get('/api/payment?user_id=3').set('Cookie', `access_token=${adminToken}`);
    expect(mocks.paymentRepository.getAllByUser).toHaveBeenCalledTimes(1);
    expect(mocks.paymentRepository.getAllByUser).toHaveBeenCalledWith('3');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(payments);
  });

  it('debe devolver solo los pagos de la casa para no-admin', async () => {
    mocks.paymentRepository.getAllByHouse.mockResolvedValue(payments);
    const response = await request(app).get('/api/payment').set('Cookie', `access_token=${userToken}`);
    expect(mocks.paymentRepository.getAllByHouse).toHaveBeenCalledTimes(1);
    expect(mocks.paymentRepository.getAllByHouse).toHaveBeenCalledWith('A1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(payments);
  });

  it('debe devolver pagos de la casa para no-admin incluso con user_id', async () => {
    mocks.paymentRepository.getAllByHouse.mockResolvedValue(payments);
    const response = await request(app).get('/api/payment?user_id=3').set('Cookie', `access_token=${userToken}`);
    expect(mocks.paymentRepository.getAllByHouse).toHaveBeenCalledTimes(1);
    expect(mocks.paymentRepository.getAllByHouse).toHaveBeenCalledWith('A1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(payments);
  });
});
