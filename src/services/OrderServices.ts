import SellProductModel from '../modal/sellProductSchema';
interface IAuthService {

}

class OrderService implements IAuthService {
    public async GetOrderList(addObject: any) {
        try {
            const responsefindUserDetail = await SellProductModel.find(
                {
                    $and: [
                        {
                            userid: addObject.userid
                        },
                        {
                            sellstatus: true
                        }
                    ],
                }
            )
            console.log(responsefindUserDetail)
            if (responsefindUserDetail) {
                return { statusCode: 200, message: 'List fetch successfully!',result:responsefindUserDetail}

            }
            else{
                return { statusCode: 400, message: `Length name or Length Code match try another!` }
            }
        }
        catch (error) {
            throw error
        }
    }
   
}

export default OrderService;