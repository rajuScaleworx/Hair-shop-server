import { Document, model, Schema, Types } from 'mongoose';


export interface IProductType extends Document {
    name: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
const ProductTypeSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
},
{
    timestamps: true
}
);

const ProductTypeModal=model<IProductType>('producttype',ProductTypeSchema)
export default ProductTypeModal;
