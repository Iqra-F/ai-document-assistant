import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { retry } from 'src/common/utils/retry.util';

@Injectable()
export class EmbeddingService {
  private readonly ollamaUrl = 'http://localhost:11434/api/embed';
  private readonly model = 'all-minilm';

  async getEmbedding(text: string): Promise<number[]> {
    return retry(async () => {
      const response = await fetch(this.ollamaUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          input: text,
        }),
      });

      if (!response.ok) {
        throw new Error('Embedding generation failed');
      }

      const data = await response.json();

      return data.embeddings[0];
    });
  }
}