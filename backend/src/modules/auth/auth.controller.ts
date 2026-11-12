import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { RegisterUseCase } from './use-cases/register.use-case.js';
import { LoginUseCase } from './use-cases/login.use-case.js';
import { LogoutUseCase } from './use-cases/logout.use-case.js';

import { registerSchema, loginSchema, type RegisterInputDto, type LoginInputDto } from 'shared';

import { JwtAuthGuard } from './guards/jwt.guard.js';
import { CurrentUser, type AuthenticatedUser } from './decorators/current-user.decorator.js';

import { AuthResponseDto, UserResponseDto } from './dto/auth.response.js';
import { UnauthorizedResponseDto } from './dto/auth.response.js';
import {
  RegisterValidationFailedDto,
  LoginValidationFailedDto,
} from './dto/validation.response.js';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Post('register')
  @ApiOkResponse({ type: AuthResponseDto })
  @ApiBadRequestResponse({ type: RegisterValidationFailedDto })
  register(@Body({ schema: registerSchema }) body: RegisterInputDto) {
    return this.registerUseCase.execute(body);
  }

  @Post('login')
  @ApiOkResponse({ type: AuthResponseDto })
  @ApiBadRequestResponse({ type: LoginValidationFailedDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  login(@Body({ schema: loginSchema }) body: LoginInputDto) {
    return this.loginUseCase.execute(body);
  }

  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @UseGuards(JwtAuthGuard)
  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@CurrentUser() user: AuthenticatedUser) {
    await this.logoutUseCase.execute(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiOkResponse({ type: UserResponseDto })
  @Get('me')
  me(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }
}
