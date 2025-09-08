import { FastifyInstance } from 'fastify';

export const registerErrorHandlers = (app: FastifyInstance) => {
    app.setNotFoundHandler((request, reply) => {
        reply.code(404).send({ message: 'Essa rota não existe! Chamada inválida.' });
    });

    app.setErrorHandler((error, request, reply) => {
        const statusCode = error.statusCode ?? 500;
        const message = error.message ?? 'Erro interno do servidor';
        reply.code(statusCode).send({ error: message });
    });

};
