import { Request, Response, response } from 'express';
import CustomerAddressService from '../services/customerAddressService';
import * as bcrypt from 'bcrypt';
const customerAddressService = new CustomerAddressService();
class CustomerAddController {

    public async AddCustomeraAddress(req: Request, res: Response) {
        try {
            const user: any = req.user
            const addObject: any = {
                userid: req.body.userid,
                name: req.body.name,
                address: req.body.address,
                city: req.body.city,
                zipcode: req.body.zipcode,
                country: req.body.country,
                landemark: req.body.landemark,
                alternatemobilenumber: req.body.alternatemobilenumber,
            }
            const response = await customerAddressService.addCustomeraddress(addObject)
            res.status(response.statusCode).send(response)
        }
        catch (error: any) {
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
    public async getCustomerAddressByuserId(req: Request, res: Response) {
        try {
            const response = await customerAddressService.getCustomeraddressByid(req.params.id)
            res.status(response.statusCode).send(response)
        }
        catch (error) {
            res.status(500).json({
                error
            })
        }
    }
    
    // public async getallCustomer(req: Request, res: Response) {
    //     try {
    //         const response = await customerService.getallCustomer()
    //         res.status(response.statusCode).send(response)
    //     }
    //     catch (error) {
    //         res.status(500).json({
    //             error
    //         })
    //     }
    // }
}

export default CustomerAddController;