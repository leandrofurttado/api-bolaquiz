import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken, extractTokenFromHeader, JwtPayload } from '../utils/jwt';

// Extend FastifyRequest to include user property
declare module 'fastify' {
    interface FastifyRequest {
        user?: JwtPayload;
    }
}

export const authenticateToken = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const authHeader = request.headers.authorization;
        const token = extractTokenFromHeader(authHeader);
        const payload = verifyToken(token);
        
        request.user = payload;
    } catch (error) {
        reply.code(401).send({ message: 'Unauthorized: Invalid or missing token' });
    }
};
