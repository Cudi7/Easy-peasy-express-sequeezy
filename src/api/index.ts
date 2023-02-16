import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import unicorns from './unicorns/unicorns.routes';
import users from './users/users.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '👋 Welcome to easy peasy express squezzy starter API! 🌎🌍🌏',
  });
});

router.use('/unicorns', unicorns);
router.use('/users', users);

export default router;
