import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../common/prisma.service"

@Injectable()
export class PageMetaService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.pageMeta.findMany()
  }

  async findByPage(page: string) {
    return this.prisma.pageMeta.findUnique({ where: { page } })
  }

  async update(page: string, dto: { title?: string; desc?: string; ogImage?: string }) {
    return this.prisma.pageMeta.upsert({ where: { page }, update: dto, create: { page, ...dto } })
  }
}
