import { Controller, Get } from '@nestjs/common';

@Controller('mentor')
export class MentorController {
  @Get('overview')
  overview() {
    return {
      reviewQueue: 7,
      activeStudents: 48,
      averageProgress: 71,
      riskStudents: 5,
      groups: [
        { name: 'Arduino A1', progress: 68, pending: 3 },
        { name: 'SPIKE Junior', progress: 77, pending: 2 },
        { name: 'ESP32 IoT', progress: 86, pending: 2 }
      ],
      feedbackTemplates: [
        'Проверь подключение GND и питание датчика.',
        'Добавь Serial output, чтобы доказать измерения.',
        'Опиши тест минимум на трех расстояниях.'
      ]
    };
  }
}
