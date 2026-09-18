import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  read() {
    return { ok: true, service: 's7-robotics-api' };
  }
}
