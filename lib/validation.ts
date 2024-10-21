import { z } from 'zod';

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, {
      message: 'O nome deve ter pelo menos 2 caracteres.',
    })
    .max(50, {
      message: 'O nome deve ter no máximo 50 caracteres.',
    }),
  email: z.string().email({
    message: 'Insira um email válido.',
  }),
  phone: z
    .string()
    .refine(
      (phone) =>
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(
          phone
        ),
      {
        message: 'Insira um telefone válido.',
      }
    ),
});
