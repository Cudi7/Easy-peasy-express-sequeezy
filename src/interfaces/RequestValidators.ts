import { AnyZodObject } from 'zod';

export default interface RequestValidators {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
}
