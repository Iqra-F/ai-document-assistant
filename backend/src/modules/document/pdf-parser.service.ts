import { Injectable } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { PDFParse } from 'pdf-parse';

@Injectable()
export class PdfParserService {
  async extractText(filePath: string): Promise<string> {
    const data = await readFile(filePath);
    const parser = new PDFParse({ data });

    try {
      const { text } = await parser.getText();
      return text;
    } finally {
      await parser.destroy();
    }
  }
}
