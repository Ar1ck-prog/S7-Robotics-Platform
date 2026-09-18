import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export type UserRole = 'student' | 'mentor';

@Entity('users')
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({ type: 'varchar' })
  role!: UserRole;

  @Column({ default: 1 })
  level!: number;

  @Column({ default: 0 })
  xp!: number;

  @Column({ default: 1 })
  streak!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
