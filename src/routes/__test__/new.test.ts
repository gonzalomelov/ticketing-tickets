import request from 'supertest';

import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('has a route handler listening on /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({});
  
  expect(response.status).not.toEqual(404);
})

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
})

it('returns a status other than 401 if the user is signed in', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({});

  expect(response.status).not.toEqual(401);
})

it('returns an error if an invalid title is provided', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 10
    })
    .expect(400);

  expect(response.body).toStrictEqual({"errors": [{"field": "title", "message": "Title is required"}]});
})

it('returns an error if an invalid price is provided', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Ticket 1',
      price: -10
    })
    .expect(400);

  expect(response.body).toStrictEqual({"errors": [{"field": "price", "message": "Price must be greater than 0"}]});
})

it('creates a ticket with valid inputs', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toBe(0);

  const cookie = global.signin();

  const title = 'Ticket 1';
  const price = 10;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title, price })
    .expect(201);

  expect(response.body.title).toEqual(title);
  expect(response.body.price).toEqual(price);

  tickets = await Ticket.find({});
  expect(tickets.length).toBe(1);
  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].price).toEqual(price);
})