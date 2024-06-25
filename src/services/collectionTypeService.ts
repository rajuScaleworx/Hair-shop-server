import CollectionModal from '../modal/collectiontypeSchema';

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
    public async getCollectiontypewithproduct() {
        try{
           let list= await CollectionModal.aggregate([
            // { "$addFields": {
            //     "productCollection_typeid": { "$toString": "$_id" }
            //  }},
            {"$addFields":{"productCollection_typeid":{"$toString":"$_id"}}},
            {"$addFields":{"_id":{"$toObjectId":"$_id"}}}, 
            {
                $lookup: {
                    from:"products",
                    localField: "_id",
                    foreignField: "productCollection_typeid",
                    pipeline:[
                        // {
                        //     $match:{}
                        // }
                        // {
                        //     $project:{
                        //         _id:1,
                        //     }
                        // }
                    ],
                    as:"productlist"
                }
            }
           ])
           return {statusCode:200,message:"Get Collection Type Success",result:list}
        }
        catch(error){
            throw error
        }
    }
}

export default CollectionService;