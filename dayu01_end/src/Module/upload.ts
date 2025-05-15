import {Module} from '@nestjs/common';
import {upload} from '../Controller/upload';
import {MulterModule} from '@nestjs/platform-express'
import {diskStorage} from 'multer'
import {extname, join} from 'path';

@Module({
    imports: [

        // 上传文件配置
        MulterModule.register({
            // storage: diskStorage({
            //     destination: (req, file, cb) => {
            //         cb(null, join(__dirname, '../static'));
            //     },
            //     filename: (req, file, cb) => {
            //         cb(null, Date.now() + extname(file.originalname));
            //     },
            // }),

            storage: diskStorage({
                destination: join(__dirname, '../static'),
                filename: (req, file, callback) => {
                    let file_name = Date.now() + extname(file.originalname);
                    callback(null, file_name);
                },
            }),


        })],
    controllers: [upload],
    providers: [],
})
export class __upload {
}

