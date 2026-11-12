import { ApiProperty } from '@nestjs/swagger';

export class RegisterValidationFailedDto {
  @ApiProperty({
    example: [
      'email: Invalid input: expected string, received undefined',
      'password: Invalid input: expected string, received undefined',
    ],
    type: [String],
  })
  message!: string[];

  @ApiProperty({
    example: 'Bad Request',
  })
  error!: string;

  @ApiProperty({
    example: 400,
  })
  statusCode!: number;
}

export class LoginValidationFailedDto {
  @ApiProperty({
    example: [
      'email: Invalid input: expected string, received undefined',
      'password: Invalid input: expected string, received undefined',
    ],
    type: [String],
  })
  message!: string[];

  @ApiProperty({ example: 'Bad Request' })
  error!: string;

  @ApiProperty({ example: 400 })
  statusCode!: number;
}
