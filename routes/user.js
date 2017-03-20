
import UserController from '../controllers/user';
import Users from '../models/user';

export default (app) => {

    const userController = new UserController(Users);
    /**
     * @api {post} api/user/add
     * @apiGroup User
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *         "name":"James Gomes",
     *         "email":"jamesgomes.sistemas@gmail.com",
     *         "senha":"123456Abcd",
     *     }
     * 
     *  * 
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *      {
     *       "success": true,
     *       "msg": "User registered successfully",
     *       "data": {
     *           "__v": 0,
     *           "name": "James Gomes",
     *           "email": "jamesgomes.sistemas@gmail.com",
     *           "password": "$2a$10$W5GbTEEeSg3TKq7xmEEvtumHVSKi1pwNdmYwOVFwdX.TiviCBHXg.",
     *           "_id": "58cece09b4f7cc4960506377",
     *           "update_date": "2017-03-19T18:29:29.491Z",
     *           "create_date": "2017-03-19T18:29:29.491Z"
     *       }
     *      }
     *
     */
    app.route('/api/user/add')
        .all(app.auth.authenticate())
        .post((req, res) => {
            userController.add(req.body, (data) => {
                if (data.success) {
                    res.status(200);
                } else {
                    res.status(412);
                }
                res.json(data);
            });
        });
}
