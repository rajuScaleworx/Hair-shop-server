"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    uniquecode: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    countrycode: {
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
    role: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },
    //
    lastlogin: {
        type: Date,
        default: new Date()
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
const UserModel = (0, mongoose_1.model)('user', UserSchema);
exports.default = UserModel;
