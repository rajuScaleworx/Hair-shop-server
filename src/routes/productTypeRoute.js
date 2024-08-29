"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.producttyperoute = void 0;
const express = __importStar(require("express"));
const productTypeController_1 = __importDefault(require("../controller/productTypeController"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_mw_1 = require("../passport.mw");
const productTypeController = new productTypeController_1.default();
exports.producttyperoute = express.Router();
const jsonparser = body_parser_1.default.json();
exports.producttyperoute.post('/product_type', jsonparser, passport_mw_1.authorized, productTypeController.AddProductType);
exports.producttyperoute.delete('/product_type/:product_typeid', jsonparser, passport_mw_1.authorized, productTypeController.RemoveProductType);
exports.producttyperoute.get('/product_type', productTypeController.getallProductType);
exports.producttyperoute.post('/product_type_update', jsonparser, passport_mw_1.authorized, productTypeController.updateProductType);
