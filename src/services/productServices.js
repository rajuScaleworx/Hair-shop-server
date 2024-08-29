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
const productmodalSchema_1 = __importDefault(require("../modal/productmodalSchema"));
const ProductDetailSchema_1 = __importDefault(require("../modal/ProductDetailSchema"));
const colormodalSchema_1 = __importDefault(require("../modal/colormodalSchema"));
const sizemodalSchema_1 = __importDefault(require("../modal/sizemodalSchema"));
const lengthmodalSchema_1 = __importDefault(require("../modal/lengthmodalSchema"));
const mongoose = require('mongoose');
class ProductService {
    addProduct(addObject, productDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responsefindUserDetail = yield productmodalSchema_1.default.find({
                    name: addObject.name
                });
                if ((responsefindUserDetail === null || responsefindUserDetail === void 0 ? void 0 : responsefindUserDetail.length) > 0) {
                    return { statusCode: 400, message: `Product name match try another!` };
                }
                else {
                    const addcolorresponse = yield productmodalSchema_1.default.create(addObject);
                    // console.log(addcolorresponse)
                    if (addcolorresponse) {
                        productDetail.productId = addcolorresponse._id;
                        const productDetailres = yield ProductDetailSchema_1.default.create(productDetail);
                        if (productDetailres) {
                            console.log(productDetailres);
                            return { statusCode: 201, message: 'Product Add successfully!' };
                        }
                        else {
                            return { statusCode: 400, message: 'Product Add Failed!' };
                        }
                    }
                    else {
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    ProductDetailbyId(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productmodalSchema_1.default.findById(addObject);
                if (product) {
                    const productDetail = yield ProductDetailSchema_1.default.findOne({ productId: product._id });
                    if (productDetail) {
                        const colorarray = productDetail.colorid[0];
                        const sizearray = productDetail.sizeid[0];
                        const lengtharray = productDetail.lengthid[0];
                        console.log(colorarray[0]);
                        const findPerformances = yield colormodalSchema_1.default.find({
                            _id: {
                                $in: colorarray
                            }
                        });
                        const findPerformancessize = yield sizemodalSchema_1.default.find({
                            _id: {
                                $in: sizearray
                            }
                        });
                        const findPerformanceslength = yield lengthmodalSchema_1.default.find({
                            _id: {
                                $in: lengtharray
                            }
                        });
                        return { statusCode: 200, data: { product: product, detail: productDetail, colors: findPerformances, sizes: findPerformancessize, lengths: findPerformanceslength } };
                    }
                    else {
                        return { statusCode: 404, message: "Detail data not found!" };
                    }
                }
                else {
                    return { statusCode: 404, message: "Product data not found!" };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    ProductDetailbyIdAdmin(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productmodalSchema_1.default.findById(addObject);
                if (product) {
                    const productDetail = yield ProductDetailSchema_1.default.findOne({ productId: product._id });
                    if (productDetail) {
                        return { statusCode: 200, data: { message: "Product Data Found!", product: product, detail: productDetail } };
                    }
                    else {
                        return { statusCode: 404, message: "Detail data not found!" };
                    }
                }
                else {
                    return { statusCode: 404, message: "Product data not found!" };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    ProductListbytype(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let list = yield productmodalSchema_1.default.aggregate([
                    // { "$addFields": {
                    //     "productCollection_typeid": { "$toString": "$_id" }
                    //  }},
                    { "$addFields": { "productId": { "$toString": "$_id" } } },
                    { "$addFields": { "_id": { "$toObjectId": "$_id" } } },
                    { $match: { producttype: addObject } },
                    {
                        $lookup: {
                            from: "productdetails",
                            localField: "_id",
                            foreignField: "productId",
                            pipeline: [
                            // {
                            //     $match:{}
                            // }
                            // {
                            //     $project:{
                            //         _id:1,
                            //     }
                            // }
                            ],
                            as: "productdetail"
                        }
                    }
                ]);
                return { statusCode: 200, message: "Get Collection Type Success", result: list };
            }
            catch (error) {
                throw error;
            }
        });
    }
    ProductList(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let list = yield productmodalSchema_1.default.aggregate([
                    // { "$addFields": {
                    //     "productCollection_typeid": { "$toString": "$_id" }
                    //  }},
                    { "$addFields": { "productId": { "$toString": "$_id" } } },
                    { "$addFields": { "_id": { "$toObjectId": "$_id" } } },
                    // { $match: { producttype: addObject } },
                    {
                        $lookup: {
                            from: "productdetails",
                            localField: "_id",
                            foreignField: "productId",
                            pipeline: [
                            // {
                            //     $match:{}
                            // }
                            // {
                            //     $project:{
                            //         _id:1,
                            //     }
                            // }
                            ],
                            as: "productdetail"
                        }
                    }
                ]);
                return { statusCode: 200, message: "Get Collection Type Success", result: list };
            }
            catch (error) {
                throw error;
            }
        });
    }
    ProductDetailbyMultiId(addObject, coloridarr, sizeidarr, lengthdarr, requestdata) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("addObject");
                console.log(addObject);
                const findproductList = yield productmodalSchema_1.default.find({
                    _id: {
                        $in: addObject
                    }
                });
                console.log("findproductList");
                console.log(findproductList);
                const findproductDetailList = yield ProductDetailSchema_1.default.find({
                    productId: {
                        $in: addObject
                    }
                });
                var finalresult = [];
                findproductList.forEach((es) => {
                    findproductDetailList.forEach((ex) => {
                        if (`${es._id}` === `${ex.productId}`) {
                            es['productdetail'] = ex;
                            finalresult.push({ product: es, detail: ex });
                        }
                    });
                });
                const findcolortList = yield colormodalSchema_1.default.find({
                    _id: {
                        $in: coloridarr
                    }
                });
                const findsizetList = yield sizemodalSchema_1.default.find({
                    _id: {
                        $in: sizeidarr
                    }
                });
                const findlengthtList = yield lengthmodalSchema_1.default.find({
                    _id: {
                        $in: lengthdarr
                    }
                });
                const result = [];
                var totalPrice = 0;
                finalresult.forEach((rs) => {
                    const filterdata = requestdata.filter((ed) => {
                        return `${rs.product._id}` === ed.productId;
                    });
                    totalPrice = totalPrice + (Number(rs.detail.price) * filterdata[0].quantity);
                    const colorcode = findcolortList.filter((co) => {
                        return filterdata[0].color === `${co._id}`;
                    });
                    const sizecode = findsizetList.filter((co) => {
                        return filterdata[0].size === `${co._id}`;
                    });
                    const lengthcode = findlengthtList.filter((co) => {
                        return filterdata[0].length === `${co._id}`;
                    });
                    if (filterdata.length > 0) {
                        const resultdata = {
                            product: rs.product,
                            detail: rs.detail,
                            activecolor: { id: filterdata[0].color, label: colorcode[0].code },
                            activesize: { id: filterdata[0].size, label: sizecode[0].code },
                            activelength: { id: filterdata[0].size, label: lengthcode[0].code },
                            buyquantity: filterdata[0].quantity
                        };
                        result.push(resultdata);
                    }
                });
                const realprice = totalPrice + 150 + 70 - 100;
                return { statusCode: 200, message: "Get Collection Type Success", result: result, totalprice: totalPrice, shippingCharge: 150, tax: 70, off: 100, realprice: realprice };
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateProduct(productId, productData, productDetailsData) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose.startSession();
            session.startTransaction();
            try {
                const updatedProduct = yield productmodalSchema_1.default.findByIdAndUpdate(productId, productData, { new: true, session });
                if (!updatedProduct) {
                    throw new Error('Product not found');
                }
                const updatedProductDetails = yield ProductDetailSchema_1.default.findOneAndUpdate({ productId }, productDetailsData, { new: true, session });
                if (!updatedProductDetails) {
                    throw new Error('Product details not found');
                }
                yield session.commitTransaction();
                return { updatedProduct, updatedProductDetails };
            }
            catch (error) {
                yield session.abortTransaction();
                throw error;
            }
            finally {
                session.endSession();
            }
        });
    }
}
exports.default = ProductService;
