import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

export function setupErrorHandler(app: FastifyInstance) {
    app.setErrorHandler((error: unknown, _request: FastifyRequest, reply: FastifyReply) => {

        // Erro de validação do Zod
        if (error instanceof ZodError) {
            return reply.code(400).send({
                mensagem: 'Dados inválidos. Verifique os campos enviados.',
                detalhes: error.errors.map(err => ({
                    campo: err.path.join('.'),
                    mensagem: err.message,
                })),
            });
        }

        // Erros do Prisma
        if (typeof error === 'object' && error !== null && 'code' in error) {
            const prismaError = error as { code: string; meta?: any };

            switch (prismaError.code) {
                case 'P2002': // unique constraint
                    return reply.code(400).send({
                        mensagem: 'Já existe um registro com este valor único.',
                        detalhe: prismaError.meta?.target ? `Campo: ${prismaError.meta.target}` : undefined,
                    });

                case 'P2025': // registro não encontrado para update/delete
                    return reply.code(404).send({
                        mensagem: 'Registro não encontrado.',
                    });

                case 'P2003': // foreign key constraint
                    return reply.code(400).send({
                        mensagem: 'Não é possível criar/atualizar registro: violação de chave estrangeira.',
                        detalhe: prismaError.meta,
                    });

                case 'P2000': // valor muito grande para coluna
                    return reply.code(400).send({
                        mensagem: 'O valor fornecido é muito grande para o campo.',
                        detalhe: prismaError.meta,
                    });

                default:
                    return reply.code(500).send({
                        mensagem: 'Erro no banco de dados.',
                        detalhe: prismaError.meta,
                    });
            }
        }
        
        return reply.code(500).send({
            mensagem: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        });
    });
}
