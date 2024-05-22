import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { Request } from 'express';

import { generateJwt } from '@gmvticketing/common';

import { app } from '../app';

declare global {
  var signin: () => string[];
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = '123456789';
  
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  
  for (let collection of collections) {
    await collection.deleteMany();
  }
})

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
})

global.signin = () => {
  const user = {
    id: '1',
    email: 'test@test.com'
  }
  
  const jwt = generateJwt({
    id: user.id,
    email: user.email,
  });

  const session = { jwt };

  const base64 = Buffer.from(JSON.stringify(session)).toString('base64');

  return [`session=${base64}`];
}