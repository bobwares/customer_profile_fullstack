// App: Client Profile Module
// Package: api
// File: __tests__/profile.e2e.test.ts
// Version: 0.0.11
// Author: Bobwares
// Date: 2025-06-08T10:00:00Z
// Description: Integration tests for profile endpoints using Supertest.

import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule]
  }).compile();

  app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe('Profile API', () => {
  it('gets profile', async () => {
    const res = await request(app.getHttpServer()).get('/profile/get');
    expect(res.status).toBe(200);
    expect(res.body.fullName).toBeDefined();
  });

  it('updates profile', async () => {
    const res = await request(app.getHttpServer())
      .post('/profile/update')
      .send({ fullName: 'Jane Doe' });
    expect(res.status).toBe(201);
    expect(res.body.fullName).toBe('Jane Doe');
  });

  it('rejects invalid email', async () => {
    const res = await request(app.getHttpServer())
      .post('/profile/update')
      .send({ email: 'bad' });
    expect(res.status).toBe(400);
  });
});
