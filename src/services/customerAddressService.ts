import CustomerAddModal from '../modal/customeraddressSchem';
interface IAuthService {

}

class CustomerAddressService implements IAuthService {
    public async addCustomeraddress(addObject: any) {
        try {
            // const responsefindUserDetail = await CustomerAddModal.find(
            //     {
            //         $or: [
            //             {
            //                 email: addObject.email
            //             },
            //             {
            //                 mobile: addObject.mobile
            //             }
            //         ],
            //     }
            // )
            // console.log(responsefindUserDetail)
            // if (responsefindUserDetail?.length>0) {
            //     return { statusCode: 400, message: `email name or mobile match try another!` }
            // }
          //  else{
                const addcolorresponse = await CustomerAddModal.create(addObject)
                if(addcolorresponse){
                    return { statusCode: 201, message: 'Customer Add successfully!',result:addcolorresponse}

                }
                else{
                    return { statusCode: 400, message: 'Customer Add Failed!'}
                }
          //  }
        }
        catch (error) {
            throw error
        }
    }
    public async getCustomeraddressByid (id:any){
        try{
            const getCustomer = await CustomerAddModal.find({userid:id});
            return {statusCode:200,message:"Get Customer Success",result:getCustomer}
        }
        catch(error){
            throw error
        }
    }
    // public async getallCustomer (){
    //     try{
    //         const getCustomer = await CustomerModel.find();
    //         return {statusCode:200,message:"Get Customer Success",result:getCustomer}
    //     }
    //     catch(error){
    //         throw error
    //     }
    // }
}

export default CustomerAddressService;