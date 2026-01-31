import { z } from 'zod/v4';

const DESCRIPTION_REGEX = /^(?!\s*$).+$/;
const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const DATE_LIMIT_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const MONTO_REGEX = /^\d+(\.\d{1,2})?$/;
const HOUSE_NUMBER_REGEX = /^(?!\s*$).+$/;

export const cuotaSchema = z.object({
  id: z.number(),
  description: z.string().regex(DESCRIPTION_REGEX, 'La descripcion no es valido.'),
  date: z.string().regex(DATE_REGEX, 'Tiene que ser en formato YYYY-MM-DD'),
  date_limit: z.string().regex(DATE_LIMIT_REGEX, 'Tiene que ser en formato YYYY-MM-DD'),
  monto: z.string().regex(MONTO_REGEX, 'El monto debe ser un número decimal válido.'),
  house_number: z.string().regex(HOUSE_NUMBER_REGEX, 'House number is required'),
});
