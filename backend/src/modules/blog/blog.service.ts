import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../common/prisma.service"

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { page?: string; limit?: string; category?: string }) {
    const page = parseInt(query.page || "1")
    const limit = parseInt(query.limit || "10")
    const where: any = { published: true }
    if (query.category) where.category = query.category

    const [items, total] = await Promise.all([
      this.prisma.blogPost.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit }),
      this.prisma.blogPost.count({ where }),
    ])
    return { items, total, page, totalPages: Math.ceil(total / limit) }
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { slug } })
    if (!post) throw new NotFoundException("Post not found")
    return post
  }

  async create(dto: any) {
    return this.prisma.blogPost.create({ data: dto })
  }

  async update(id: string, dto: any) {
    return this.prisma.blogPost.update({ where: { id }, data: dto })
  }

  async delete(id: string) {
    return this.prisma.blogPost.delete({ where: { id } })
  }
}
