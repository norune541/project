import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller.js';
import { PostsDao } from './dao/posts.dao.js';
import { PostsUseCase } from './use-cases/posts.use-case.js';

@Module({
  controllers: [PostsController],
  providers: [PostsDao, PostsUseCase],
})
export class PostsModule {}
