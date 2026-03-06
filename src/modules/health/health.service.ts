import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth() {
    return {
      status: 'ok',
      service: 'nest-auth-api',
      timestamp: new Date().toISOString(),
    };
  }
}