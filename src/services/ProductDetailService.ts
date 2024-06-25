import ProductDetailModal from '../modal/ProductDetailSchema';
import ProductModal from '../modal/productmodalSchema';
interface IAuthService {

}

class ProductDetailService implements IAuthService {
    public async addProductDetail(addObject: any) {
        try {
            const findproduct = await ProductModal.findById(addObject.productId)
            if (findproduct) {
                const addcolorresponse = await ProductDetailModal.create(addObject)
                console.log(addcolorresponse)
                if (addcolorresponse) {
                    return { statusCode: 201, message: 'ProductDetail Add successfully!' }
                }
                else {
                    return { statusCode: 400, message: 'ProductDetail Add Failed!' }
                }
            }
            else {
                return { statusCode: 400, message: 'Product Not Found!' }

            }


        }
        catch (error) {
            throw error
        }
    }

    public async UploadImageByproductId(addObject: any) {
        try {
            const findproduct = await ProductModal.findById(addObject.productId)
            console.log("findproduct")
            console.log(findproduct)
            if (findproduct) {
                const addcolorresponse = await ProductDetailModal.findOneAndUpdate({productId:findproduct._id}, { $set: { image: addObject.image } })
                console.log(addcolorresponse)
                if (addcolorresponse) {
                    return { statusCode: 201, message: 'ProductDetail Add successfully!' }
                }
                else{
                    return { statusCode: 400, message: 'ProductDetail Add Failed!' }
                }

            }
        }
        catch (error) {
            throw error
        }
    }
    

    // public async RemoveProductCategory (addObject:any){
    //     try{
    //         const addProductCategoryresponse = await ProductModal.findByIdAndDelete(addObject.lengthid)
    //         if(addProductCategoryresponse){
    //             return { statusCode: 200, message: 'ProductCategory Remove successfully!'}
    //         }
    //         else{
    //             return { statusCode: 400, message: 'ProductCategory Remove Failed!'}
    //         }
    //     }
    //     catch(error){
    //         throw error
    //     }
    // }
    // public async getallProductCategory (){
    //     try{
    //         const getProductTyperesponse = await ProductModal.find();
    //         return {statusCode:200,message:"Get ProductCategory Success",result:getProductTyperesponse}
    //     }
    //     catch(error){
    //         throw error
    //     }
    // }
}

export default ProductDetailService;