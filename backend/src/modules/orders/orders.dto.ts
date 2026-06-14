import { IsString, IsNumber, IsOptional, IsArray, ValidateNested, Min } from "class-validator"
import { Type } from "class-transformer"

export class OrderItemDto {
  @IsString() productId: string
  @IsString() name: string
  @IsNumber() @Min(0) price: number
  @IsNumber() @Min(1) quantity: number
  @IsOptional() @IsString() image?: string
}

export class CreateOrderDto {
  @IsNumber() @Min(0) total: number
  @IsNumber() @Min(0) subtotal: number
  @IsOptional() @IsNumber() deliveryCost?: number
  @IsOptional() @IsString() promoCode?: string
  @IsOptional() @IsNumber() discount?: number

  @IsString() customerName: string
  @IsString() customerPhone: string
  @IsOptional() @IsString() customerEmail?: string
  @IsOptional() @IsString() city?: string
  @IsOptional() @IsString() street?: string
  @IsOptional() @IsString() house?: string
  @IsOptional() @IsString() apartment?: string
  @IsOptional() @IsString() comment?: string
  @IsOptional() @IsString() contactMethod?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[]
}

export class UpdateOrderStatusDto {
  @IsString() status: string
}
