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
const productCategoryService_1 = __importDefault(require("../services/productCategoryService"));
const productCategoryService = new productCategoryService_1.default();
class ProductCategoryController {
    AddCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user.role === "admin") {
                    const addObject = {
                        name: req.body.name,
                        producttype: req.body.producttype,
                        producttypeid: req.body.producttypeid,
                        createdBy: user._id,
                        active: true,
                    };
                    const response = yield productCategoryService.addProductCategory(addObject);
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
    RemoveCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user.role === "admin") {
                    const addObject = {
                        lengthid: req.params.categoryid
                    };
                    const response = yield productCategoryService.RemoveProductCategory(addObject);
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
    getallCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield productCategoryService.getallProductCategory();
                res.status(response.statusCode).send(response);
            }
            catch (error) {
                res.status(500).json({
                    error
                });
            }
        });
    }
    updateProductCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user.role === "admin") {
                    const addObject = {
                        id: req.body.id,
                        name: req.body.name,
                        producttype: req.body.producttype,
                        producttypeid: req.body.producttypeid,
                    };
                    const response = yield productCategoryService.updateProductCategory(addObject);
                    res.status(response.statusCode).send(response);
                }
                else {
                    return res.status(403).send({ statusCode: 403, message: 'You are not authorized to UPdate ProductCategory!' });
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
}
exports.default = ProductCategoryController;
