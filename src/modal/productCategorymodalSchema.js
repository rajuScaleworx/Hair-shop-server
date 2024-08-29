"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    },
    producttype: {
        type: String,
        required: true,
    },
    producttypeid: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "producttype"
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "user"
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
const ProductCategoryModal = (0, mongoose_1.model)('productcategory', ProductCategorySchema);
exports.default = ProductCategoryModal;
