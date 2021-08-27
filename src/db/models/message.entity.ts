import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@ObjectType()
@Entity({ name: 'messages' })
export class Message {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column({ name: 'user_id' })
  userId: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => User)
  user: User;

  // Associations
  @ManyToOne(() => User, (user) => user.messageConnection, { primary: true })
  @JoinColumn({ name: 'user_id' })
  userConnection: Promise<User>;
}
