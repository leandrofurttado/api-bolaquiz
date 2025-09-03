import { FastifyInstance } from 'fastify';
import * as userController from '../controllers/user.controller';

export const userRoutes = async (fastify: FastifyInstance) => {
    // Criar usuário
    fastify.post(
        '/users',
        {
            schema: {
                description: 'Cria um novo usuário',
                tags: ['Users'],
                body: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' }
                    }
                },
                response: {
                    201: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            email: { type: 'string' },
                            createdAt: { type: 'string' }
                        }
                    }
                }
            }
        },
        userController.createUser
    );

    // Listar todos os usuários
    fastify.get(
        '/users',
        {
            schema: {
                description: 'Retorna todos os usuários',
                tags: ['Users'],
                response: {
                    200: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                name: { type: 'string' },
                                email: { type: 'string' },
                                createdAt: { type: 'string' }
                            }
                        }
                    }
                }
            }
        },
        userController.getUsers
    );

    // Buscar usuário por ID
    fastify.get(
        '/users/:id',
        {
            schema: {
                description: 'Retorna um usuário pelo ID',
                tags: ['Users'],
                params: {
                    type: 'object',
                    required: ['id'],
                    properties: {
                        id: { type: 'string' }
                    }
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            email: { type: 'string' },
                            createdAt: { type: 'string' }
                        }
                    }
                }
            }
        },
        userController.getUser
    );

    // Atualizar usuário
    fastify.put(
        '/users/:id',
        {
            schema: {
                description: 'Atualiza um usuário pelo ID',
                tags: ['Users'],
                params: {
                    type: 'object',
                    required: ['id'],
                    properties: {
                        id: { type: 'string' }
                    }
                },
                body: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' }
                    }
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            email: { type: 'string' },
                            createdAt: { type: 'string' }
                        }
                    }
                }
            }
        },
        userController.updateUser
    );

    // Deletar usuário
    fastify.delete(
        '/users/:id',
        {
            schema: {
                description: 'Deleta um usuário pelo ID',
                tags: ['Users'],
                params: {
                    type: 'object',
                    required: ['id'],
                    properties: {
                        id: { type: 'string' }
                    }
                },
                response: {
                    204: { type: 'null' }
                }
            }
        },
        userController.deleteUser
    );
};
