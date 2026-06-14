import { Injectable, BadRequestException } from "@nestjs/common"
import { PrismaService } from "../../common/prisma.service"
import { CreateOrderDto } from "./orders.dto"

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { page?: string; limit?: string; status?: string }) {
    const page = parseInt(query.page || "1")
    const limit = parseInt(query.limit || "20")
    const where: any = {}
    if (query.status) where.status = query.status

    const [items, total] = await Promise.all([
      this.prisma.order.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit, include: { items: true } }),
      this.prisma.order.count({ where }),
    ])
    return { items, total, page, totalPages: Math.ceil(total / limit) }
  }

  async findById(id: string) {
    return this.prisma.order.findUnique({ where: { id }, include: { items: true } })
  }

  async create(dto: CreateOrderDto) {
    const orderNumber = `KV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
    return this.prisma.order.create({
      data: {
        orderNumber,
        status: "NEW",
        total: dto.total,
        subtotal: dto.subtotal,
        deliveryCost: dto.deliveryCost,
        promoCode: dto.promoCode,
        discount: dto.discount,
        customerName: dto.customerName,
        customerPhone: dto.customerPhone,
        customerEmail: dto.customerEmail,
        city: dto.city,
        street: dto.street,
        house: dto.house,
        apartment: dto.apartment,
        comment: dto.comment,
        contactMethod: dto.contactMethod,
        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
        },
      },
      include: { items: true },
    })
  }

  async updateStatus(id: string, dto: { status: string }) {
    return this.prisma.order.update({ where: { id }, data: { status: dto.status as any } })
  }

  async stats() {
    const [totalOrders, newOrders, totalRevenue] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.order.count({ where: { status: "NEW" } }),
      this.prisma.order.aggregate({ _sum: { total: true } }),
    ])
    return { totalOrders, newOrders, totalRevenue: totalRevenue._sum.total }
  }
}
