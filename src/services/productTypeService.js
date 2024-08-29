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
const productTypemodalSchema_1 = __importDefault(require("../modal/productTypemodalSchema"));
class ProductTypeService {
    addProductType(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responsefindUserDetail = yield productTypemodalSchema_1.default.find({
                    name: addObject.name
                });
                console.log(responsefindUserDetail);
                if ((responsefindUserDetail === null || responsefindUserDetail === void 0 ? void 0 : responsefindUserDetail.length) > 0) {
                    return { statusCode: 400, message: `ProductTypeModal name match try another!` };
                }
                else {
                    const addcolorresponse = yield productTypemodalSchema_1.default.create(addObject);
                    if (addcolorresponse) {
                        return { statusCode: 201, message: 'ProductType Add successfully!' };
                    }
                    else {
                        return { statusCode: 400, message: 'ProductType Add Failed!' };
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    RemoveProductType(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addlengthresponse = yield productTypemodalSchema_1.default.findByIdAndDelete(addObject.lengthid);
                if (addlengthresponse) {
                    return { statusCode: 200, message: 'ProductType Remove successfully!' };
                }
                else {
                    return { statusCode: 400, message: 'ProductType Remove Failed!' };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateProductType(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addlengthresponse = yield productTypemodalSchema_1.default.findByIdAndUpdate(addObject.id, { name: addObject.name });
                if (addlengthresponse) {
                    return { statusCode: 200, message: 'ProductType Update successfully!' };
                }
                else {
                    return { statusCode: 400, message: 'ProductType Update Failed!' };
                }
            }
            catch (error) {
            }
        });
    }
    getallProductType() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getProductTyperesponse = yield productTypemodalSchema_1.default.find();
                return { statusCode: 200, message: "Get ProductType Success", result: getProductTyperesponse };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ProductTypeService;
