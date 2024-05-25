import request from 'supertest';

import { app } from '../../app';

it('returns 404 on non-existent ticket', async () => {
  await request(app)
    .get('/api/tickets/6651f34942008a99f47c895e')
    .send()
    .expect(404);
})

it('returns 200 on existent ticket', async () => {
  const cookie = global.signin();

  const ticketAttrs = {
    title: 'Ticket 1',
    price: 10
  };

  const { body: { id } } = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send(ticketAttrs)
    .expect(201);

  const { body: ticket } = await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(200);

  expect(ticket).toStrictEqual({ id, ...ticketAttrs, userId: "6651f36cdffd592a5c95802d" });
})