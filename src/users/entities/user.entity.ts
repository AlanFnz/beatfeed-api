import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'varchar', unique: true, length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  displayName: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  profilePicture: string | null;
}
