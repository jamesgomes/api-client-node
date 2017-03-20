
import ClientController from '../controllers/client';
import Clients from '../models/client';

export default (app) => {

    const clientController = new ClientController(Clients);
    /**
     * @api {post} api/client/add
     * @apiGroup Client
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *         "name":"James Gomes",
     *         "email":"jamesgomes.sistemas@gmail.com",
     *         "cpf":"07449510626",
     *         "maritalStatus":"Casado",
     *         "addresses":[{
     *          	"street":"Rua Minas Novas, 118",
     *          	"city":"Sabará",
     *          	"state":"Minas Gerais",
     *         	    "zip":"34.600-650"
     *         }],
     *         "phoneNumbers":[{
     *         "number":"31-88447884"	
     *         }]
     *     }
     * 
     *  * 
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *      {
     *       "success": true,
     *       "msg": "Customer registered successfully",
     *       "data": {
     *           "__v": 0,
     *           "name": "James Gomes",
     *           "email": "jamesgomes.sistemas@gmail.com",
     *           "cpf": "16214625791",
     *           "maritalStatus": "Casado",
     *           "_id": "58cec19ac65711e5c26f6ded",
     *           "update_date": "2017-03-19T17:36:26.082Z",
     *           "create_date": "2017-03-19T17:36:26.082Z",
     *           "phoneNumbers": [
     *           {
     *               "number": "31-88447884",
     *               "_id": "58cec19ac65711e5c26f6dee"
     *           }
     *           ],
     *           "addresses": [
     *           {
     *               "street": "Rua Minas Novas, 118",
     *               "city": "Sabará",
     *               "state": "Minas Gerais",
     *               "zip": "34.600-650",
     *               "_id": "58cec19ac65711e5c26f6def"
     *           }
     *           ]
     *       }
     *      }
     */
    app.route('/api/client/add')
        .all(app.auth.authenticate())
        .post((req, res) => {
            clientController.add(req.body, (data) => {
                if (data.success) {
                    res.status(200);
                } else {
                    res.status(412);
                }
                res.json(data);
            });
        });

    /**
     * @api {get} /api/client/get/:cpf 
     * @apiGroup Client
     *
     * @apiParam {Number} cpf cpf do Cliente
     *  *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *    {
     *     "success": true,
     *     "msg": "Customer",
     *     "data": [
     *        {
     *          "_id": "58cb2d0cc9b42480b41f1e1c",
     *          "name": "James Gomes",
     *          "email": "jamesgomes.sistemas@gmail.com",
     *          "cpf": "07449510626",
     *          "maritalStatus": "Casado",
     *          "__v": 0,
     *          "update_date": "2017-03-17T00:25:48.258Z",
     *          "create_date": "2017-03-14T23:09:31.613Z",
     *          "phoneNumbers": [
     *            {
     *                  "number": "31-88447884",
     *                  "_id": "58cb2d0cc9b42480b41f1e1e"
     *            },
     *            {
     *                  "number": "31-88447884",
     *                  "_id": "58cb2d0cc9b42480b41f1e1d"
     *           }
     *          ],
     *          "addresses": [
     *            {
     *                  "street": "Rua Minas Novas, 118",
     *                  "city": "Sabará",
     *                  "state": "Minas Gerais",
     *                  "zip": "34.600-650",
     *                  "_id": "58cb2d0cc9b42480b41f1e1f"
     *            }
     *          ]
     *         }
     *        ]  
     *      }
     *
     */
    app.route('/api/client/get/:cpf')
        .all(app.auth.authenticate())
        .get((req, res) => {
            clientController.get(req.params.cpf, (data) => {
                if (data.success) {
                    res.status(200);
                } else {
                    res.status(412);
                }
                res.json(data);
            });
        });


    /**
     * @api {get} /api/client/getAll/ 
     * @apiGroup Client
     *  
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *    {
     *     "success": true,
     *     "msg": "Customer list",
     *     "data": [
     *        {
     *          "_id": "58cb2d0cc9b42480b41f1e1c",
     *          "name": "James Gomes",
     *          "email": "jamesgomes.sistemas@gmail.com",
     *          "cpf": "07449510626",
     *          "maritalStatus": "Casado",
     *          "__v": 0,
     *          "update_date": "2017-03-17T00:25:48.258Z",
     *          "create_date": "2017-03-14T23:09:31.613Z",
     *          "phoneNumbers": [
     *            {
     *                  "number": "31-88447884",
     *                  "_id": "58cb2d0cc9b42480b41f1e1e"
     *            },
     *            {
     *                  "number": "31-88447884",
     *                  "_id": "58cb2d0cc9b42480b41f1e1d"
     *           }
     *          ],
     *          "addresses": [
     *            {
     *                  "street": "Rua Minas Novas, 118",
     *                  "city": "Sabará",
     *                  "state": "Minas Gerais",
     *                  "zip": "34.600-650",
     *                  "_id": "58cb2d0cc9b42480b41f1e1f"
     *            }
     *          ]
     *         }
     *        ]  
     *      }
     *
     */
    app.route('/api/client/getAll')
        .all(app.auth.authenticate())
        .get((req, res) => {
            clientController.getAll((data) => {
                if (data.success) {
                    res.status(200);
                } else {
                    res.status(412);
                }
                res.json(data);
            });
        });


    /**
     * @api {put} api/client/update
     * @apiGroup Client
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *         "name":"James Gomes",
     *         "email":"jamesgomes.sistemas@gmail.com",
     *         "cpf":"07449510626",
     *         "maritalStatus":"Casado",
     *         "addresses":[{
     *          	"street":"Rua Minas Novas, 118",
     *          	"city":"Sabará",
     *          	"state":"Minas Gerais",
     *         	    "zip":"34.600-650"
     *         }],
     *         "phoneNumbers":[{
     *         "number":"31-88447884"	
     *         }]
     *     }
     * 
     *  * 
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "success": true,
     *      "msg":"Customer successfully updated",
     *      "data":     
     *      {
     *         "name":"James Gomes",
     *         "email":"jamesgomes.sistemas@gmail.com",
     *         "cpf":"07449510626",
     *         "maritalStatus":"Casado",
     *         "addresses":[{
     *          	"street":"Rua Minas Novas, 118",
     *          	"city":"Sabará",
     *          	"state":"Minas Gerais",
     *         	    "zip":"34.600-650"
     *         }],
     *         "phoneNumbers":[{
     *         "number":"31-88447884"	
     *         }]
     *     }
     *    }
     */
    app.route('/api/client/update')
        .all(app.auth.authenticate())
        .put((req, res) => {
            clientController.update(req.body, (data) => {
                if (data.success) {
                    res.status(200);
                } else {
                    res.status(412);
                }
                res.json(data);
            });
        });

}
