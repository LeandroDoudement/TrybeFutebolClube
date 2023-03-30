import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { findByEmailWithPassword } from '../services/Login';

dotenv.config();
const { JWT_SECRET } = process.env;

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findByEmailWithPassword(email);
  const userPassword = await compare(password, user?.password as string);
  if (!userPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const payload = user
    ? { id: user.id, email: user.email, password: user.password }
    : {};
  const token = sign(payload, JWT_SECRET || 'secret', {
    expiresIn: '1h',
  });
  return res.status(200).json({ token });
};

export default login;
