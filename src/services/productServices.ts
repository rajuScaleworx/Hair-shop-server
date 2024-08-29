import ProductModal from '../modal/productmodalSchema';
import ProductDetailModal from '../modal/ProductDetailSchema';
import ColorModal from '../modal/colormodalSchema';
import SizeModal from '../modal/sizemodalSchema';
import LengthModal from '../modal/lengthmodalSchema';
import { Document, model, Schema, Types } from 'mongoose';
const mongoose = require('mongoose');

interface IAuthService {

}

class ProductService implements IAuthService {
    public async addProduct(addObject: any, productDetail: any) {
        try {
            const responsefindUserDetail = await ProductModal.find(
                {
                    name: addObject.name
                }
            )
            if (responsefindUserDetail?.length > 0) {
                return { statusCode: 400, message: `Product name match try another!` }
            }
            else {
                const addcolorresponse = await ProductModal.create(addObject)
                // console.log(addcolorresponse)
                if (addcolorresponse) {
                    productDetail.productId = addcolorresponse._id
                    const productDetailres: any = await ProductDetailModal.create(productDetail)
                    if (productDetailres) {
                        console.log(productDetailres)
                        return { statusCode: 201, message: 'Product Add successfully!' }

                    }
                    else {
                        return { statusCode: 400, message: 'Product Add Failed!' }
                    }
                }
                else {
                }
            }
        }
        catch (error) {
            throw error
        }
    }
    public async ProductDetailbyId(addObject: any) {
        try {
            const product = await ProductModal.findById(addObject)
            if (product) {
                const productDetail: any = await ProductDetailModal.findOne({ productId: product._id })
                if (productDetail) {
                    const colorarray = productDetail.colorid[0];
                    const sizearray = productDetail.sizeid[0];
                    const lengtharray = productDetail.lengthid[0];
                    console.log(colorarray[0])
                    const findPerformances = await ColorModal.find({
                        _id: {
                            $in: colorarray
                        }
                    });
                    const findPerformancessize = await SizeModal.find({
                        _id: {
                            $in: sizearray
                        }
                    });
                    const findPerformanceslength = await LengthModal.find({
                        _id: {
                            $in: lengtharray
                        }
                    });
                    return { statusCode: 200, data: { product: product, detail: productDetail, colors: findPerformances, sizes: findPerformancessize, lengths: findPerformanceslength } }
                }
                else {
                    return { statusCode: 404, message: "Detail data not found!" }

                }
            }
            else {
                return { statusCode: 404, message: "Product data not found!" }
            }
        }
        catch (error) {
            throw error
        }
    }
    public async ProductDetailbyIdAdmin(addObject: any) {
        try {
            const product = await ProductModal.findById(addObject)
            if (product) {
                const productDetail: any = await ProductDetailModal.findOne({ productId: product._id })
                if (productDetail) {
                    return { statusCode: 200, data: {message:"Product Data Found!", product: product, detail: productDetail } }
                }
                else {
                    return { statusCode: 404, message: "Detail data not found!" }
                }
            }
            else {
                return { statusCode: 404, message: "Product data not found!" }
            }
        }
        catch (error) {
            throw error
        }
    }
    public async ProductListbytype(addObject: any) {
        try {
            let list = await ProductModal.aggregate([
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
            ])
            return { statusCode: 200, message: "Get Collection Type Success", result: list }
        }
        catch (error) {
            throw error
        }
    }
    public async ProductList(addObject: any) {
        try {
            let list = await ProductModal.aggregate([
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
            ])
            return { statusCode: 200, message: "Get Collection Type Success", result: list }
        }
        catch (error) {
            throw error
        }
    }
    public async ProductDetailbyMultiId(addObject: any, coloridarr: any, sizeidarr: any, lengthdarr: any, requestdata: any) {
        try {
            console.log("addObject")
            console.log(addObject)
            const findproductList = await ProductModal.find({
                _id: {
                    $in: addObject
                }
            });
            console.log("findproductList")
            console.log(findproductList)
            const findproductDetailList = await ProductDetailModal.find({
                productId: {
                    $in: addObject
                }
            });
            var finalresult: any = []
            findproductList.forEach((es: any) => {
                findproductDetailList.forEach((ex) => {
                    if (`${es._id}` === `${ex.productId}`) {
                        es['productdetail'] = ex;
                        finalresult.push({ product: es, detail: ex })
                    }
                })
            })

            const findcolortList = await ColorModal.find({
                _id: {
                    $in: coloridarr
                }
            });
            const findsizetList = await SizeModal.find({
                _id: {
                    $in: sizeidarr
                }
            });
            const findlengthtList = await LengthModal.find({
                _id: {
                    $in: lengthdarr
                }
            });
            const result: any = [];
            var totalPrice: number = 0;
            finalresult.forEach((rs: any) => {
                const filterdata = requestdata.filter((ed: any) => {
                    return `${rs.product._id}` === ed.productId
                })
                totalPrice = totalPrice + (Number(rs.detail.price) * filterdata[0].quantity)

                const colorcode = findcolortList.filter((co: any) => {
                    return filterdata[0].color === `${co._id}`
                })
                const sizecode = findsizetList.filter((co: any) => {
                    return filterdata[0].size === `${co._id}`
                })
                const lengthcode = findlengthtList.filter((co: any) => {
                    return filterdata[0].length === `${co._id}`
                })
                if (filterdata.length > 0) {
                    const resultdata = {
                        product: rs.product,
                        detail: rs.detail,
                        activecolor: { id: filterdata[0].color, label: colorcode[0].code },
                        activesize: { id: filterdata[0].size, label: sizecode[0].code },
                        activelength: { id: filterdata[0].size, label: lengthcode[0].code },
                        buyquantity: filterdata[0].quantity

                    }
                    result.push(resultdata)
                }
            })
            const realprice = totalPrice + 150 + 70 - 100

            return { statusCode: 200, message: "Get Collection Type Success", result: result, totalprice: totalPrice, shippingCharge: 150, tax: 70, off: 100, realprice: realprice }
        }
        catch (error) {
            throw error
        }
    }
    public async updateProduct(productId: any, productData: any, productDetailsData: any) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const updatedProduct = await ProductModal.findByIdAndUpdate(
                productId,
                productData,
                { new: true, session }
            );

            if (!updatedProduct) {
                throw new Error('Product not found');
            }

            const updatedProductDetails = await ProductDetailModal.findOneAndUpdate(
                { productId },
                productDetailsData,
                { new: true, session }
            );

            if (!updatedProductDetails) {
                throw new Error('Product details not found');
            }

            await session.commitTransaction();
            return { updatedProduct, updatedProductDetails };
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }

    }
}

export default ProductService;