import { z } from 'zod';

// Dados para criar usuário
export const createUserZod = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
});

// Dados para atualizar usuário
export const updateUserZod = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
});

// Parâmetro ID
export const userIdParamZod = z.object({
    id: z.string(),
});
