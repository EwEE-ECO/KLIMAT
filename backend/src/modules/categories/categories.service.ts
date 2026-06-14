import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../common/prisma.service"

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({ include: { children: true }, orderBy: { order: "asc" } })
  }

  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({ where: { slug }, include: { products: true, children: true } })
    if (!category) throw new NotFoundException("Category not found")
    return category
  }

  async create(dto: any) {
    return this.prisma.category.create({ data: dto })
  }

  async update(id: string, dto: any) {
    return this.prisma.category.update({ where: { id }, data: dto })
  }

  async delete(id: string) {
    return this.prisma.category.delete({ where: { id } })
  }
}
