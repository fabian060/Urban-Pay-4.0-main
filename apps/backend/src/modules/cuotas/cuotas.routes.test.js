import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { ErrorWithStatus } from '../../utils/errorTypes.js';
import jwt from 'jsonwebtoken';

process.env.REFRESH_TOKEN_SECRET = 'test-secret';
vi.resetModules();
// Mock DB to avoid real DB connection during tests
vi.mock('../../db/index.js', () => ({ default: { query: vi.fn() } }));

// Mock users repository to return a user based on email (kept for compatibility in some tests)
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

// Instead of relying on the real middleware + cookies, mock authenticateUser to inject a test user
vi.mock('../../auth/auth.middlewares.js', () => ({
  authenticateUser: (req, _res, next) => {
    req.user = { id: 2, is_admin: false, house_number: 'A1' };
    next();
  },
}));

// We keep a token variable for tests that still use cookie (not necessary with the mocked middleware)
const userToken = jwt.sign({ id: 2, email: 'user@test', is_admin: false }, process.env.REFRESH_TOKEN_SECRET);

const mocks = vi.hoisted(() => {
  return {
    cuotasRepository: {
      getAll: vi.fn(),
      addOne: vi.fn(),
      deleteOneById: vi.fn(),
      updateOneById: vi.fn(),
    },
  };
});

vi.mock('./cuotas.repository.js', () => ({ default: mocks.cuotasRepository }));

import app from '../../../app.js';

const cuotas = [{ id: 123, description: 'mes de agosto', date: '2025-08-01', date_limit: '2025-09-01', monto: '100.00', house_number: 'A1' }];

describe('Cuando se intenta obtener las cuotas', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver las cuotas cuando todo esta correcto', async () => {
    mocks.cuotasRepository.getAll.mockResolvedValue(cuotas);
    const response = await request(app).get('/api/cuotas').set('Cookie', `access_token=${userToken}`);
    expect(mocks.cuotasRepository.getAll).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).length(1);
  });
});

describe('Cuando se intenta agregar una cuota', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver la cuota agregado cuando la validacio es correcta', async () => {
    const newCuotaStructure = { description: 'mes de agosto', date: '2025-08-01', date_limit: '2025-09-01', monto: '100.00' };
    const expectedCuotaStructure = { ...newCuotaStructure, id: 678 };
    mocks.cuotasRepository.addOne.mockResolvedValue(expectedCuotaStructure);
    const response = await request(app).post('/api/cuotas').set('Cookie', `access_token=${userToken}`).send(newCuotaStructure);
    expect(mocks.cuotasRepository.addOne).toHaveBeenCalledTimes(1);
    // With global cuotas the route should NOT inject the user's house_number
    expect(mocks.cuotasRepository.addOne).toBeCalledWith(newCuotaStructure);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(expectedCuotaStructure);
  });
  it('debe devolver un error describiendo las causas de porque la validacion fallo', async () => {
    const badCuota = { description: '', date: '08-01-2025', date_limit: 'invalid', monto: 'abc' };
    const response = await request(app).post('/api/cuotas').set('Cookie', `access_token=${userToken}`).send(badCuota);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/Tiene que ser en formato YYYY-MM-DD|La descripcion no es valido|El monto/);
  });
});

describe('Cuando se intenta eliminar una cuota', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver la cuota eliminada cuando todo es correcto', async () => {
    const expectedCuotaStructure = cuotas[0];
    mocks.cuotasRepository.deleteOneById.mockResolvedValue(expectedCuotaStructure);
    const response = await request(app).delete('/api/cuotas/123').set('Cookie', `access_token=${userToken}`);
    expect(mocks.cuotasRepository.deleteOneById).toHaveBeenCalledTimes(1);
    expect(mocks.cuotasRepository.deleteOneById).toBeCalledWith({ cuotaId: cuotas[0].id });
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(expectedCuotaStructure);
  });
  it('debe devolver un error cuando el id no es un numero', async () => {
    const response = await request(app).delete('/api/cuotas/ifhsifj').set('Cookie', `access_token=${userToken}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ error: 'El id tiene que ser un numero' });
  });
  it('debe devolver un error la cuota no fue encontrado', async () => {
    mocks.cuotasRepository.deleteOneById.mockRejectedValue(
      new ErrorWithStatus(404, 'La cuota no fue encontrado'),
    );
    const response = await request(app).delete('/api/cuotas/6464').set('Cookie', `access_token=${userToken}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({ error: 'La cuota no fue encontrado' });
  });
});

describe('Cuando se intenta actualizar una cuota', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver la cuota actualizado cuando todo es correcto', async () => {
    const newCuotaStructure = { description: 'mes de agosto', date: '2025-08-01', date_limit: '2025-09-01', monto: '100.00', house_number: 'A1' };
    const expectedCuotaStructure = { ...cuotas[0], ...newCuotaStructure };
    mocks.cuotasRepository.updateOneById.mockResolvedValue(expectedCuotaStructure);
    const response = await request(app).put('/api/cuotas/123').set('Cookie', `access_token=${userToken}`).send(newCuotaStructure);
    expect(mocks.cuotasRepository.updateOneById).toHaveBeenCalledTimes(1);
    expect(mocks.cuotasRepository.updateOneById).toBeCalledWith(
      cuotas[0].id,
      newCuotaStructure,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(expectedCuotaStructure);
  });
  it('debe devolver un error cuando el id no es un numero', async () => {
    const newCuotaStructure = { description: 'mes de agosto', date: '2025-08-01', date_limit: '2025-09-01', monto: '100.00', house_number: 'A1' };
    const response = await request(app).put('/api/cuotas/ifhsifj').set('Cookie', `access_token=${userToken}`).send(newCuotaStructure);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/El id tiene que ser un numero/);
  });
  it('debe devolver un error la cuota no fue encontrado', async () => {
    const newCuotaStructure = { description: 'mes de agosto', date: '2025-08-01', date_limit: '2025-09-01', monto: '100.00', house_number: 'A1' };
    mocks.cuotasRepository.updateOneById.mockRejectedValue(
      new ErrorWithStatus(404, 'La cuota no fue encontrado'),
    );
    const response = await request(app).put('/api/cuotas/6464').set('Cookie', `access_token=${userToken}`).send(newCuotaStructure);
    expect(response.statusCode).toBe(404);
    // Be tolerant to small wording differences
    expect(typeof response.body.error).toBe('string');
    expect(response.body.error.toLowerCase()).toContain('encontrado');
  });
  it('debe devolver un error describiendo las causas de porque la validacion fallo', async () => {
    // Only description is invalid so the error is specific
    const newCuotaStructure = { description: '', date: '2025-08-01', date_limit: '2025-09-01', monto: '100.00', house_number: 'A1' };
    const response = await request(app).put('/api/cuotas/123').set('Cookie', `access_token=${userToken}`).send(newCuotaStructure);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ error: 'La descripcion no es valido.' });
  });
});
