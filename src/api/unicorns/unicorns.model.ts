import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const Unicorn = z.object({
  name: z.string().min(1),
  age: z.number().min(18),
});

export type Unicorn = z.infer<typeof Unicorn>;
export type UnicornWithId = WithId<Unicorn>;
export const Unicorns = db.collection<Unicorn>('unicorns');
