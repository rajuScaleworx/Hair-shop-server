"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GuestCartSchema = new mongoose_1.Schema({
    guestId: {
        type: String,
        required: true
    },
    cart: [{
            color: String,
            size: String,
            length: String,
            productId: String,
            quantity: Number
        }],
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
const GuestCartModal = (0, mongoose_1.model)('guestcart', GuestCartSchema);
exports.default = GuestCartModal;
