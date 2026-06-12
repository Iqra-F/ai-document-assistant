import { Injectable } from '@nestjs/common';
import { RetrievalService } from './retrieval/retrieval.service';
import { EmbeddingService } from '../document/embedding/embedding.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LlmService } from './llm/llm.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly embeddingService: EmbeddingService,
    private readonly retrievalService: RetrievalService,
    private readonly llmService: LlmService,
  ) {}
  async ask(question: string) {
  const queryEmbedding =
    await this.embeddingService.getEmbedding(
      question,
    );

  const chunks =
    await this.prisma.documentChunk.findMany();

  const formattedChunks = chunks
    .filter((chunk) => chunk.embedding)
    .map((chunk) => ({
      content: chunk.content,
      embedding: chunk.embedding as number[],
    }));

  const matches =
    this.retrievalService.findRelevantChunks(
      queryEmbedding,
      formattedChunks,
    );
    const context = matches
  .map((chunk) => chunk.content)
  .join('\n\n');
  const answer =
  await this.llmService.generateAnswer(
    question,
    context,
  );

return {
  answer,
  matches,
};

}
}
//return a dummy response for now, we will implement the actual logic later