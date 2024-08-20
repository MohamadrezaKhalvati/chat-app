import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendMessageInput } from './dto/send-message.input';
import { MessageService } from './message.service';

@Controller('message')
@ApiTags('Message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  @ApiOperation({ operationId: 'Send message' })
  @ApiBody({ type: SendMessageInput })
  @ApiResponse({ status: 200 })
  async sendMessage(@Body() input: SendMessageInput) {
    return await this.messageService.sendMessage(input);
  }

  @Get(':roomId')
  @ApiOperation({ operationId: 'Get Room Messages' })
  @ApiResponse({ status: 200 })
  async getMessages(@Param('roomId') roomId: string) {
    return this.messageService.getMessagesByRoomId(roomId);
  }
}
