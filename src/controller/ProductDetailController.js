"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductDetailService_1 = __importDefault(require("../services/ProductDetailService"));
const ProductDetailSchema_1 = __importDefault(require("../modal/ProductDetailSchema"));
const path_1 = __importDefault(require("path"));
const productDetailService = new ProductDetailService_1.default();
class ProductDetailController {
    AddProductDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const reqdata = req.body;
                if (user.role === "admin") {
                    const addObject = {
                        productId: reqdata.productId,
                        colorid: reqdata.colorid,
                        sizeid: reqdata.sizeid,
                        lengthid: reqdata.lengthid,
                        createdBy: user._id,
                        active: true,
                    };
                    const response = yield productDetailService.addProductDetail(addObject);
                    res.status(response.statusCode).send(response);
                }
                else {
                    return res.status(403).send({ statusCode: 403, message: 'You are not authorized to add Length!' });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    error
                });
            }
        });
    }
    UploadImageByproductId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqdata = req;
                console.log(req.body.productId);
                console.log(reqdata.file);
                const addObject = {
                    productId: reqdata.body.productId,
                    image: reqdata.file.filename
                };
                const response = yield productDetailService.UploadImageByproductId(addObject);
                console.log(response);
                res.status(response.statusCode).send(response);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    error
                });
            }
        });
    }
    showFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = path_1.default.resolve("uploadsimage" + `/${req.params.filename}`);
                res.sendFile(file);
            }
            catch (err) {
                console.log("error" + err);
            }
        });
    }
    showFilebyProductId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchdata = yield ProductDetailSchema_1.default.findOne({ productId: req.params.productid });
                if (fetchdata) {
                    const file = path_1.default.resolve("uploadsimage" + `/${fetchdata.image}`);
                    res.sendFile(file);
                }
                else {
                }
            }
            catch (err) {
                console.log("error" + err);
            }
        });
    }
}
exports.default = ProductDetailController;
