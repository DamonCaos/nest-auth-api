import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role: Role.USER,
    });

    const { password, hashedRefreshToken, ...safeUser } = newUser;

    return {
      message: 'User registered successfully',
      user: safeUser,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.name,
      user.role,
    );

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);

    await this.usersService.updateHashedRefreshToken(
      user.id,
      hashedRefreshToken,
    );

    return {
      message: 'Login successful',
      ...tokens,
    };
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Access denied');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Access denied');
    }

    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.name,
      user.role,
    );

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);

    await this.usersService.updateHashedRefreshToken(
      user.id,
      hashedRefreshToken,
    );

    return tokens;
  }

  async logout(userId: number) {
    await this.usersService.updateHashedRefreshToken(userId, null);

    return {
      message: 'Logout successful',
    };
  }

  private async generateTokens(
    userId: number,
    email: string,
    name: string,
    role: Role,
  ) {
    const payload = {
      sub: userId,
      email,
      name,
      role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<number>('JWT_EXPIRES_IN'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}