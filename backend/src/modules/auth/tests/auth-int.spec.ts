import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import * as bcrypt from 'bcrypt';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { AppModule } from '../../../app.module.js';
import { PrismaProvider } from '../../../prisma/prisma.provider.js';

describe('Auth API (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaProvider;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();

    prisma = app.get(PrismaProvider);
    jwtService = app.get(JwtService);

    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/register', () => {
    it('should register a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          username: 'tester',
        })
        .expect(201);

      const user = await prisma.user.findUnique({
        where: { email: 'test@example.com' },
      });

      expect(user).not.toBeNull();
      expect(user?.email).toBe('test@example.com');
      expect(user?.username).toBe('tester');

      expect(user?.password).not.toBe('password123');
      expect(await bcrypt.compare('password123', user!.password)).toBe(true);

      expect(response.body.accessToken).toBeDefined();
      expect(response.body.user).toBeDefined();
      expect(response.body.user.password).toBeUndefined();
    });

    it('should reject registration with an existing email', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(201);

      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password456',
        })
        .expect(409);
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          username: 'tester',
        })
        .expect(201);
    });

    it('should login a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(201);

      expect(response.body.accessToken).toBeDefined();
      expect(response.body.user.email).toBe('test@example.com');
      expect(response.body.user.password).toBeUndefined();

      const payload = await jwtService.verifyAsync(response.body.accessToken);

      expect(payload.sub).toBe(response.body.user.id);
    });

    it('should reject login with an incorrect password', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrong-password',
        })
        .expect(401);
    });

    it('should reject login for a non-existing user', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'unknown@example.com',
          password: 'password123',
        })
        .expect(401);
    });
  });
});
