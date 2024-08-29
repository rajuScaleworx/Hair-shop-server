"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    userid: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "customer"
    },
    orderid: {
        type: String,
        required: true,
    },
    addressid: {
        type: String,
    },
    razorpay_payment_id: {
        type: String,
    },
    razorpay_order_id: {
        type: String,
    },
    razorpay_signature: {
        type: String,
    },
    price: {
        type: String,
        required: true
    },
    paymentstatus: {
        type: Boolean,
        required: true,
        default: false
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
const PaymentModel = (0, mongoose_1.model)('payment', PaymentSchema);
exports.default = PaymentModel;
