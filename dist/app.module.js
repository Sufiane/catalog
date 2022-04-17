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
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_guard_1 = require("./auth/guards/jwt.guard");
const auth_module_1 = require("./routes/auth/auth.module");
const products_module_1 = require("./routes/products/products.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
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
        ],
        providers: [{ provide: core_1.APP_GUARD, useClass: jwt_guard_1.JwtAuthGuard }],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map