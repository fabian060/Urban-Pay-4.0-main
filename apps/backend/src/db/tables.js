import db from './index.js';

const createUsersTable = async () => {
  await db.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      passwordhash TEXT NOT NULL,
      verify_email BOOLEAN DEFAULT false,
      house_number TEXT NOT NULL,
      is_admin BOOLEAN DEFAULT false
    )
  `);
  console.log('Tabla de usuarios creada');
};

const createCuotasTable = async () => {
  await db.query(`
    CREATE TABLE cuotas (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    date TIMESTAMPTZ DEFAULT NOW(),
    date_limit TIMESTAMPTZ NOT NULL,
    monto NUMERIC NOT NULL,
    house_number TEXT NOT NULL
    )
  `);
  console.log('Tabla de cuotas creada');
};

const createPaymentMethodsTable = async () => {
  await db.query(`
    CREATE TABLE payment_methods (
    id SERIAL PRIMARY KEY,
    bank TEXT NOT NULL,
    phone TEXT NOT NULL,
    ci TEXT NOT NULL
    )
  `);
  console.log('Tabla de metodos de pagos creada');
};

const createPaymentTable = async () => {
  await db.query(`
    CREATE TABLE payment (
      id SERIAL PRIMARY KEY,
      date TIMESTAMPTZ DEFAULT NOW(),
      payment_reference TEXT,
      cuota_id INTEGER NOT NULL REFERENCES cuotas(id) ON DELETE CASCADE,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE SET NULL,
      payment_methods_id INTEGER NOT NULL REFERENCES payment_methods(id) ON DELETE SET NULL,
      status VARCHAR(20) DEFAULT 'pending',
      monto NUMERIC NOT NULL
    )
  `);
  console.log('Tabla de pagos creada');
};

const deleteAllTables = async () => {
  await db.query('DROP TABLE IF EXISTS payment');
  await db.query('DROP TABLE IF EXISTS payment_methods');
  await db.query('DROP TABLE IF EXISTS cuotas');
  await db.query('DROP TABLE IF EXISTS users');
};

const createTables = async () => {
  await deleteAllTables();
  await createUsersTable();
  await createCuotasTable();
  await createPaymentMethodsTable();
  await createPaymentTable();
  console.log('Tablas creadas correctamente');
  process.exit();
};

createTables();
