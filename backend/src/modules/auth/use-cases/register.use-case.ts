import { ConflictException, Injectable } from '@nestjs/common';

import { hash } from 'bcrypt';
import { Prisma } from '../../../generated/prisma/client.js';

import { UserDao } from '../../users/dao/user.dao.js';
import { RegisterInputDto } from 'shared';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userDao: UserDao,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: RegisterInputDto) {
    const existingUser = await this.userDao.findByEmail(input.email);

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const hashedPassword = await hash(input.password, 12);

    let user;

    try {
      user = await this.userDao.create({
        email: input.email,
        password: hashedPassword,
        username: input.username,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Email is already registered');
      }

      throw error;
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      username: user.username,  
    });

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }
}
