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
const ProductDetailSchema_1 = __importDefault(require("../modal/ProductDetailSchema"));
const productmodalSchema_1 = __importDefault(require("../modal/productmodalSchema"));
class ProductDetailService {
    addProductDetail(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findproduct = yield productmodalSchema_1.default.findById(addObject.productId);
                if (findproduct) {
                    const addcolorresponse = yield ProductDetailSchema_1.default.create(addObject);
                    console.log(addcolorresponse);
                    if (addcolorresponse) {
                        return { statusCode: 201, message: 'ProductDetail Add successfully!' };
                    }
                    else {
                        return { statusCode: 400, message: 'ProductDetail Add Failed!' };
                    }
                }
                else {
                    return { statusCode: 400, message: 'Product Not Found!' };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    UploadImageByproductId(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findproduct = yield productmodalSchema_1.default.findById(addObject.productId);
                console.log("findproduct");
                console.log(findproduct);
                if (findproduct) {
                    const addcolorresponse = yield ProductDetailSchema_1.default.findOneAndUpdate({ productId: findproduct._id }, { $set: { image: addObject.image } });
                    console.log(addcolorresponse);
                    if (addcolorresponse) {
                        return { statusCode: 201, message: 'ProductDetail Add successfully!' };
                    }
                    else {
                        return { statusCode: 400, message: 'ProductDetail Add Failed!' };
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ProductDetailService;
