"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ColorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    description: {
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
const ColorModal = (0, mongoose_1.model)('color', ColorSchema);
exports.default = ColorModal;
