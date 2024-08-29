import CollectionModal from '../modal/collectiontypeSchema';
import ProductModal from '../modal/productmodalSchema';
import ProductDetailModal from '../modal/ProductDetailSchema';
import ColorModal from '../modal/colormodalSchema';
import SizeModal from '../modal/sizemodalSchema';
import LengthModal from '../modal/lengthmodalSchema';
interface IAuthService {

}

class CollectionService implements IAuthService {
    public async addColor(addObject: any) {
        try {
            const responsefindUserDetail = await CollectionModal.find(
                {
                    name: addObject.name
                }
            )
            console.log(responsefindUserDetail)
            if (responsefindUserDetail?.length > 0) {
                return { statusCode: 400, message: `Collection Type name  match try another!` }
            }
            else {
                const addcolorresponse = await CollectionModal.create(addObject)
                if (addcolorresponse) {
                    return { statusCode: 201, message: 'Collection Type Add successfully!' }

                }
                else {
                    return { statusCode: 400, message: 'Collection Type Add Failed!' }

                }

            }
        }
        catch (error) {
            throw error
        }
    }
    public async RemoveCollection(addObject: any) {
        try {
            const addcolorresponse = await CollectionModal.findByIdAndDelete(addObject.id)
            if (addcolorresponse) {
                return { statusCode: 200, message: 'Collection Type Remove successfully!' }

            }
            else {
                return { statusCode: 400, message: 'Collection Type Remove Failed!' }
            }

        }
        catch (error) {
            throw error
        }
    }
    public async getcolor() {
        try {
            const getcolorresponse = await CollectionModal.find()
            return { statusCode: 200, message: "Get Collection Type Success", result: getcolorresponse }

        }
        catch (error) {
            throw error
        }
    }
    // updateCollection
    public async updateCollection(addObject:any){
        try{
            const addlengthresponse = await CollectionModal.findByIdAndUpdate(addObject.id,{name:addObject.name})
            if(addlengthresponse){
                return { statusCode: 200, message: 'Collection Update successfully!'}
            }
            else{
                return { statusCode: 400, message: 'Collection Update Failed!'}
            }
        }
        catch(error){

        }
    }
    public async getCollectiontypewithproduct() {
        // try{
        //    let list= await CollectionModal.aggregate([
        //     // { "$addFields": {
        //     //     "productCollection_typeid": { "$toString": "$_id" }
        //     //  }},
        //     {"$addFields":{"productCollection_typeid":{"$toString":"$_id"}}},
        //     {"$addFields":{"_id":{"$toObjectId":"$_id"}}}, 
        //     {
        //         $lookup: {
        //             from:"products",
        //             localField: "_id",
        //             foreignField: "productCollection_typeid",
        //             pipeline:[
        //                 // {
        //                 //     $match:{}
        //                 // }
        //                 // {
        //                 //     $project:{
        //                 //         _id:1,
        //                 //     }
        //                 // }
        //             ],
        //             as:"productlist"
        //         }
        //     }
        //    ])
        //    return {statusCode:200,message:"Get Collection Type Success",result:list}
        // }
        // catch(error){
        //     throw error
        // }

        try {
            // Fetch all collection types
            const collections = await CollectionModal.find();
        
            // For each collection, fetch its products and details
            const collectionsWithProducts = await Promise.all(collections.map(async (collection) => {
              // Find products for this collection
              const products = await ProductModal.find({ productCollection_typeid: collection._id });
        
              // Fetch detailed information for each product
              const productsWithDetails = await Promise.all(products.map(async (product) => {
                const productDetail = await ProductDetailModal.findOne({ productId: product._id });
                
                if (!productDetail) {
                  return { ...product.toObject(), details: null };
                }
        
                // Fetch color details
                const colors = await ColorModal.find({ _id: { $in: productDetail.colorid.flat() } });
        
                // Fetch size details
                const sizes = await SizeModal.find({ _id: { $in: productDetail.sizeid.flat() } });
        
                // Fetch length details
                const lengths = await LengthModal.find({ _id: { $in: productDetail.lengthid.flat() } });
        
                return {
                  ...product.toObject(),
                  details: {
                    ...productDetail.toObject(),
                    colors,
                    sizes,
                    lengths
                  }
                };
              }));
        
              return {
                collection: collection.toObject(),
                products: productsWithDetails
              };
            }));
        
            // res.json(collectionsWithProducts);
         return {statusCode:200,message:"Get Collection Type Success",result:collectionsWithProducts}

          } catch (error) {
            console.error('Error fetching collections and products:', error);

            throw error
            // res.status(500).json({ message: 'Internal server error' });
          }
    }
}

export default CollectionService;