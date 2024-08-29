import { Request, Response, response } from 'express';
import LengthService from '../services/lengthService';
import * as bcrypt from 'bcrypt';
import GuestCartModal from '../modal/guestuserCartSchema';
const lengthService = new LengthService();
class GuestController {

    public async addGuestCart(req: Request, res: Response) {
        const { cart, guestId } = req.body;
        console.log(req.body)
        const request:any=req
        try {
          if (req.user) {
            request.user.cart = cart;
            await request.user.save();
          } else if (guestId) {
            await GuestCartModal.findOneAndUpdate(
              { guestId },
              { cart },
              { upsert: true, new: true }
            );
          }
          res.json({ success: true });
        } catch (error) {
          res.status(500).json({ error: 'Error updating cart' });
        }
    }
    public async getguestcart(req: Request, res: Response) {
        try {
            const request:any=req

            if (request.user) {
              res.json({ cart: request.user.cart });
            } else {

              const guestId = request.params.guestId;
              const guestCart = await GuestCartModal.findOne({ guestId });
              res.status(200).json({statusCode:200, cart: guestCart ? guestCart.cart : [] });
            }
          } catch (error) {
            res.status(500).json({ error: 'Error fetching cart' });
          }
    }
    public async getalllength(req: Request, res: Response) {
        try {
            const response = await lengthService.getlength()
            res.status(response.statusCode).send(response)
        }
        catch (error) {
            res.status(500).json({
                error
            })
        }
    }
}

export default GuestController;