import { Module } from "@nestjs/common"
import { PageMetaController } from "./page-meta.controller"
import { PageMetaService } from "./page-meta.service"

@Module({
  controllers: [PageMetaController],
  providers: [PageMetaService],
})
export class PageMetaModule {}
