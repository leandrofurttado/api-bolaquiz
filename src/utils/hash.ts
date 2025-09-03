import bcrypt from 'bcryptjs';

/* Utilitario para hash de senhas do projeto (Cria hash e compara a hash) */

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};
