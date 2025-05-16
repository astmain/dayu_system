import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
    @ApiOperation({ summary: '单文件上传' })
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                // 指定文件存储路径
                destination: './uploads',
                // 指定文件名
                filename: (req, file, callback) => {
                    // 生成文件名: 时间戳 + 随机数 + 原文件扩展名
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
            // 文件过滤器
            fileFilter: (req, file, callback) => {
                // 这里可以添加文件类型限制
                // 例如只允许上传图片
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return callback(new Error('只允许上传图片文件!'), false);
                }
                callback(null, true);
            },
            // 文件大小限制
            limits: {
                fileSize: 1024 * 1024 * 5, // 5MB
            },
        }),
    )
    @Post('/upload_one')
    async uploadOne(@UploadedFile() file: Express.Multer.File) {
        return {
            code: 200,
            data: {
                filename: file.filename,
                path: file.path,
                size: file.size,
            },
            message: '上传成功'
        };
    }
}


nestjs 单文件上传指定路径
