import CustomerModel from '../modal/customerSchema';
interface IAuthService {

}

class CustomerService implements IAuthService {
    public async addCustomer(addObject: any) {
        try {
            const responsefindUserDetail = await CustomerModel.find(
                {
                    $or: [
                        {
                            email: addObject.email
                        },
                        {
                            mobile: addObject.mobile
                        }
                    ],
                }
            )
            console.log(responsefindUserDetail)
            if (responsefindUserDetail?.length>0) {
                return { statusCode: 400, message: `email name or mobile match try another!` }
            }
            else{
                const addcolorresponse = await CustomerModel.create(addObject)
                if(addcolorresponse){
                    return { statusCode: 201, message: 'Customer Add successfully!',result:addcolorresponse}

                }
                else{
                    return { statusCode: 400, message: 'Customer Add Failed!'}
                }
            }
        }
        catch (error) {
            throw error
        }
    }
    public async getCustomerByid (id:any){
        try{
            const getCustomer = await CustomerModel.findById(id);
            return {statusCode:200,message:"Get Customer Success",result:getCustomer}
        }
        catch(error){
            throw error
        }
    }
    public async getallCustomer (){
        try{
            const getCustomer = await CustomerModel.find();
            return {statusCode:200,message:"Get Customer Success",result:getCustomer}
        }
        catch(error){
            throw error
        }
    }
}

export default CustomerService;