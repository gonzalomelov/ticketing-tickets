import { Router, Request, Response, NextFunction } from 'express';
import { body} from 'express-validator';

import { requireAuth, validateRequest } from '@gmvticketing/common';

const router = Router();

const validateInputs = validateRequest([
  body('title')
    .notEmpty()
    .withMessage('Title is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0')
])

const createTicketRouteHandler = (req: Request, res: Response) => {
  res.sendStatus(201);
};

router.post('/api/tickets', requireAuth, validateInputs, createTicketRouteHandler);

export { router as createTicketRoute };