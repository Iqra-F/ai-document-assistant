import { Injectable } from '@nestjs/common';
import { UploadDocumentResponseDto } from './dto/upload-document-response.dto';

@Injectable()
export class DocumentService {
  saveUploadedFile(file: Express.Multer.File): UploadDocumentResponseDto {
    return { filename: file.filename };
  }
}
