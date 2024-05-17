import TokenService from '../services/tokenservice'

const tokenService=new TokenService()
class Utils {
    public createToken(tokenobject:any){
        const response =tokenService.createToken(tokenobject)
        return response
    }
}
export default Utils;