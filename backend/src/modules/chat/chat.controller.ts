import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AskQuestionDto } from './dto/ask-question.dto';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
  ) {}

  @Post('ask')
  async ask(
    @Body() dto: AskQuestionDto,
  ) {
    return this.chatService.ask(
      dto.question,
    );
  }
}