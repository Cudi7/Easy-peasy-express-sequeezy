import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { validateRequest } from '../../middlewares';
import * as UsersHandlers from './users.handlers';
import { User } from './users.model';

const router = Router();

router.get('/', UsersHandlers.findAll);

router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  UsersHandlers.findOne,
);

router.post('/', validateRequest({ body: User }), UsersHandlers.createOne);

router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: User,
  }),
  UsersHandlers.updateOne,
);

router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  UsersHandlers.deleteOne,
);

export default router;
