import { Controller, Get, Put, Param, Body } from "@nestjs/common"
import { Public } from "../../common/public.decorator"
import { PageMetaService } from "./page-meta.service"

@Controller("page-meta")
export class PageMetaController {
  constructor(private readonly service: PageMetaService) {}

  @Public()
  @Get()
  async findAll() {
    return this.service.findAll()
  }

  @Public()
  @Get(":page")
  async findByPage(@Param("page") page: string) {
    return this.service.findByPage(page)
  }

  @Put(":page")
  async update(@Param("page") page: string, @Body() dto: { title?: string; desc?: string; ogImage?: string }) {
    return this.service.update(page, dto)
  }
}
