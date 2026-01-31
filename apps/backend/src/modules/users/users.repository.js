import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO users (email, passwordhash, house_number)
    VALUES ($1, $2, $3) RETURNING *
  `,
  [payload.email, payload.passwordHash, payload.house_number],
  );
  return response.rows[0];
};

const verifyOne = async (payload) => {
  const response = await db.query(
    `
    UPDATE users
    SET verify_email = true
    WHERE id = $1
    RETURNING *
  `,
    [payload.id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(400, 'Token malformado');
  }
  return response.rows[0];
};


const findByEmail = async (payload) => {
  const response = await db.query(
    `
    SELECT * FROM users
    WHERE email = $1
  `,
    [payload.email],
  );
  return response.rows[0];
};

const findByHouseNumber = async (house_number) => {
  const response = await db.query(
    `
    SELECT * FROM users
    WHERE house_number = $1
  `,
    [house_number],
  );
  return response.rows;
};

const findById = async (id) => {
  const response = await db.query(
    `
    SELECT id, email, house_number, verify_email, is_admin FROM users
    WHERE id = $1
  `,
    [id],
  );
  return response.rows[0];
};

const usersRepository = { addOne, verifyOne, findByEmail, findByHouseNumber, findById };

export default usersRepository;
