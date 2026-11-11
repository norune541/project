import { Injectable } from '@nestjs/common';
import { PostsDao } from '../dao/posts.dao.js';

@Injectable()
export class PostsUseCase {
  constructor(private readonly postsDao: PostsDao) {}
}
