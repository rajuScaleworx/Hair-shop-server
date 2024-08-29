import LengthModal from '../modal/lengthmodalSchema';
interface IAuthService {

}

class ColorService implements IAuthService {
    public async addLength(addObject: any) {
        try {
            const responsefindUserDetail = await LengthModal.find(
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
                return { statusCode: 400, message: `Length name or Length Code match try another!` }
            }
            else{
                const addcolorresponse = await LengthModal.create(addObject)
                if(addcolorresponse){
                    return { statusCode: 201, message: 'Length Add successfully!'}

                }
                else{
                    return { statusCode: 400, message: 'Length Add Failed!'}
                }
            }
        }
        catch (error) {
            throw error
        }
    }
    public async RemoveLength (addObject:any){
        try{
            const addlengthresponse = await LengthModal.findByIdAndDelete(addObject.lengthid)
            if(addlengthresponse){
                return { statusCode: 200, message: 'Length Remove successfully!'}
            }
            else{
                return { statusCode: 400, message: 'Length Remove Failed!'}
            }
        }
        catch(error){
            throw error
        }
    }
    public async getlength (){
        try{
            const getlengthresponse = await LengthModal.find();
            return {statusCode:200,message:"Get Color Success",result:getlengthresponse}
        }
        catch(error){
            throw error
        }
    }
    // updateLength
    public async updateLength(addObject:any){
        try{
            const addlengthresponse = await LengthModal.findByIdAndUpdate(addObject.id,{name:addObject.name,description:addObject.desc,code:addObject.code})
            if(addlengthresponse){
                return { statusCode: 200, message: 'Size Update successfully!'}
            }
            else{
                return { statusCode: 400, message: 'Size Update Failed!'}
            }
        }
        catch(error){

        }
    }
}

export default ColorService;