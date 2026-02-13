import express from 'express';
import { createUserRouteSchema, verifyUserRouteSchema } from './users.routes.schemas.js';
import bcrypt from 'bcrypt';
import usersRepository from './users.repository.js';
import jwt from 'jsonwebtoken';
import nodemailerService from '../../services/nodemailer.js';
import { endpoint } from '../../config/endpoints.js';
const usersRouter = express.Router();

// Buscar usuarios por número de casa
usersRouter.get('/search', async (req, res) => {
  const { house_number } = req.query;
  if (!house_number) {
    return res.status(400).json({ error: 'house_number es requerido' });
  }
  try {
    const users = await usersRepository.findByHouseNumber(house_number);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error buscando usuarios' });
  }
});

usersRouter.post('/', async (req, res) => {
  const body = createUserRouteSchema.body.parse(req.body);
  const passwordHash = await bcrypt.hash(body.passwordHash, 10);
  const newUser = await usersRepository.addOne({
    email: body.email,
    passwordHash,
    house_number: body.house_number,
  });
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, isAdmin: newUser.is_admin },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '10m' },
  );
  await nodemailerService.sendMail({
    from: process.env.EMAIL_USER,
    to: body.email,
    subject: 'Verifica tu correo',
    html: `<a href="${endpoint}/verify/${token}">Verifica tu correo</a>`,
  });

  res.sendStatus(200);
});

usersRouter.patch('/verify', async (req, res) => {
  const body = verifyUserRouteSchema.body.parse(req.body);
  const decodedToken = jwt.verify(body.token, process.env.REFRESH_TOKEN_SECRET);
  await usersRepository.verifyOne({ id: decodedToken.id });
  res.status(200).json({ message: 'Su correo ha sido verificado exitosamente' });
});

export default usersRouter;
