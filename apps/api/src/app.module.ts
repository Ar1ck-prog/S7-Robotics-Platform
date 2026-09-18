import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { HealthController } from './health.controller';
import { CompilerController } from './compiler/compiler.controller';
import { MentorController } from './mentor/mentor.controller';
import { UserEntity } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'change_me_for_production',
      signOptions: { expiresIn: '8h' }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production'
    }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AuthController, HealthController, MentorController, CompilerController],
  providers: [AuthService]
})
export class AppModule {}
