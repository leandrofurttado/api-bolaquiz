import { FastifyInstance } from 'fastify';
import * as authController from '../controllers/auth.controller';

export const authRoutes = async (fastify: FastifyInstance) => {
    // Login endpoint
    fastify.post(
        '/login',
        {
            schema: {
                description: 'Login de usuário com email e senha',
                tags: ['Authentication'],
                body: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { 
                            type: 'string', 
                            format: 'email',
                            description: 'Endereço de email do usuário'
                        },
                        password: { 
                            type: 'string', 
                            minLength: 6,
                            description: 'Senha do usuário (mínimo 6 caracteres)'
                        }
                    }
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            token: { 
                                type: 'string',
                                description: 'Token de acesso JWT'
                            },
                            user: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    name: { type: 'string' },
                                    email: { type: 'string' },
                                    createdAt: { type: 'string', format: 'date-time' }
                                }
                            }
                        }
                    },
                    401: {
                        type: 'object',
                        properties: {
                            message: { type: 'string' }
                        }
                    }
                }
            }
        },
        authController.login
    );
};
