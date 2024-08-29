"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SellProductSchema = new mongoose_1.Schema({
    userid: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "customer"
    },
    orderid: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
    },
    sellstatus: {
        type: Boolean,
        required: true,
        default: false
    },
    productlist: {
        type: [],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date
    },
    updatedAt: {
        type: Date,
        default: Date
    },
    //
});
const SellProductModel = (0, mongoose_1.model)('SellProduct', SellProductSchema);
exports.default = SellProductModel;
