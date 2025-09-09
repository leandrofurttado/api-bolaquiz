import { FastifyReply, FastifyRequest } from 'fastify';
import * as userService from '../services/user.service';
import { loginZod } from '../schemas/auth.schema';
import { generateToken } from '../utils/jwt';

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { email, password } = loginZod.parse(request.body);
        
        const user = await userService.loginUser(email, password);
        const token = generateToken({ userId: user.id, email: user.email });

        reply.send({
            token,
            user
        });
    } catch (error) {
        if (error instanceof Error) {
            reply.code(401).send({ message: error.message });
        } else {
            reply.code(500).send({ message: 'Internal server error' });
        }
    }
};
