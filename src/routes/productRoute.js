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
exports.productroute = void 0;
const express = __importStar(require("express"));
const productController_1 = __importDefault(require("../controller/productController"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_mw_1 = require("../passport.mw");
const multer = require('multer');
const path = require('path');
const productController = new productController_1.default();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploadsimage/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
exports.productroute = express.Router();
const jsonparser = body_parser_1.default.json();
exports.productroute.post('/addproduct', jsonparser, passport_mw_1.authorized, upload.array('files', 5), productController.AddProducts);
exports.productroute.get('/productlist', productController.ProductList);
exports.productroute.post('/product', jsonparser, passport_mw_1.authorized, productController.AddProduct);
// productroute.delete('/product_category/:product_typeid',jsonparser,authorized,productCategoryController.RemoveCategory)
exports.productroute.get('/product/:id', productController.ProductDetailbyId);
exports.productroute.get('/productlist/:type', productController.ProductListbytype);
exports.productroute.post('/productlistbymultiid', jsonparser, productController.ProductDetailBymultiId);
exports.productroute.get('/ProductDetailbyIdAdmin/:id', jsonparser, productController.ProductDetailbyIdforAdmin);
// ProductDetailbyIdAdmin
