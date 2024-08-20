import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { SendMessageInput } from './dto/send-message.input';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(input: SendMessageInput) {
    const { senderId, roomId } = input;
    await this.verifyChatRoomExistance(roomId);
    await this.verifySenderIdExistance(senderId, roomId);

    const message = await this.prisma.message.create({
      data: {
        content: input.content,
        senderId: senderId,
        roomId: roomId,
      },
    });

    return message;
  }

  async getMessagesByRoomId(roomId: string) {
    await this.verifyChatRoomExistance(roomId);

    const messags = this.prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: 'asc' },
    });

    return messags;
  }

  private async verifyChatRoomExistance(id: string) {
    const room = await this.prisma.chatRoom.findFirst({
      where: {
        id,
      },
    });
    if (!room) {
      throw new NotFoundError('ChatRoom with this id not found');
    }
  }

  private async verifySenderIdExistance(id: string, roomId: string) {
    const user = await this.prisma.member.findFirst({
      where: {
        chatRoomId: roomId,
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundError('user with this id not found');
    }
  }
}
