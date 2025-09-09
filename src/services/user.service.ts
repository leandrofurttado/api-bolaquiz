import prisma from '../prisma/prisma-client';
import { hashPassword, comparePassword } from '../utils/hash';

export const createUser = async (name: string, email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        throw new Error('Email já cadastrado no sistema! Tente outro email.');
    }

    const hashedPassword = await hashPassword(password);
    return prisma.user.create({
        data: { name, email, password: hashedPassword }
    });
};

export const getAllUsers = async () => {
    return prisma.user.findMany();
};

export const getUserById = async (id: string) => {
    return prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (id: string, data: { name?: string; email?: string; password?: string }) => {
    if (data.password) {
        data.password = await hashPassword(data.password);
    }
    return prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: string) => {
    return prisma.user.delete({ where: { id } });
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error('Email ou senha inválidos');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Email ou senha inválidos');
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
