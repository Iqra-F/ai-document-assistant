import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { PdfParserService } from './pdf-parser.service';
import { ChunkingService } from './chunking/chunking.service';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class DocumentService {
  constructor(
    private readonly pdfParserService: PdfParserService,
    private readonly chunkingService: ChunkingService,
  private readonly prisma: PrismaService,
  ) {}

  async saveUploadedFile(file: Express.Multer.File) {
    const filePath = join(process.cwd(), 'uploads', file.filename);

    const text = await this.pdfParserService.extractText(
      filePath,
    );
    
    const chunks =
      this.chunkingService.chunkText(text);
    
    const document =
      await this.prisma.document.create({
        data: {
          title: file.originalname,
          fileName: file.filename,
          status: 'processed',
        },
      });
    
    for (let i = 0; i < chunks.length; i++) {
      await this.prisma.documentChunk.create({
        data: {
          content: chunks[i],
          chunkIndex: i,
          documentId: document.id,
        },
      });
    }
    
    return {
      documentId: document.id,
      chunksCreated: chunks.length,
    };
  }
}