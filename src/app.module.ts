import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { AuthRouteModule } from './routes/auth/auth.module';
import { ProductsRouteModule } from './routes/products/products.module';

@Module({
  imports: [
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
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
