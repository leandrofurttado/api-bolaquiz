import { FastifyReply, FastifyRequest } from 'fastify';
import * as userService from '../services/user.service';
import { createUserZod, updateUserZod, userIdParamZod } from '../schemas/user.schema';


export const getUsers = async (_request: FastifyRequest, reply: FastifyReply) => {
    const users = await userService.getAllUsers();
    reply.send(users);
};

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, email, password } = createUserZod.parse(request.body);
    const user = await userService.createUser(name, email, password);
    reply.code(201).send(user);
};

export const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = userIdParamZod.parse(request.params);
    const data = updateUserZod.parse(request.body);
    const user = await userService.updateUser(id, data);
    reply.send(user);
};

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = userIdParamZod.parse(request.params);
    const user = await userService.getUserById(id);
    if (!user) return reply.code(404).send({ message: 'User not found' });
    reply.send(user);
};

export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = userIdParamZod.parse(request.params);
    await userService.deleteUser(id);
    reply.code(204).send();
};
