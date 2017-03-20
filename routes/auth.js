//import express from 'express';
import jwt from 'jwt-simple';
import HttpStatus from 'http-status';
import Users from '../models/user';
import Config from '../config/config';

//const routerAuth = express.Router();

export default (app) => {

    /**
     * @api {post} api/token
     * @apiGroup Auth
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *         "email":"jamesgomes.sistemas@gmail.com",
     *         "senha":"123456Abcd",
     *     }
     * 
     *  * 
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *       {
     *        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OGNlY2UwOWI0ZjdjYzQ5NjA1MDYzNzcifQ.gVZFt4pF32zhIlROYhMpHCsOx7S8ExDEN78xet00wfI"
     *       }
     *
     */
    app.route('/api/token')
        .post((req, res) => {

            if (req.body.email && req.body.password) {
                const email = req.body.email;
                const password = req.body.password;
                Users.getByEmail(email, (result) => {
                    //console.log(result);
                    let user = result.data[0];
                    if (user != undefined) {
                        if (Users.isPassword(user.password, password)) {
                            const payload = { _id: user._id };
                            res.json({
                                token: jwt.encode(payload, Config.jwtSecret),
                            });
                        } else {
                            res.sendStatus(HttpStatus.UNAUTHORIZED);
                        }

                    } else {
                        res.sendStatus(HttpStatus.UNAUTHORIZED);
                    }
                });

            } else {
                res.sendStatus(HttpStatus.UNAUTHORIZED);
            }

        });
}
