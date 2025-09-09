import { z } from 'zod';

// Login schema
export const loginZod = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Token response schema
export const tokenResponseZod = z.object({
    token: z.string(),
    user: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        createdAt: z.date(),
    }),
});
