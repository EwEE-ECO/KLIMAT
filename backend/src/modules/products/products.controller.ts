import { Controller, Get, Post, Put, Delete, Param, Body, Query } from "@nestjs/common"
import { Public } from "../../common/public.decorator"
import { ProductsService } from "./products.service"
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from "./products.dto"

@Controller("products")
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Public()
  @Get()
  async findAll(@Query() query: ProductQueryDto) {
    return this.service.findAll(query)
  }

  @Public()
  @Get("hits")
  async findHits() {
    return this.service.findHits()
  }

  @Public()
  @Get(":slug")
  async findBySlug(@Param("slug") slug: string) {
    return this.service.findBySlug(slug)
  }

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.service.create(dto)
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    return this.service.update(id, dto)
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.service.delete(id)
  }
}
