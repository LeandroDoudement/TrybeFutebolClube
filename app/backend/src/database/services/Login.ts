import Users from '../models/Users';

export const findByEmail = async (email: string) =>
  Users.findOne({
    where: { email },
    attributes: { exclude: ['password'] },
  });

export const findByEmailWithPassword = async (email: string) =>
  Users.findOne({
    where: { email },
  });

export const findUser = async (email: string, password: string) =>
  Users.findOne({
    where: { email, password },
  });
