import { ObjectId } from 'mongodb';
import * as z from 'zod';

export const ParamsWithId = z.object({
  id: z
    .string()
    .min(1)
    .refine(
      (value) => {
        //we want to make sure it's a valid ObjectId otherwise it will return a 422 (ZodError)
        try {
          return new ObjectId(value);
        } catch (error) {
          return false;
        }
      },
      { message: 'Invalid ObjectId' },
    ),
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;
