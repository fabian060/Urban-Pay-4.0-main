import { z } from 'zod/v4';
import { cuotaSchema } from './cuotas.schemas.js';

const cuotaIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un numero');

export const createCuotaRouteSchema = {
  params: z.object({}),
  body: cuotaSchema.omit({ id: true, house_number: true }),
  queries: z.object({}),
};

export const deleteCuotaRouteSchema = {
  params: z.object({ id: cuotaIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};

export const updateCuotaRouteSchema = {
  params: z.object({ id: cuotaIdSchema }),
  body: cuotaSchema.omit({ id: true }),
  queries: z.object({}),
};
