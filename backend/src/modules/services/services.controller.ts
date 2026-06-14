import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common"
import { Public } from "../../common/public.decorator"
import { ServicesService } from "./services.service"

@Controller("services")
export class ServicesController {
  constructor(private readonly service: ServicesService) {}

  @Public()
  @Get()
  async findAll() {
    return this.service.findAll()
  }

  @Public()
  @Get(":slug")
  async findBySlug(@Param("slug") slug: string) {
    return this.service.findBySlug(slug)
  }

  @Post()
  async create(@Body() dto: any) {
    return this.service.create(dto)
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: any) {
    return this.service.update(id, dto)
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.service.delete(id)
  }
}
