import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../common/prisma.service"

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: { name: string; phone: string; email?: string; message?: string; source?: string }) {
    return this.prisma.contactRequest.create({ data: dto })
  }

  async findAll() {
    return this.prisma.contactRequest.findMany({ orderBy: { createdAt: "desc" } })
  }
}
