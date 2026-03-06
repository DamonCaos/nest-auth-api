import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  create(userData: User) {
    this.users.push(userData);
    return userData;
  }

  findAll() {
    return this.users.map(({ password, ...user }) => user);
  }
}