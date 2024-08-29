"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let JWTScret = process.env.JWT_SECERET_KEY;
class TokenService {
    createToken(userObject) {
        const JWTObject = {
            _id: userObject._id,
            name: userObject.name,
            email: userObject.email,
            role: userObject.role,
            userType: userObject.usertype
        };
        return jsonwebtoken_1.default.sign(JWTObject, JWTScret, {
            expiresIn: '24h'
        });
    }
}
exports.default = TokenService;
