import SizeModal from '../modal/sizemodalSchema';
interface IAuthService {

}

class SizeService implements IAuthService {
    public async addSize(addObject: any) {
        try {
            const responsefindUserDetail = await SizeModal.find(
                {
                    $or: [
                        {
                            name: addObject.name
                        },
                        {
                            nickname: addObject.code
                        }
                    ],
                }
            )
            console.log(responsefindUserDetail)
            if (responsefindUserDetail?.length>0) {
                return { statusCode: 400, message: `Size name or Size Code match try another!` }
            }
            else{
                const addcolorresponse = await SizeModal.create(addObject)
                if(addcolorresponse){
                    return { statusCode: 201, message: 'Size Add successfully!'}

                }
                else{
                    return { statusCode: 400, message: 'Size Add Failed!'}
                }
            }
        }
        catch (error) {
            throw error
        }
    }
    public async RemoveSize (addObject:any){
        try{
            const addsizeresponse = await SizeModal.findByIdAndDelete(addObject.lengthid)
            if(addsizeresponse){
                return { statusCode: 200, message: 'Size Remove successfully!'}
            }
            else{
                return { statusCode: 400, message: 'Size Remove Failed!'}
            }
        }
        catch(error){
            throw error
        }
    }
    public async getsize (){
        try{
            const getsizeresponse = await SizeModal.find();
            return {statusCode:200,message:"Get Size Success",result:getsizeresponse}
        }
        catch(error){
            throw error
        }
    }
}

export default SizeService;