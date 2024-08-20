import { Module } from '@nestjs/common';
import { ChatRoomModule } from './module/chat-room/chat-room.module';
import { MessageModule } from './module/message/message.module';
import { PrismaModule } from './module/prisma/prisma.module';

@Module({
  imports: [PrismaModule, ChatRoomModule, MessageModule],
})
export class AppModule {}
