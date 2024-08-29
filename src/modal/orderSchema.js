"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    userid: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "customer"
    },
    orderid: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    currency: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
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
const OrderModel = (0, mongoose_1.model)('order', OrderSchema);
exports.default = OrderModel;
