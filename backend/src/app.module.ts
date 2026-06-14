import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from "./common/prisma.module"
import { JwtAuthGuard } from "./common/jwt-auth.guard"
import { AuthModule } from "./modules/auth/auth.module"
import { ProductsModule } from "./modules/products/products.module"
import { CategoriesModule } from "./modules/categories/categories.module"
import { OrdersModule } from "./modules/orders/orders.module"
import { ServicesModule } from "./modules/services/services.module"
import { BlogModule } from "./modules/blog/blog.module"
import { ContactsModule } from "./modules/contacts/contacts.module"
import { PageMetaModule } from "./modules/page-meta/page-meta.module"
import { UploadModule } from "./modules/upload/upload.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    ServicesModule,
    BlogModule,
    ContactsModule,
    PageMetaModule,
    UploadModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
