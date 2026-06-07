import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';

export const UPLOADS_DIR = join(process.cwd(), 'uploads');

export const pdfUploadOptions: MulterOptions = {
  storage: diskStorage({
    destination: (_req, _file, callback) => {
      mkdirSync(UPLOADS_DIR, { recursive: true });
      callback(null, UPLOADS_DIR);
    },
    filename: (_req, file, callback) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (_req, file, callback) => {
    if (file.mimetype !== 'application/pdf') {
      return callback(
        new BadRequestException('Only PDF files are allowed'),
        false,
      );
    }
    callback(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
};
