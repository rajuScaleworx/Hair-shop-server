import { Document, model, Schema, Types } from 'mongoose';


export interface IProductDetail extends Document {
    colorid: [];
    sizeid: [];
    lengthid: [];
    productId: string;
    createdAt: Date;
    updatedAt: Date;
}
const ProductDetailSchema = new Schema({
    price:{
        type: String,
        required: true,
    },
    image:{
        type: [],
        required:true
    },
    maxbuycount:{type:String,required:true},
    colorid: [{ type: [], required: true }],
    sizeid: [{ type: [], required: true }],
    lengthid: [{ type: [], required: true }],
    productId: { type: Types.ObjectId, ref: 'product', required: true },
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
})
const ProductDetailModal = model<IProductDetail>('productdetail',ProductDetailSchema);
export default ProductDetailModal;

