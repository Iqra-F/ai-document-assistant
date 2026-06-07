import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { PdfParserService } from './pdf-parser.service';
import { ChunkingService } from './chunking/chunking.service';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService, PdfParserService, ChunkingService],
  exports: [PdfParserService],
})
export class DocumentModule {}
