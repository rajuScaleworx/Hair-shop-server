"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    usertype: {
        type: String,
        required: true
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
const CustomerModel = (0, mongoose_1.model)('customer', CustomerSchema);
exports.default = CustomerModel;
