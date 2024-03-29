import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';
import { findByEmail } from '../services/Login';

dotenv.config();
const { JWT_SECRET } = process.env;
const invalidLoginMessage = 'Invalid email or password';

export const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(401).json({ message: invalidLoginMessage });
  }
  next();
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;
  const databaseEmail = await findByEmail(email);
  if (!databaseEmail) {
    return res.status(401).json({ message: invalidLoginMessage });
  }
  next();
};

export const verifyPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

const verifyToken = (token: string) => verify(token, JWT_SECRET || 'secret');

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const payload = verifyToken(token);
    req.body.data = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};
