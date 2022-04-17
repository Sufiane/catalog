"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const jwt_1 = require("@nestjs/jwt");
const users_1 = require("../../domain/users");
let AuthService = class AuthService {
    constructor(usersDao, jwtService) {
        this.usersDao = usersDao;
        this.jwtService = jwtService;
    }
    async validate(email, password) {
        const user = await this.usersDao.findOneByEmail(email);
        const hashedPassword = crypto
            .createHash('md5')
            .update(password)
            .digest('hex');
        if (!user || user.passwordHash !== hashedPassword) {
            return null;
        }
        return user;
    }
    async login(user) {
        const payload = {
            id: user.id,
            email: user.email,
        };
        return {
            token: this.jwtService.sign(payload),
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_1.UsersDao,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map