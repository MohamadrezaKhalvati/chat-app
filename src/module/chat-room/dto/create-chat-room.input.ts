import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateChatRoomInput {
  @ApiProperty()
  @IsString()
  name: string;
}
