import express from 'express';
import paymentRepository from './payment.repository.js';
import {
  createPaymentRouteSchema,
  updatePaymentRouteSchema
} from './payment.routes.schemas.js';
const paymentRouter = express.Router();

paymentRouter.post('/', async (req, res) => {
  const user = req.user;
  const body = createPaymentRouteSchema.body.parse(req.body);
  const newPayment = await paymentRepository.addPayment({ 
    ...body, 
    userId: user.id 
  });
  res.json(newPayment);
});

paymentRouter.get('/', async (req, res) => {
  const user = req.user;
  const { user_id } = req.query;

  if (user_id && user.is_admin) {
    // Admin can view payments for a specific user
    const payments = await paymentRepository.getAllByUser(user_id);
    res.json(payments);
  } else {
    // Both admin and regular users see only payments from their own house
    const payments = await paymentRepository.getAllByHouse(user.house_number);
    res.json(payments);
  }
});

paymentRouter.get('/:id', async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const payment = await paymentRepository.getById(id, user.id);
  if (!payment) {
    return res.status(404).json({ error: 'Pago no encontrado' });
  }
  res.json(payment);
});

paymentRouter.put('/:id', async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const body = updatePaymentRouteSchema.body.parse(req.body);
  const updatedPayment = await paymentRepository.updatePayment(
    id, 
    user.id, 
    body
  );
  res.json(updatedPayment);
});

paymentRouter.delete('/:id', async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  await paymentRepository.deletePayment(id, user.id);
  res.status(204).send();
});

// Nueva ruta para actualizar el estado del pago
paymentRouter.patch('/:id/status', async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { status } = req.body;
  
  if (!user.is_admin) {
    return res.status(403).json({ error: 'Acción no autorizada. Solo los administradores pueden cambiar el estado de un pago.' });
  }

  // Validar que el status sea válido
  if (!['pending', 'accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Estado inválido. Debe ser: pending, accepted o rejected' });
  }
  
  try {
    const updatedPayment = await paymentRepository.updatePaymentStatus(id, status);
    res.json(updatedPayment);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});




export default paymentRouter;
