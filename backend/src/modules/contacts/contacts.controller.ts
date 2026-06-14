import { Controller, Get, Post, Body } from "@nestjs/common"
import { Public } from "../../common/public.decorator"
import { ContactsService } from "./contacts.service"

@Controller("contacts")
export class ContactsController {
  constructor(private readonly service: ContactsService) {}

  @Public()
  @Post()
  async createRequest(@Body() dto: { name: string; phone: string; email?: string; message?: string; source?: string }) {
    return this.service.create(dto)
  }

  @Get()
  async findAll() {
    return this.service.findAll()
  }
}
