import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentModule } from './modules/document/document.module';
import { PrismaModule } from './prisma/prisma.module';
import { RetrievalService } from './modules/chat/retrieval/retrieval.service';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [DocumentModule, PrismaModule, ChatModule],
  controllers: [AppController],
  providers: [AppService, RetrievalService],
})
export class AppModule {}
