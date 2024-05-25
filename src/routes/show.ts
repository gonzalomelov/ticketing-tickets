import { Request, Response, Router } from "express";
import { check } from 'express-validator';

import { validateRequest, NotFoundError } from '@gmvticketing/common';

import { Ticket } from '../models/ticket';

const router = Router();

const requestValidations = [
  check('id')
    .isMongoId()
    .withMessage('Invalid ticket id')
];

const showHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const ticket = await Ticket.findById(id);
  
  if (!ticket) {
    throw new NotFoundError();
  }
  
  res.send(ticket);
};

router.get('/api/tickets/:id', validateRequest(requestValidations), showHandler)

export { router as getTicketRoute }