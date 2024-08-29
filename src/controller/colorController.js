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
const colorService_1 = __importDefault(require("../services/colorService"));
const colorService = new colorService_1.default();
class ColorController {
    AddColor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user.role === "admin") {
                    const addObject = {
                        name: req.body.name,
                        description: req.body.desc,
                        code: req.body.code,
                        createdBy: user._id,
                        active: true,
                    };
                    const response = yield colorService.addColor(addObject);
                    res.status(response.statusCode).send(response);
                }
                else {
                    return res.status(403).send({ statusCode: 403, message: 'You are not authorized to add Color!' });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    error
                });
            }
        });
    }
    RemoveColor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user.role === "admin") {
                    const addObject = {
                        colorid: req.params.colorid
                    };
                    const response = yield colorService.RemoveColor(addObject);
                    res.status(response.statusCode).send(response);
                }
                else {
                    return res.status(403).send({ statusCode: 403, message: 'You are not authorized to add Color!' });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    error
                });
            }
        });
    }
    getallcolor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield colorService.getcolor();
                res.status(response.statusCode).send(response);
            }
            catch (error) {
                res.status(500).json({
                    error
                });
            }
        });
    }
    updateColor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user.role === "admin") {
                    const addObject = {
                        id: req.body.id,
                        name: req.body.name,
                        desc: req.body.desc, code: req.body.code
                    };
                    const response = yield colorService.updateColor(addObject);
                    res.status(response.statusCode).send(response);
                }
                else {
                    return res.status(403).send({ statusCode: 403, message: 'You are not authorized to UPdate Size!' });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    error
                });
            }
        });
    }
}
exports.default = ColorController;
