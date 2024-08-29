"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const authService_1 = __importDefault(require("../services/authService"));
const bcrypt = __importStar(require("bcrypt"));
const authservice = new authService_1.default();
class UserController {
    Signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const signObject = {
                    name: req.body.name,
                    email: req.body.email,
                    password: yield bcrypt.hash(req.body.password, 10),
                    mobile: req.body.mobile,
                    countrycode: req.body.countrycode,
                    role: "admin",
                    usertype: req.body.usertype,
                    uniquecode: "12344766",
                    dob: req.body.dob,
                    active: true,
                };
                const response = yield authservice.signup(signObject);
                if (response.token) {
                    res.setHeader("Authorization", `Bearer ${response.token}`);
                    res.cookie('Authorization', `Bearer ${response.token}`);
                    res.status(response.statusCode).send(response);
                }
                else {
                    res.status(response.statusCode).send(response);
                }
            }
            catch (error) {
                res.status(500).json({
                    error
                });
            }
        });
    }
    UserLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginObject = {
                    email: req.body.email,
                    password: req.body.password,
                };
                const response = yield authservice.login(loginObject);
                if (response.token) {
                    res.setHeader("Authorization", `Bearer ${response.token}`);
                    res.cookie('Authorization', `Bearer ${response.token}`);
                    res.status(response.statusCode).send(response);
                }
                else {
                    res.status(response.statusCode).send(response);
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
exports.default = UserController;
