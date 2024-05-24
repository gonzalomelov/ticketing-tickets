import { Router, Request, Response } from 'express';
import { body} from 'express-validator';

import { requireAuth, validateRequest } from '@gmvticketing/common';

import { Ticket } from '../models/ticket';

const router = Router();

const requestValidations = [
  body('title')
    .notEmpty()
    .withMessage('Title is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0')
]

const createTicketRouteHandler = async (req: Request, res: Response) => {
  const { title, price } = req.body;
  
  const ticket = Ticket.build({ title, price, userId: req.currentUser!.id })

  await ticket.save();

  res.status(201).send(ticket);
};

router.post('/api/tickets', requireAuth, validateRequest(requestValidations), createTicketRouteHandler);

export { router as createTicketRoute };