import ProductTypeModal from '../modal/productTypemodalSchema';
interface IAuthService {

}

class ProductTypeService implements IAuthService {
    public async addProductType(addObject: any) {
        try {
            const responsefindUserDetail = await ProductTypeModal.find(
                {
                    name: addObject.name
                }
            )
            console.log(responsefindUserDetail)
            if (responsefindUserDetail?.length>0) {
                return { statusCode: 400, message: `ProductTypeModal name match try another!` }
            }
            else{
                const addcolorresponse = await ProductTypeModal.create(addObject)
                if(addcolorresponse){
                    return { statusCode: 201, message: 'ProductType Add successfully!'}

                }
                else{
                    return { statusCode: 400, message: 'ProductType Add Failed!'}
                }
            }
        }
        catch (error) {
            throw error
        }
    }
    public async RemoveProductType (addObject:any){
        try{
            const addlengthresponse = await ProductTypeModal.findByIdAndDelete(addObject.lengthid)
            if(addlengthresponse){
                return { statusCode: 200, message: 'ProductType Remove successfully!'}
            }
            else{
                return { statusCode: 400, message: 'ProductType Remove Failed!'}
            }
        }
        catch(error){
            throw error
        }
    }
    public async getallProductType (){
        try{
            const getProductTyperesponse = await ProductTypeModal.find();
            return {statusCode:200,message:"Get ProductType Success",result:getProductTyperesponse}
        }
        catch(error){
            throw error
        }
    }
}

export default ProductTypeService;