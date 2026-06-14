import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AskQuestionDto } from './dto/ask-question.dto';
import { Throttle } from '@nestjs/throttler/dist/throttler.decorator';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
  ) {}
@Throttle({
  default: {
    limit: 10,
    ttl: 120000,
  },
})
  @Post('ask')
  async ask(
    @Body() dto: AskQuestionDto,
  ) {
    return this.chatService.ask(
      dto.question,
    );
  }
}