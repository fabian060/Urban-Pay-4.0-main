import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';


const addPayment = async (payload) => {
  // Obtener el house_number del usuario
  const userRes = await db.query(
    `SELECT house_number FROM users WHERE id = $1`,
    [payload.userId]
  );
  if (userRes.rows.length === 0) {
    throw new ErrorWithStatus(400, 'Usuario no encontrado');
  }
  const houseNumber = userRes.rows[0].house_number;

  // Buscar la primera cuota que no haya sido pagada por ningún usuario de la misma casa
  const cuotaRes = await db.query(
    `
    SELECT c.id FROM cuotas c
    WHERE NOT EXISTS (
      SELECT 1 FROM payment p
      JOIN users u ON p.user_id = u.id
      WHERE p.cuota_id = c.id
      AND u.house_number = $1
      AND p.status IN ('pending', 'accepted')
    )
    ORDER BY c.date ASC LIMIT 1`,
    [houseNumber]
  );

  if (cuotaRes.rows.length === 0) {
    throw new ErrorWithStatus(400, 'No hay cuotas disponibles para asignar');
  }
  const cuotaId = cuotaRes.rows[0].id;

  const response = await db.query(
    `
    INSERT INTO payment (date, payment_reference, user_id, cuota_id, payment_methods_id, monto)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
  `,
    [payload.date, payload.payment_reference, payload.userId, cuotaId, payload.payment_methods_id, payload.monto]
  );
  return response.rows[0];
};

const getAllByUser = async (userId) => {
  const response = await db.query(
    `
    SELECT * FROM payment
    WHERE user_id = $1
    ORDER BY date DESC
  `,
    [userId]
  );
  return response.rows;
};

const getById = async (id, userId) => {
  const response = await db.query(
    `
    SELECT * FROM payment
    WHERE id = $1 AND user_id = $2
  `,
    [id, userId]
  );
  return response.rows[0];
};

const updatePayment = async (id, userId, payload) => {
  const response = await db.query(
    `
    UPDATE payment
    SET date = $1, payment_reference = $2
    WHERE id = $3 AND user_id = $4
    RETURNING *
  `,
    [payload.date, payload.payment_reference, id, userId]
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'Pago no encontrado');
  }
  return response.rows[0];
};

const deletePayment = async (id, userId) => {
  const response = await db.query(
    `
    DELETE FROM payment
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `,
    [id, userId]
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'Pago no encontrado');
  }
  return response.rows[0];
};

const getAll = async (houseNumber) => {
  let query = `
    SELECT p.*
    FROM payment p
  `;
  const params = [];
  if (houseNumber) {
    query += ' JOIN users u ON p.user_id = u.id WHERE u.house_number = $1';
    params.push(houseNumber);
  }
  query += ' ORDER BY p.date DESC';
  const response = await db.query(query, params);
  return response.rows;
};


const updatePaymentStatus = async (id, status) => {
  // Actualizar el estado del pago
  const response = await db.query(
    `
    UPDATE payment
    SET status = $1
    WHERE id = $2
    RETURNING *
  `,
    [status, id]
  );

  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'Pago no encontrado');
  }

  return response.rows[0];
};

const getAllByHouse = async (houseNumber) => {
  const response = await db.query(
    `
    SELECT p.*, u.house_number FROM payment p
    JOIN users u ON p.user_id = u.id
    WHERE u.house_number = $1
    ORDER BY p.date DESC
  `,
    [houseNumber]
  );
  return response.rows;
};


const paymentRepository = {
  addPayment,
  getAll,
  getAllByUser,
  getById,
  updatePayment,
  deletePayment,
  updatePaymentStatus,
  getAllByHouse
};

export default paymentRepository;
