"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductDetailSchema = new mongoose_1.Schema({
    price: {
        type: String,
        required: true,
    },
    image: {
        type: [],
        required: true
    },
    maxbuycount: { type: String, required: true },
    colorid: [{ type: [], required: true }],
    sizeid: [{ type: [], required: true }],
    lengthid: [{ type: [], required: true }],
    productId: { type: mongoose_1.Types.ObjectId, ref: 'product', required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true
});
const ProductDetailModal = (0, mongoose_1.model)('productdetail', ProductDetailSchema);
exports.default = ProductDetailModal;
