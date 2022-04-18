import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { AuthRouteModule } from './routes/auth/auth.module';
import { CartsModule } from './routes/carts/carts.module';
import { ProductsRouteModule } from './routes/products/products.module';
import { schema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: schema,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: `${__dirname}/../DATABASE.sqlite`,
      entities: [__dirname + '/domain/**/schemas/*{.ts,.js}'],
      logging: true,
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProductsRouteModule,
    AuthRouteModule,
    CartsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
