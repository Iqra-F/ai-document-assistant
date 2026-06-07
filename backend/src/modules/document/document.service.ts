import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { PdfParserService } from './pdf-parser.service';

@Injectable()
export class DocumentService {
  constructor(
    private readonly pdfParserService: PdfParserService,
  ) {}

  async saveUploadedFile(file: Express.Multer.File) {
    const filePath = join(process.cwd(), 'uploads', file.filename);

    const text = await this.pdfParserService.extractText(
      filePath,
    );
   
    return {
      filename: file.filename,
      textLength: text.length,
      preview: text.substring(0, 500),
    };
  }
}