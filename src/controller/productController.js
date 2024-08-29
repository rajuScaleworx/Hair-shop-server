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
const productServices_1 = __importDefault(require("../services/productServices"));
const productService = new productServices_1.default();
class ProductController {
    AddProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user.role === "admin") {
                    const request = req;
                    const files = request.files;
                    // const { name, colors, sizes, lengths } = req.body;
                    const images = files.map((file) => file.filename);
                    console.log('req.body');
                    console.log(req.body);
                    console.log(images);
                    const reqdata = req.body;
                    const productdetail = {
                        image: images,
                        price: reqdata.price,
                        maxbuycount: reqdata.maxbuycount,
                        colorid: JSON.parse(reqdata.colorid),
                        sizeid: JSON.parse(reqdata.sizeid),
                        lengthid: JSON.parse(reqdata.lengthid),
                        productId: "",
                    };
                    const createproduct = {
                        "name": reqdata.name,
                        "producttypeId": reqdata.producttypeId,
                        "producttype": reqdata.producttype,
                        "productcategoryname": reqdata.productcategoryname,
                        "productcategoryid": reqdata.productcategoryid,
                        "productCollection_type": reqdata.productCollection_type,
                        "productCollection_typeid": reqdata.productCollection_typeid,
                        "createdBy": user._id,
                        "active": false,
                    };
                    const response = yield productService.addProduct(createproduct, productdetail);
                    res.status(response.statusCode).send(response);
                }
                else {
                    return res.status(403).send({ statusCode: 403, message: 'You are not authorized to add Length!' });
                }
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    AddProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user.role === "admin") {
                    const reqdata = req.body;
                    const addObject = {
                        "name": reqdata.name,
                        "producttypeId": reqdata.producttypeId,
                        "producttype": reqdata.producttype,
                        "productcategoryname": reqdata.productcategoryname,
                        "productcategoryid": reqdata.productcategoryid,
                        "productCollection_type": reqdata.productCollection_type,
                        "productCollection_typeid": reqdata.productCollection_typeid,
                        price: reqdata.price,
                        image: "",
                        maxbuycount: reqdata.maxbuycount,
                        colorid: reqdata.colorid,
                        sizeid: reqdata.sizeid,
                        lengthid: reqdata.lengthid,
                        "createdBy": user._id,
                        "active": false,
                    };
                    const createproduct = {
                        "name": reqdata.name,
                        "producttypeId": reqdata.producttypeId,
                        "producttype": reqdata.producttype,
                        "productcategoryname": reqdata.productcategoryname,
                        "productcategoryid": reqdata.productcategoryid,
                        "productCollection_type": reqdata.productCollection_type,
                        "productCollection_typeid": reqdata.productCollection_typeid,
                        "createdBy": user._id,
                        "active": false,
                    };
                    const productDetail = {
                        price: reqdata.price,
                        image: "",
                        maxbuycount: reqdata.maxbuycount,
                        colorid: reqdata.colorid,
                        sizeid: reqdata.sizeid,
                        lengthid: reqdata.lengthid,
                        productId: "",
                    };
                    const response = yield productService.addProduct(createproduct, productDetail);
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
    // public async RemoveCategory(req: Request, res: Response) {
    //     try {
    //         const user: any = req.user
    //         if (user.role === "admin") {
    //             const addObject = {
    //                 lengthid: req.params.lengthid
    //             }
    //             const response = await productCategoryService.RemoveProductCategory(addObject)
    //             res.status(response.statusCode).send(response)
    //         }
    //         else {
    //             return res.status(403).send({ statusCode: 403, message: 'You are not authorized to add Length!' })
    //         }
    //     }
    //     catch (error: any) {
    //         console.log(error)
    //         res.status(500).json({
    //             error
    //         })
    //     }
    // }
    // public async getallCategory(req: Request, res: Response) {
    //     try {
    //         const response = await productCategoryService.getallProductCategory()
    //         res.status(response.statusCode).send(response)
    //     }
    //     catch (error) {
    //         res.status(500).json({
    //             error
    //         })
    //     }
    // }
    ProductListbytype(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield productService.ProductListbytype(req.params.type);
                res.status(response.statusCode).send(response);
            }
            catch (error) {
                res.status(500).json({
                    error
                });
            }
        });
    }
    ProductList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield productService.ProductList(req.params.type);
                res.status(response.statusCode).send(response);
            }
            catch (error) {
                res.status(500).json({
                    error
                });
            }
        });
    }
    ProductDetailbyId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield productService.ProductDetailbyId(req.params.id);
                res.status(response.statusCode).send(response);
            }
            catch (error) {
                res.status(500).json({
                    error
                });
            }
        });
    }
    // for Admin API
    ProductDetailbyIdforAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield productService.ProductDetailbyIdAdmin(req.params.id);
                res.status(response.statusCode).send(response);
            }
            catch (error) {
                res.status(500).json({
                    error
                });
            }
        });
    }
    ProductDetailBymultiId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestdata = req.body;
                console.log(requestdata);
                var Idarray = [];
                requestdata.forEach((ed) => {
                    Idarray.push(ed.productId);
                });
                var coloridarr = [];
                requestdata.forEach((ed) => {
                    coloridarr.push(ed.color);
                });
                var sizeidarr = [];
                requestdata.forEach((ed) => {
                    sizeidarr.push(ed.size);
                });
                var lengthdarr = [];
                requestdata.forEach((ed) => {
                    lengthdarr.push(ed.length);
                });
                const response = yield productService.ProductDetailbyMultiId(Idarray, coloridarr, sizeidarr, lengthdarr, requestdata);
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
    ProductUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const { productData, productDetailsData } = req.body;
                const result = yield productService.updateProduct(productId, productData, productDetailsData);
                res.json({
                    success: true,
                    data: result
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
        });
    }
}
exports.default = ProductController;
