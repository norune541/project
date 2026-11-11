import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { beforeAll, beforeEach, afterAll, describe, it, expect } from 'vitest';

import { UsersModule } from '../users.module.js';
import { PrismaProvider } from '../../../prisma/prisma.provider.js';
import { databaseGuard } from '../../../prisma/database.guard.js';

describe('Users API (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaProvider;

  beforeAll(async () => {
    databaseGuard();
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();

    prisma = app.get(PrismaProvider);
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    if (prisma) {
      await prisma.user.deleteMany();
    }

    if (app) {
      await app.close();
    }
  });

  describe('GET /users/:id', () => {
    it('should return a user by id', async () => {
      const createdUser = await prisma.user.create({
        data: {
          email: 'test@example.com',
          username: 'Test User',
          password: 'password',
        },
      });

      const response = await request(app.getHttpServer())
        .get(`/users/${createdUser.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: createdUser.id,
        email: 'test@example.com',
        username: 'Test User',
      });
    });

    it('should return null if user does not exist', async () => {
      const nonExistingId = crypto.randomUUID();

      const response = await request(app.getHttpServer())
        .get(`/users/${nonExistingId}`)
        .expect(200);

      expect(response.text).toBe('');
    });
  });

  describe('POST /users', () => {
    it('should return the create user placeholder', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test@example.com',
          username: 'Test User',
        })
        .expect(201);

      expect(response.text).toBe('This action adds a new user');
    });
  });

  describe('GET /users', () => {
    it('should return the find all placeholder', async () => {
      const response = await request(app.getHttpServer()).get('/users').expect(200);

      expect(response.text).toBe('This action returns all users');
    });
  });

  describe('PATCH /users/:id', () => {
    it('should return the update placeholder', async () => {
      const response = await request(app.getHttpServer())
        .patch('/users/1')
        .send({
          username: 'Updated User',
        })
        .expect(200);

      expect(response.text).toBe('This action updates a #1 user');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should return the remove placeholder', async () => {
      const response = await request(app.getHttpServer()).delete('/users/1').expect(200);

      expect(response.text).toBe('This action removes a #1 user');
    });
  });
});
