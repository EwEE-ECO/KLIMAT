import { IsOptional, IsString, IsNumber, Min, IsBoolean, IsArray } from "class-validator"
import { Type, Transform } from "class-transformer"

export class ProductQueryDto {
  @IsOptional() @IsString() category?: string
  @IsOptional() @IsString() brand?: string
  @IsOptional() @IsString() type?: string
  @IsOptional() @IsString() roomArea?: string
  @IsOptional() @IsString() priceMin?: string
  @IsOptional() @IsString() priceMax?: string
  @IsOptional() @IsString() sort?: string
  @IsOptional() @IsString() search?: string
  @IsOptional() @Type(() => Number) @IsNumber() @Min(1) page?: number
  @IsOptional() @Type(() => Number) @IsNumber() @Min(1) limit?: number
}

export class CreateProductDto {
  @IsString() name: string
  @IsString() slug: string
  @IsOptional() @IsString() article?: string
  @IsOptional() @IsString() description?: string
  @IsOptional() @IsString() shortDesc?: string
  @IsString() price: string
  @IsOptional() @IsString() oldPrice?: string
  @IsOptional() @IsString() brand?: string
  @IsOptional() @IsString() categoryId: string
  @IsOptional() @IsBoolean() isHit?: boolean
  @IsOptional() @IsBoolean() isNew?: boolean
  @IsOptional() @IsArray() images?: string[]
}

export class UpdateProductDto extends CreateProductDto {}
