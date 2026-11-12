import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: 'af3441c0-a8f7-48c8-b565-884375f17734',
  })
  id!: string;

  @ApiProperty({ example: 'atest@example.com' })
  email!: string;

  @ApiProperty({ example: 'cool' })
  username!: string;
}

export class AuthResponseDto {
  @ApiProperty({ type: () => UserResponseDto })
  user!: UserResponseDto;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;
}

export class UnauthorizedResponseDto {
  @ApiProperty({ example: 'Invalid email or password' })
  message!: string;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;

  @ApiProperty({ example: 401 })
  statusCode: number;
}
