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
exports.isAuthenticated = exports.authorized = exports.initPassport = void 0;
// import * as passportStrategy from "passport-local";
const passport_1 = __importDefault(require("passport"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_local_1 = require("passport-local");
const authService_1 = __importDefault(require("./services/authService"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const jwt_decode_1 = require("jwt-decode");
// class User {
//     users: IUser[];
//     async initUsers() {
//         const p = await bcrypt.hash('abc', 10);
//         this.users = [{ email: 'test@gmail.com', password: p }];
//     }
//     findUser(email: string) {
//         return this.users.find(u => u.email === email);
//     }
// }
const JWTStrategy = passport_jwt_1.default.Strategy;
const ExtractJWT = passport_jwt_1.default.ExtractJwt;
const JWTSecret = process.env.JWT_SECERET_KEY;
const Returnloginuserpath = (role) => {
    return '/';
};
function initPassport(app) {
    const authServices = new authService_1.default();
    // usersDB.initUsers();
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.authenticate('session'));
    passport_1.default.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWTSecret,
    }, (token, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            return done(null, token);
        }
        catch (error) {
            done(error);
        }
    })));
    passport_1.default.use('local', new passport_local_1.Strategy({
        usernameField: 'email', passwordField: 'password',
        passReqToCallback: true,
        session: false
    }, (req, email, password, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!email) {
                done(null, false);
            }
            const user = yield authServices.finduserByemail({ email });
            if (user.email === email && (yield bcrypt_1.default.compare(password, (user.password).toString()))) {
                done(null, user);
            }
            else {
                done('Incorrect Credentials', false, {
                    message: 'Incorrect password.',
                });
            }
        }
        catch (e) {
            done(e);
        }
    })));
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.deserializeUser((user, done) => {
        const u = authServices.finduserByemail({ email: user.email });
        done(null, u);
    });
}
exports.initPassport = initPassport;
const authorized = (req, res, next) => {
    console.log(req.headers.authorization);
    passport_1.default.authenticate("jwt", { session: false }, (error, token) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        if (error || !token) {
            if (token === false) {
                res.status(200).json({ msg: "token is not Valid!" });
            }
            else {
                // const token = "eyJ0eXAiO.../// jwt token";
                if ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) {
                    const decoded = (0, jwt_decode_1.jwtDecode)((_c = (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1]);
                    res.status(200).json({ msg: "token expired", redireturl: Returnloginuserpath(decoded.role), "code": 190, });
                }
                else {
                    res.status(200).json({ msg: "token expired or not avilable" });
                }
            }
        }
        else {
            req.user = token;
            return next();
            // next();
        }
    }))(req, res, next);
};
exports.authorized = authorized;
function isAuthenticated(req, res, next) {
    if (req.user)
        return next();
    else { }
}
exports.isAuthenticated = isAuthenticated;
