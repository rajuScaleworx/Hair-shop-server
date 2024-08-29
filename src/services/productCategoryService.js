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
const productCategorymodalSchema_1 = __importDefault(require("../modal/productCategorymodalSchema"));
class ProductCategoryService {
    addProductCategory(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responsefindUserDetail = yield productCategorymodalSchema_1.default.find({
                    name: addObject.name
                });
                console.log(responsefindUserDetail);
                if ((responsefindUserDetail === null || responsefindUserDetail === void 0 ? void 0 : responsefindUserDetail.length) > 0) {
                    return { statusCode: 400, message: `ProductCategory name match try another!` };
                }
                else {
                    const addcolorresponse = yield productCategorymodalSchema_1.default.create(addObject);
                    if (addcolorresponse) {
                        return { statusCode: 201, message: 'ProductCategory Add successfully!' };
                    }
                    else {
                        return { statusCode: 400, message: 'ProductCategory Add Failed!' };
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    RemoveProductCategory(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addProductCategoryresponse = yield productCategorymodalSchema_1.default.findByIdAndDelete(addObject.lengthid);
                if (addProductCategoryresponse) {
                    return { statusCode: 200, message: 'ProductCategory Remove successfully!' };
                }
                else {
                    return { statusCode: 400, message: 'ProductCategory Remove Failed!' };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    getallProductCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getProductTyperesponse = yield productCategorymodalSchema_1.default.find();
                return { statusCode: 200, message: "Get ProductCategory Success", result: getProductTyperesponse };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // updateProductCategory
    updateProductCategory(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addlengthresponse = yield productCategorymodalSchema_1.default.findByIdAndUpdate(addObject.id, { name: addObject.name, producttype: addObject.producttype, producttypeid: addObject.producttypeid });
                if (addlengthresponse) {
                    return { statusCode: 200, message: 'ProductCategory Update successfully!' };
                }
                else {
                    return { statusCode: 400, message: 'ProductCategory Update Failed!' };
                }
            }
            catch (error) {
            }
        });
    }
}
exports.default = ProductCategoryService;
