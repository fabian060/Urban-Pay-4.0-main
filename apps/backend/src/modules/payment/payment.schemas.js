import { z } from 'zod';

export const paymentSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha invalida'),
  payment_reference: z.string().regex(/^\d{4}$/, 'Datos invalidos'),
  payment_methods_id: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Monto invalido')
});

export const paymentResponseSchema = z.object({
  id: z.number(),
  date: z.string(),
  payment_reference: z.string(),
  monto : z.string()
});
