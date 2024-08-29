"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CustomerAddSchema = new mongoose_1.Schema({
    userid: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "customer"
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        unique: true,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    landemark: {
        type: String,
        required: true
    },
    alternatemobilenumber: {
        type: String,
        required: true
    },
    active: {
        type: String,
        default: true,
        required: true
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
const CustomerAddModal = (0, mongoose_1.model)('customer_address', CustomerAddSchema);
exports.default = CustomerAddModal;
