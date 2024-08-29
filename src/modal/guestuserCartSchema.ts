import { Document, model, Schema, Types } from 'mongoose';
export interface ILength extends Document {
    guestId: string;
    cart: [{
        color: String,
        size: String,
        length: String,
        productId: String,
        quantity: Number
    }];
    createdAt: Date;
    updatedAt: Date;
}

const GuestCartSchema = new Schema({
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
},
    {
        timestamps: true
    }
)

const GuestCartModal = model<ILength>('guestcart', GuestCartSchema);
export default GuestCartModal;


