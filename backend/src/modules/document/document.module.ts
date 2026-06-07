import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { PdfParserService } from './pdf-parser.service';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService, PdfParserService],
  exports: [PdfParserService],
})
export class DocumentModule {}
