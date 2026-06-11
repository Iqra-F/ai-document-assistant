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
//return a dummy response for now, we will implement the actual logic later