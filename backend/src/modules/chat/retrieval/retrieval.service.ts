import { Injectable } from '@nestjs/common';
import cosineSimilarity from 'compute-cosine-similarity';

@Injectable()
export class RetrievalService {
  findRelevantChunks(
    queryEmbedding: number[],
    chunks: {
      content: string;
      embedding: number[];
    }[],
    limit = 3,
  ) {
   return chunks
  .map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(
      queryEmbedding,
      chunk.embedding,
    ),
  }))
  .filter(
    (chunk): chunk is typeof chunk & { score: number } =>
      chunk.score !== null,
  )
  .sort((a, b) => b.score - a.score)
  .slice(0, limit);
}
}