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
const productTypeService_1 = __importDefault(require("../services/productTypeService"));
const productTypeService = new productTypeService_1.default();
class ProductTypeController {
    AddProductType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user.role === "admin") {
                    console.log(req.body);
                    const addObject = {
                        name: req.body.name,
                        active: true,
                    };
                    const response = yield productTypeService.addProductType(addObject);
                    res.status(response.statusCode).send(response);
                }
                else {
                    return res.status(403).send({ statusCode: 403, message: 'You are not authorized to add productType!' });
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
    RemoveProductType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user.role === "admin") {
                    const addObject = {
                        lengthid: req.params.product_typeid
                    };
                    const response = yield productTypeService.RemoveProductType(addObject);
                    res.status(response.statusCode).send(response);
                }
                else {
                    return res.status(403).send({ statusCode: 403, message: 'You are not authorized to remove ProductType!' });
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
    updateProductType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user.role === "admin") {
                    const addObject = {
                        id: req.body.id,
                        name: req.body.name
                    };
                    const response = yield productTypeService.updateProductType(addObject);
                    res.status(response.statusCode).send(response);
                }
                else {
                    return res.status(403).send({ statusCode: 403, message: 'You are not authorized to remove ProductType!' });
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
    getallProductType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield productTypeService.getallProductType();
                res.status(response.statusCode).send(response);
            }
            catch (error) {
                res.status(500).json({
                    error
                });
            }
        });
    }
}
exports.default = ProductTypeController;
