import { Document, model, Schema, Types } from 'mongoose';
export interface IColor extends Document {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
const CollectionSchema = new Schema({
    name: {
        type: String,
        unique:true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    active:{
        type: String,
        default:true,
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
},
    {
        timestamps: true
    }
)

const CollectionModal = model<IColor>('collection_type',CollectionSchema);
export default CollectionModal;


