import { Controller, Get, Post, Put, Param, Body, Query } from "@nestjs/common"
import { Public } from "../../common/public.decorator"
import { OrdersService } from "./orders.service"
import { CreateOrderDto, UpdateOrderStatusDto } from "./orders.dto"

@Controller("orders")
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Get()
  async findAll(@Query() query: { page?: string; limit?: string; status?: string }) {
    return this.service.findAll(query)
  }

  @Get("stats")
  async stats() {
    return this.service.stats()
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.service.findById(id)
  }

  @Public()
  @Post()
  async create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto)
  }

  @Put(":id/status")
  async updateStatus(@Param("id") id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.service.updateStatus(id, dto)
  }
}
