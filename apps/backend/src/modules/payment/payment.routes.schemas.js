import { z } from 'zod/v4';

 const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
 const PAYMENT_REFERENCE_REGEX = /^\d{4}$/;
 const MONTO_REGEX = /^\d+(\.\d{1,2})?$/;

export const createPaymentRouteSchema = {
  params: z.object({}),
  body: z.object({
    date: z
          .string()
          .regex(
            DATE_REGEX,
            'Fecha incorrecta.',
          ),
          payment_reference: z
          .string()
          .regex(
            PAYMENT_REFERENCE_REGEX,
            'Los ultimos 4 digitos del pago.'
          ),
          payment_methods_id: z
          .string()
          .regex(/^\d+$/, 'El ID del método de pago debe ser un número válido'
          ),
          monto: z
          .string()
          .regex(MONTO_REGEX, 'El monto debe ser un número válido')
      }),
  queries: z.object({}),
};

export const updatePaymentRouteSchema = {
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID debe ser un número válido')
  }),
  body: z.object({
    date: z
          .string()
          .regex(
            DATE_REGEX,
            'Fecha incorrecta.',
          ),
          payment_reference: z
          .string()
          .regex(
            PAYMENT_REFERENCE_REGEX,
            'Los ultimos 4 digitos del pago.'
          ),
          monto: z
          .string()
          .regex(
            MONTO_REGEX,
            'Ingresa un monto valido.'
          )}),
  queries: z.object({}),
};
