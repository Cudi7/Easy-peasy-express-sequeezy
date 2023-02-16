import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

const RoleEnum = z.enum(['rider', 'hero', 'admin']);

export const User = z.object({
  name: z.string().min(1).max(40),
  email: z.string().email(),
  password: z.string().min(6).max(30),
  role: z.string().default(RoleEnum.enum.rider).optional(),
});

export type User = z.infer<typeof User>;
export type UserWithId = WithId<User>;
export const Users = db.collection<User>('users');
