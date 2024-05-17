// import * as passportStrategy from "passport-local";
import passport from 'passport';
import bcrypt from 'bcrypt';
import { Express, Request, Response, NextFunction } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';

import AuthServices from './services/authService';
import passportJWT from 'passport-jwt';
import { jwtDecode } from "jwt-decode";

interface IUser {
    email: string;
    password: string;
    // username: string;
}

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
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JWTSecret:any = process.env.JWT_SECERET_KEY;
const Returnloginuserpath=(role:string)=>{
            return '/'
        
}
export function initPassport(app: Express) {
    const authServices = new AuthServices();
    // usersDB.initUsers();
    app.use(passport.initialize());
    app.use(passport.authenticate('session'));
    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: JWTSecret,
            },
            async (token: any, done: any) => {
                try {
                    return done(null, token);
                } catch (error) {
                    done(error);
                }
            }
        )
    );
    passport.use('local', new LocalStrategy(
        {
            usernameField: 'email', passwordField: 'password',
            passReqToCallback: true,
            session: false
        }, async (req, email, password, done) => {
            try {
                if (!email) { done(null, false) }
                const user: any = await authServices.finduserByemail({ email });
                if (user.email === email && await bcrypt.compare(password, (user.password).toString())) {
                    done(null, user);
                } else {
                    done('Incorrect Credentials', false, {
                        message: 'Incorrect password.',
                    });
                }
            } catch (e) {
                done(e);
            }
        }));

    passport.serializeUser((user:any, done) => {
        done(null, user);
    });


    passport.deserializeUser((user: IUser, done) => {
        const u = authServices.finduserByemail({ email: user.email });
        done(null, u);
    });

}
export const authorized = (req: Request, res: Response, next: NextFunction) => {
     console.log(req.headers.authorization)
    passport.authenticate("jwt", { session: false }, async (error: any, token: any) => {
        if (error || !token) {
            if(token===false){
                res.status(200).json({ msg: "token is not Valid!"});
            }
           else{
             // const token = "eyJ0eXAiO.../// jwt token";
             if(req?.headers?.authorization){
                const decoded:any = jwtDecode(req?.headers?.authorization?.split(" ")[1]);
                res.status(200).json({ msg: "token expired",redireturl:Returnloginuserpath(decoded.role), "code": 190, });
            }
            else{
                res.status(200).json({ msg: "token expired or not avilable"});
            }
           }
        } else {
            req.user = token
            return next()
            // next();
        }

    })(req, res, next);
};
export function isAuthenticated(req: Request, res: Response, next: NextFunction): Response | void {
    if (req.user)
        return next();
    else{}
}