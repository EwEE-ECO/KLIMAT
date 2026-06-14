import { IsString, IsOptional, IsNumber } from "class-validator"

export class CreateCategoryDto {
  @IsString() name: string
  @IsString() slug: string
  @IsOptional() @IsString() description?: string
  @IsOptional() @IsString() image?: string
  @IsOptional() @IsString() parentId?: string
  @IsOptional() @IsNumber() order?: number
}

export class UpdateCategoryDto extends CreateCategoryDto {}
