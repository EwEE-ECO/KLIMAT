import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../common/prisma.service"
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from "./products.dto"

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: ProductQueryDto) {
    const { category, brand, type, roomArea, priceMin, priceMax, sort, search, page = 1, limit = 12 } = query
    const where: any = { inStock: true }

    if (category) where.category = { slug: category }
    if (brand) where.brand = brand
    if (type) where.type = type
    if (roomArea) where.roomArea = roomArea
    if (search) where.OR = [{ name: { contains: search, mode: "insensitive" } }, { article: { contains: search, mode: "insensitive" } }]
    if (priceMin || priceMax) {
      where.price = {}
      if (priceMin) where.price.gte = parseFloat(priceMin)
      if (priceMax) where.price.lte = parseFloat(priceMax)
    }

    const orderBy: any = sort === "price_asc" ? { price: "asc" } : sort === "price_desc" ? { price: "desc" } : sort === "name" ? { name: "asc" } : { createdAt: "desc" }

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({ where, orderBy, skip: (page - 1) * limit, take: limit, include: { category: true } }),
      this.prisma.product.count({ where }),
    ])

    return { items, total, page, totalPages: Math.ceil(total / limit) }
  }

  async findHits() {
    return this.prisma.product.findMany({ where: { isHit: true, inStock: true }, take: 10, include: { category: true } })
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({ where: { slug }, include: { category: true, reviews: true } })
    if (!product) throw new NotFoundException("Product not found")
    return product
  }

  async create(dto: CreateProductDto) {
    return this.prisma.product.create({ data: dto as any })
  }

  async update(id: string, dto: UpdateProductDto) {
    const existing = await this.prisma.product.findUnique({ where: { id } })
    if (!existing) throw new NotFoundException("Product not found")
    return this.prisma.product.update({ where: { id }, data: dto as any })
  }

  async delete(id: string) {
    const existing = await this.prisma.product.findUnique({ where: { id } })
    if (!existing) throw new NotFoundException("Product not found")
    return this.prisma.product.delete({ where: { id } })
  }
}
