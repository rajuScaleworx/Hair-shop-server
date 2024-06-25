import { Request, Response, response } from 'express';
import CustomerService from '../services/customerServices';
import * as bcrypt from 'bcrypt';
import generator from 'generate-password';
const customerService = new CustomerService();
class CustomerController {

    public async AddCustomer(req: Request, res: Response) {
        try {
            const user: any = req.user
            const addObject: any = {
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                password: generator.generate({length: 10, numbers: true}),
                usertype: req.body.usertype,
                active: true,
            }
            const response = await customerService.addCustomer(addObject)
            res.status(response.statusCode).send(response)
        }
        catch (error: any) {
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
    public async getCustomerByid(req: Request, res: Response) {
        try {
            const response = await customerService.getCustomerByid(req.params.id)
            res.status(response.statusCode).send(response)
        }
        catch (error) {
            res.status(500).json({
                error
            })
        }
    }
    public async getallCustomer(req: Request, res: Response) {
        try {
            const response = await customerService.getallCustomer()
            res.status(response.statusCode).send(response)
        }
        catch (error) {
            res.status(500).json({
                error
            })
        }
    }
}

export default CustomerController;