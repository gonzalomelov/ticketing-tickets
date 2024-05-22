import { Router, Request, Response } from 'express';

import { requireAuth } from '@gmvticketing/common';

const router = Router();

const createTicketRouteHandler = (req: Request, res: Response) => {
  res.sendStatus(201);
};

router.post('/api/tickets', requireAuth, createTicketRouteHandler);

export { router as createTicketRoute };