import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { validateRequest } from '../../middlewares';
import * as UnicornHandlers from './unicorns.handlers';
import { Unicorn } from './unicorns.model';

const router = Router();

router.get('/', UnicornHandlers.findAll);

router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  UnicornHandlers.findOne,
);

router.post('/', validateRequest({ body: Unicorn }), UnicornHandlers.createOne);

router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Unicorn,
  }),
  UnicornHandlers.updateOne,
);

router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  UnicornHandlers.deleteOne,
);

export default router;
