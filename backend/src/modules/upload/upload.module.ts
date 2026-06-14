import { Module } from "@nestjs/common"
import { MulterModule } from "@nestjs/platform-express"
import { UploadController } from "./upload.controller"
import { diskStorage } from "multer"
import { extname, join } from "path"

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(process.cwd(), "uploads"),
        filename: (_, file, cb) => {
          const unique = Date.now() + "-" + Math.round(Math.random() * 1e9)
          cb(null, unique + extname(file.originalname))
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
