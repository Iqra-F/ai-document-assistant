import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  async ask(question: string) {
    return {
      question,
      message: 'Chat endpoint working',
    };
  }
}