import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { readFile } from 'node:fs/promises';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PDFParse } = require('pdf-parse');

@Injectable()
export class PdfParserService {
  async extractText(filePath: string): Promise<string> {
    try {
      const buffer = await readFile(filePath);

      const parser = new PDFParse({ data: buffer });
      const result = await parser.getText();

      if (!result?.text?.trim()) {
        throw new BadRequestException('Unable to extract text from PDF');
      }

      return result.text;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('PDF PARSE ERROR:', error);
      throw new InternalServerErrorException('Failed to parse PDF');
    }
  }
}