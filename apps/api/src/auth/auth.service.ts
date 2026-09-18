import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './dto';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly users: Repository<UserEntity>,
    private readonly jwt: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();
    if (dto.role === 'mentor' && dto.mentorCode !== (process.env.MENTOR_INVITE_CODE || 's7mentor2026')) {
      throw new BadRequestException('Invalid mentor invite code');
    }
    const exists = await this.users.findOne({ where: { email } });
    if (exists) throw new BadRequestException('Email is already registered');
    const user = this.users.create({
      name: dto.name.trim(),
      email,
      passwordHash: await bcrypt.hash(dto.password, 10),
      role: dto.role,
      level: dto.role === 'student' ? 1 : 0,
      xp: 0,
      streak: dto.role === 'student' ? 1 : 0
    });
    await this.users.save(user);
    return this.issueToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.users.findOne({ where: { email: dto.email.trim().toLowerCase() } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return this.issueToken(user);
  }

  private issueToken(user: UserEntity) {
    const { passwordHash: _passwordHash, ...safeUser } = user;
    return {
      accessToken: this.jwt.sign({ sub: user.id, role: user.role, email: user.email }),
      user: safeUser
    };
  }
}
