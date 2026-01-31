import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';


const getAll = async (houseNumber) => {
  let query = 'SELECT * FROM cuotas';
  let params = [];

  if (houseNumber) {
    query += ' WHERE house_number = $1';
    params.push(houseNumber);
  }

  const response = await db.query(query, params);
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO cuotas (description, date, date_limit, monto, house_number)
    VALUES ($1, $2, $3, $4, $5) RETURNING *
  `,
  [payload.description, payload.date, payload.date_limit, payload.monto, payload.house_number],
  );
  return response.rows[0];
};

const deleteOneById = async (payload) => {
  const response = await db.query(
    `
    DELETE FROM cuotas
    WHERE id = $1 RETURNING *
  `,
  [payload.cuotaId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'La cuota no fue encontrada');
  }
  return response.rows[0];
};

const updateOneById = async (id, payload) => {
  const response = await db.query(
    `
    UPDATE cuotas
    SET description = $1, date = $2, date_limit = $3, monto = $4, house_number = $5
    WHERE id = $6
    RETURNING *
  `,
  [payload.description, payload.date, payload.date_limit, payload.monto, payload.house_number, id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'La cuota no fue encontrada');
  }
  return response.rows[0];
};

const cuotasRepository = { getAll, addOne, deleteOneById, updateOneById };

export default cuotasRepository;
