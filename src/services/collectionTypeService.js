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
const collectiontypeSchema_1 = __importDefault(require("../modal/collectiontypeSchema"));
const productmodalSchema_1 = __importDefault(require("../modal/productmodalSchema"));
const ProductDetailSchema_1 = __importDefault(require("../modal/ProductDetailSchema"));
const colormodalSchema_1 = __importDefault(require("../modal/colormodalSchema"));
const sizemodalSchema_1 = __importDefault(require("../modal/sizemodalSchema"));
const lengthmodalSchema_1 = __importDefault(require("../modal/lengthmodalSchema"));
class CollectionService {
    addColor(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responsefindUserDetail = yield collectiontypeSchema_1.default.find({
                    name: addObject.name
                });
                console.log(responsefindUserDetail);
                if ((responsefindUserDetail === null || responsefindUserDetail === void 0 ? void 0 : responsefindUserDetail.length) > 0) {
                    return { statusCode: 400, message: `Collection Type name  match try another!` };
                }
                else {
                    const addcolorresponse = yield collectiontypeSchema_1.default.create(addObject);
                    if (addcolorresponse) {
                        return { statusCode: 201, message: 'Collection Type Add successfully!' };
                    }
                    else {
                        return { statusCode: 400, message: 'Collection Type Add Failed!' };
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    RemoveCollection(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addcolorresponse = yield collectiontypeSchema_1.default.findByIdAndDelete(addObject.id);
                if (addcolorresponse) {
                    return { statusCode: 200, message: 'Collection Type Remove successfully!' };
                }
                else {
                    return { statusCode: 400, message: 'Collection Type Remove Failed!' };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    getcolor() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getcolorresponse = yield collectiontypeSchema_1.default.find();
                return { statusCode: 200, message: "Get Collection Type Success", result: getcolorresponse };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // updateCollection
    updateCollection(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addlengthresponse = yield collectiontypeSchema_1.default.findByIdAndUpdate(addObject.id, { name: addObject.name });
                if (addlengthresponse) {
                    return { statusCode: 200, message: 'Collection Update successfully!' };
                }
                else {
                    return { statusCode: 400, message: 'Collection Update Failed!' };
                }
            }
            catch (error) {
            }
        });
    }
    getCollectiontypewithproduct() {
        return __awaiter(this, void 0, void 0, function* () {
            // try{
            //    let list= await CollectionModal.aggregate([
            //     // { "$addFields": {
            //     //     "productCollection_typeid": { "$toString": "$_id" }
            //     //  }},
            //     {"$addFields":{"productCollection_typeid":{"$toString":"$_id"}}},
            //     {"$addFields":{"_id":{"$toObjectId":"$_id"}}}, 
            //     {
            //         $lookup: {
            //             from:"products",
            //             localField: "_id",
            //             foreignField: "productCollection_typeid",
            //             pipeline:[
            //                 // {
            //                 //     $match:{}
            //                 // }
            //                 // {
            //                 //     $project:{
            //                 //         _id:1,
            //                 //     }
            //                 // }
            //             ],
            //             as:"productlist"
            //         }
            //     }
            //    ])
            //    return {statusCode:200,message:"Get Collection Type Success",result:list}
            // }
            // catch(error){
            //     throw error
            // }
            try {
                // Fetch all collection types
                const collections = yield collectiontypeSchema_1.default.find();
                // For each collection, fetch its products and details
                const collectionsWithProducts = yield Promise.all(collections.map((collection) => __awaiter(this, void 0, void 0, function* () {
                    // Find products for this collection
                    const products = yield productmodalSchema_1.default.find({ productCollection_typeid: collection._id });
                    // Fetch detailed information for each product
                    const productsWithDetails = yield Promise.all(products.map((product) => __awaiter(this, void 0, void 0, function* () {
                        const productDetail = yield ProductDetailSchema_1.default.findOne({ productId: product._id });
                        if (!productDetail) {
                            return Object.assign(Object.assign({}, product.toObject()), { details: null });
                        }
                        // Fetch color details
                        const colors = yield colormodalSchema_1.default.find({ _id: { $in: productDetail.colorid.flat() } });
                        // Fetch size details
                        const sizes = yield sizemodalSchema_1.default.find({ _id: { $in: productDetail.sizeid.flat() } });
                        // Fetch length details
                        const lengths = yield lengthmodalSchema_1.default.find({ _id: { $in: productDetail.lengthid.flat() } });
                        return Object.assign(Object.assign({}, product.toObject()), { details: Object.assign(Object.assign({}, productDetail.toObject()), { colors,
                                sizes,
                                lengths }) });
                    })));
                    return {
                        collection: collection.toObject(),
                        products: productsWithDetails
                    };
                })));
                // res.json(collectionsWithProducts);
                return { statusCode: 200, message: "Get Collection Type Success", result: collectionsWithProducts };
            }
            catch (error) {
                console.error('Error fetching collections and products:', error);
                throw error;
                // res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.default = CollectionService;
