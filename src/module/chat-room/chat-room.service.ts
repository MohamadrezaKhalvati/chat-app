import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddUserToRoomInput } from './dto/add-user-input';
import { CreateChatRoomInput } from './dto/create-chat-room.input';

@Injectable()
export class ChatRoomService {
  constructor(private prisma: PrismaService) {}

  async createChatRoom(input: CreateChatRoomInput) {
    const { name } = input;

    await this.verifyChatRoomIsNotDuplicated(name);

    const chatroom = await this.prisma.chatRoom.create({
      data: {
        name: name,
      },
    });
    return chatroom;
  }

  async addUserToChatroom(chatRoomId: string, addUserDto: AddUserToRoomInput) {
    const chatRoom = await this.prisma.chatRoom.findUnique({
      where: { id: chatRoomId },
      select: {
        members: true,
      },
    });

    if (!chatRoom) {
      throw new NotFoundException('Chat room not found');
    }

    const currentMembers = (chatRoom.members as any[]) || [];

    const isAlreadyMember = currentMembers.some(
      member => member.id === addUserDto.id,
    );

    if (isAlreadyMember) {
      throw new BadRequestException(
        'User is already a member of the chat room',
      );
    }

    const updatedMembers = [
      ...currentMembers,
      { id: addUserDto.id, name: addUserDto.name },
    ];

    const updatedChatRoom = await this.prisma.chatRoom.update({
      where: { id: chatRoomId },
      data: {
        members: {
          set: updatedMembers,
        },
      },
    });

    return updatedChatRoom;
  }

  async verifyChatRoomIsNotDuplicated(name: string) {
    const chatroom = await this.prisma.chatRoom.findFirst({
      where: {
        name: name,
      },
    });

    if (chatroom) {
      throw new BadRequestException('Chatroom Existance with this name');
    }
  }
}
