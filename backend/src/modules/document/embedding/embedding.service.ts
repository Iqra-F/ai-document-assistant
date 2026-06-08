import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class EmbeddingService {
  private readonly ollamaUrl = 'http://localhost:11434/api/embed';  // changed from /api/embeddings
  private readonly model = 'all-minilm';  // match exactly what `ollama list` shows

  async getEmbedding(text: string): Promise<number[]> {
    try {
      const response = await fetch(this.ollamaUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.model,
          input: text,  // changed from `prompt` to `input`
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Ollama error: ${response.statusText} - ${errorBody}`);
      }

      const data = await response.json();
      return data.embeddings[0];  // changed from data.embedding
    } catch (error) {
      console.error('Embedding error:', error);
      throw new InternalServerErrorException('Failed to generate embedding');
    }
  }
}