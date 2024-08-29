import ProductCategoryModal from '../modal/productCategorymodalSchema';
interface IAuthService {

}

class ProductCategoryService implements IAuthService {
    public async addProductCategory(addObject: any) {
        try {
            const responsefindUserDetail = await ProductCategoryModal.find(
                {
                    name: addObject.name
                }
            )
            console.log(responsefindUserDetail)
            if (responsefindUserDetail?.length>0) {
                return { statusCode: 400, message: `ProductCategory name match try another!` }
            }
            else{
                const addcolorresponse = await ProductCategoryModal.create(addObject)
                if(addcolorresponse){
                    return { statusCode: 201, message: 'ProductCategory Add successfully!'}

                }
                else{
                    return { statusCode: 400, message: 'ProductCategory Add Failed!'}
                }
            }
        }
        catch (error) {
            throw error
        }
    }
    public async RemoveProductCategory (addObject:any){
        try{
            const addProductCategoryresponse = await ProductCategoryModal.findByIdAndDelete(addObject.lengthid)
            if(addProductCategoryresponse){
                return { statusCode: 200, message: 'ProductCategory Remove successfully!'}
            }
            else{
                return { statusCode: 400, message: 'ProductCategory Remove Failed!'}
            }
        }
        catch(error){
            throw error
        }
    }
    public async getallProductCategory (){
        try{
            const getProductTyperesponse = await ProductCategoryModal.find();
            return {statusCode:200,message:"Get ProductCategory Success",result:getProductTyperesponse}
        }
        catch(error){
            throw error
        }
    }
    // updateProductCategory
    public async updateProductCategory(addObject:any){
        try{
            const addlengthresponse = await ProductCategoryModal.findByIdAndUpdate(addObject.id,{name:addObject.name,producttype:addObject.producttype,producttypeid:addObject.producttypeid})
            if(addlengthresponse){
                return { statusCode: 200, message: 'ProductCategory Update successfully!'}
            }
            else{
                return { statusCode: 400, message: 'ProductCategory Update Failed!'}
            }
        }
        catch(error){

        }
    }
}

export default ProductCategoryService;