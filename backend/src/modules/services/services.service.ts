import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../common/prisma.service"

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.service.findMany({ orderBy: { order: "asc" } })
  }

  async findBySlug(slug: string) {
    const service = await this.prisma.service.findUnique({ where: { slug } })
    if (!service) throw new NotFoundException("Service not found")
    return service
  }

  async create(dto: any) {
    return this.prisma.service.create({ data: dto })
  }

  async update(id: string, dto: any) {
    return this.prisma.service.update({ where: { id }, data: dto })
  }

  async delete(id: string) {
    return this.prisma.service.delete({ where: { id } })
  }
}
