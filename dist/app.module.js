"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_guard_1 = require("./auth/guards/jwt.guard");
const auth_module_1 = require("./routes/auth/auth.module");
const carts_module_1 = require("./routes/carts/carts.module");
const products_module_1 = require("./routes/products/products.module");
const config_schema_1 = require("./config.schema");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: config_schema_1.schema,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: `${__dirname}/../DATABASE.sqlite`,
                entities: [__dirname + '/domain/**/schemas/*{.ts,.js}'],
                logging: true,
                synchronize: true,
                autoLoadEntities: true,
            }),
            products_module_1.ProductsRouteModule,
            auth_module_1.AuthRouteModule,
            carts_module_1.CartsModule,
        ],
        providers: [{ provide: core_1.APP_GUARD, useClass: jwt_guard_1.JwtAuthGuard }],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map