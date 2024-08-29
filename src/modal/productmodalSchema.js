"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    producttypeId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "producttype"
    },
    producttype: {
        type: String,
        required: true,
        ref: "producttype"
    },
    productcategoryname: {
        type: String,
        required: true,
        ref: "productcategory"
    },
    productcategoryid: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "productcategory"
    },
    productCollection_typeid: {
        type: String,
        ref: "collection_type"
    },
    productCollection_type: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
const ProductModal = (0, mongoose_1.model)('product', ProductSchema);
exports.default = ProductModal;
