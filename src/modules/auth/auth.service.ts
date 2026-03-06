import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  register(registerDto: RegisterDto) {
    return {
      message: 'User registered successfully',
      user: {
        id: 1,
        name: registerDto.name,
        email: registerDto.email,
      },
    };
  }

  login(loginDto: LoginDto) {
    return {
      message: 'Login successful',
      accessToken: 'mock-jwt-token',
      user: {
        email: loginDto.email,
      },
    };
  }
}