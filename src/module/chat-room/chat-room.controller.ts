import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatRoomService } from './chat-room.service';
import { AddUserToRoomInput } from './dto/add-user-input';
import { CreateChatRoomInput } from './dto/create-chat-room.input';

@Controller('chat-room')
@ApiTags('ChatRoom')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Post('init')
  @ApiOperation({ operationId: 'Create Chat Room' })
  @ApiBody({ type: CreateChatRoomInput })
  @ApiResponse({ status: 201 })
  async createChatRoom(@Body() input: CreateChatRoomInput) {
    return this.chatRoomService.createChatRoom(input);
  }

  @Post(':chatRoomId/add-user')
  @ApiOperation({ operationId: 'Join Chat Room' })
  @ApiBody({ type: AddUserToRoomInput })
  @ApiResponse({ status: 200 })
  async addUserToChatroom(
    @Param('chatRoomId') chatRoomId: string,
    @Body() input: AddUserToRoomInput,
  ) {
    return this.chatRoomService.addUserToChatroom(chatRoomId, input);
  }
}
