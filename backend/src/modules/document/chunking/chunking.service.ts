import { Injectable } from '@nestjs/common';

@Injectable()
export class ChunkingService {
  chunkText(text: string, chunkSize = 1000): string[] {
    const cleanedText = text.replace(/\s+/g, ' ').trim();

    const chunks: string[] = [];

    for (let i = 0; i < cleanedText.length; i += chunkSize) {
      chunks.push(
        cleanedText.slice(i, i + chunkSize),
      );
    }

    return chunks;
  }
}