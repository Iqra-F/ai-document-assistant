import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { RetrievalService } from './retrieval/retrieval.service';
import { DocumentModule } from '../document/document.module';
import { LlmService } from './llm/llm.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService,RetrievalService, LlmService],
  imports: [DocumentModule]
})
export class ChatModule {}
