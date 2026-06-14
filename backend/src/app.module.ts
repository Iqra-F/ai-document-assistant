import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentModule } from './modules/document/document.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './modules/chat/chat.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    DocumentModule,
    PrismaModule,
    ChatModule,
    ThrottlerModule.forRoot([
      {
        ttl: 120000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //global rate limit guard
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule {}