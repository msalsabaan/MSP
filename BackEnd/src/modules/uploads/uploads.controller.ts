import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

const ALLOWED = /\.(jpg|jpeg|png|webp|gif|svg)$/i;

function safeName(original: string): string {
  const ext = extname(original).toLowerCase();
  const base = original
    .replace(ext, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  const stamp = `${process.hrtime.bigint().toString(36)}`;
  return `${base || 'file'}-${stamp}${ext}`;
}

@ApiTags('Uploads')
@ApiBearerAuth()
@Roles(Role.ContentManager, Role.Editor)
@Controller('uploads')
export class UploadsController {
  constructor(private readonly config: ConfigService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.env.UPLOAD_DIR ?? 'uploads',
        filename: (_req, file, cb) => cb(null, safeName(file.originalname)),
      }),
      limits: { fileSize: (parseInt(process.env.MAX_UPLOAD_MB ?? '5', 10)) * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED.test(file.originalname)) {
          return cb(new BadRequestException('Only image files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  upload(@UploadedFile() file: { filename: string; size: number }) {
    if (!file) throw new BadRequestException('No file provided');
    const prefix = this.config.get<string>('apiPrefix');
    return {
      filename: file.filename,
      url: `/${prefix}/uploads/${file.filename}`,
      size: file.size,
    };
  }
}
