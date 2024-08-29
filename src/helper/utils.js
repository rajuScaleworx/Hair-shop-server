"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenservice_1 = __importDefault(require("../services/tokenservice"));
const tokenService = new tokenservice_1.default();
class Utils {
    createToken(tokenobject) {
        const response = tokenService.createToken(tokenobject);
        return response;
    }
}
exports.default = Utils;
