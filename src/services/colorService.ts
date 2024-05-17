import ColorModal from '../modal/colormodalSchema';
interface IAuthService {

}

class ColorService implements IAuthService {
    public async addColor(addObject: any) {
        try {
            const responsefindUserDetail = await ColorModal.find(
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
                return { statusCode: 400, message: `Color name or Color Code match try another!` }
            }
            else{
                const addcolorresponse = await ColorModal.create(addObject)
                if(addcolorresponse){
                    return { statusCode: 201, message: 'Color Add successfully!'}

                }
                else{
                    return { statusCode: 400, message: 'Color Add Failed!'}
 
                }

            }
        }
        catch (error) {
            throw error
        }
    }
    public async RemoveColor (addObject:any){
        try{
            const addcolorresponse = await ColorModal.findByIdAndDelete(addObject.colorid)
            if(addcolorresponse){
                return { statusCode: 200, message: 'Color Remove successfully!'}

            }
            else{
                return { statusCode: 400, message: 'Color Remove Failed!'}
            }

        }
        catch(error){
            throw error
        }
    }
    public async getcolor (){
        try{
            const getcolorresponse = await ColorModal.find()
            return {statusCode:200,message:"Get Color Success",result:getcolorresponse}
 
        }
        catch(error){
            throw error
        }
    }
}

export default ColorService;