import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { pdfUploadOptions } from './config/pdf-upload.config';
import { DocumentService } from './document.service';
import { UploadDocumentResponseDto } from './dto/upload-document-response.dto';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', pdfUploadOptions))
  async uploadDocument(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: pdfUploadOptions.limits!.fileSize! }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<UploadDocumentResponseDto> {
    return await this.documentService.saveUploadedFile(file);
  }
}
