import request from 'supertest';

import { app } from '../../app';

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
