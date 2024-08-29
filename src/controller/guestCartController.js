"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lengthService_1 = __importDefault(require("../services/lengthService"));
const guestuserCartSchema_1 = __importDefault(require("../modal/guestuserCartSchema"));
const lengthService = new lengthService_1.default();
class GuestController {
    addGuestCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cart, guestId } = req.body;
            console.log(req.body);
            const request = req;
            try {
                if (req.user) {
                    request.user.cart = cart;
                    yield request.user.save();
                }
                else if (guestId) {
                    yield guestuserCartSchema_1.default.findOneAndUpdate({ guestId }, { cart }, { upsert: true, new: true });
                }
                res.json({ success: true });
            }
            catch (error) {
                res.status(500).json({ error: 'Error updating cart' });
            }
        });
    }
    getguestcart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req;
                if (request.user) {
                    res.json({ cart: request.user.cart });
                }
                else {
                    const guestId = request.params.guestId;
                    const guestCart = yield guestuserCartSchema_1.default.findOne({ guestId });
                    res.status(200).json({ statusCode: 200, cart: guestCart ? guestCart.cart : [] });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Error fetching cart' });
            }
        });
    }
    getalllength(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield lengthService.getlength();
                res.status(response.statusCode).send(response);
            }
            catch (error) {
                res.status(500).json({
                    error
                });
            }
        });
    }
}
exports.default = GuestController;
