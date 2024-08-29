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
exports.productcategoryroute = void 0;
const express = __importStar(require("express"));
const productCategoryController_1 = __importDefault(require("../controller/productCategoryController"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_mw_1 = require("../passport.mw");
const productCategoryController = new productCategoryController_1.default();
exports.productcategoryroute = express.Router();
const jsonparser = body_parser_1.default.json();
exports.productcategoryroute.post('/product_category', jsonparser, passport_mw_1.authorized, productCategoryController.AddCategory);
exports.productcategoryroute.delete('/product_category/:categoryid', jsonparser, passport_mw_1.authorized, productCategoryController.RemoveCategory);
exports.productcategoryroute.get('/product_category', productCategoryController.getallCategory);
exports.productcategoryroute.post('/product_category_update', jsonparser, passport_mw_1.authorized, productCategoryController.updateProductCategory);
