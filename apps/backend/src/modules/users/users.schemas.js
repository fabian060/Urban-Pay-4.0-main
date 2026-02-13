import { z } from 'zod/v4';

export const userSchema = z.object({
  id: z.number(),
  email: z.email(),
  passwordHash: z.string(),
  house_number: z.string()
    .regex(/^[A-Z]-\d{2,3}$/, 'El número de casa debe tener el formato: Letra mayúscula-guion-números (ej: Q-###)'),
  verify_email: z.boolean().optional(),
  is_admin: z.boolean().optional(),
});
