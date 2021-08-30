import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Message } from 'src/db/models/message.entity';
import { User } from 'src/db/models/user.entity';
import { RepoService } from 'src/repo.service';
import { DeleteMessageInput, MessageInput } from './input/message.input';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return this.repoService.messageRepo.find();
  }
  @Query(() => Message, { nullable: true })
  public async getMessagesFromUser(
    @Args('userId') userId: number,
  ): Promise<Message[]> {
    return this.repoService.messageRepo.find({
      where: { userId },
    });
  }

  @Query(() => Message, { nullable: true })
  public async getMessage(@Args('id') id: number): Promise<Message> {
    return this.repoService.messageRepo.findOne(id);
  }

  @Mutation(() => Message)
  public async createMessage(
    @Args('data') input: MessageInput,
  ): Promise<Message> {
    const message = this.repoService.messageRepo.create({
      userId: input.userId,
      content: input.content,
    });

    return this.repoService.messageRepo.save(message);
  }

  @Mutation(() => Message)
  public async deleteMessage(
    @Args('data') { id, userId }: DeleteMessageInput,
  ): Promise<Message> {
    const message = await this.repoService.messageRepo.findOne(id);

    if (!message || message.userId !== userId)
      throw new Error('message not exists or you not are the message author');

    const copy = { ...message };

    this.repoService.messageRepo.remove(message);

    return copy;
  }

  @ResolveField(() => User, { name: 'user' })
  public async getUser(@Parent() parent: Message): Promise<User> {
    return this.repoService.userRepo.findOne(parent.userId);
  }
}
