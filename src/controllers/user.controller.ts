import { FastifyReply, FastifyRequest } from 'fastify';
import * as userService from '../services/user.service';

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    // Pega os dados diretamente do body
    const { name, email, password } = request.body as { name: string; email: string; password: string };
    const user = await userService.createUser(name, email, password);
    reply.code(201).send(user);
};

export const getUsers = async (_request: FastifyRequest, reply: FastifyReply) => {
    const users = await userService.getAllUsers();
    reply.send(users);
};

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const user = await userService.getUserById(id);
    if (!user) return reply.code(404).send({ message: 'User not found' });
    reply.send(user);
};

export const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const data = request.body as { name?: string; email?: string; password?: string };
    const user = await userService.updateUser(id, data);
    reply.send(user);
};

export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    await userService.deleteUser(id);
    reply.code(204).send();
};
