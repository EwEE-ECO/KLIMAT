import { Controller, Get, Post, Put, Delete, Param, Body, Query } from "@nestjs/common"
import { Public } from "../../common/public.decorator"
import { BlogService } from "./blog.service"

@Controller("blog")
export class BlogController {
  constructor(private readonly service: BlogService) {}

  @Public()
  @Get()
  async findAll(@Query() query: { page?: string; limit?: string; category?: string }) {
    return this.service.findAll(query)
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
