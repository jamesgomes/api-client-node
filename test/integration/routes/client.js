import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes: Client', () => {

    const Client = app.dalClient;
    const Users = app.dalUser;
    const jwtSecret = app.config.jwtSecret;

    console.log("jwtSecret: ", jwtSecret);

    const defaultClient = {
        "name": "James Moreira Gomesss",
        "email": "jamesgomes.sistemas@gmail.com",
        "cpf": "16214625791",
        "maritalStatus": "Casado",
        "phoneNumbers": [
            {
                "number": "31-88447884",
            }
        ],
        "addresses": [
            {
                "street": "Rua Minas Novas, 118",
                "city": "Sabará",
                "state": "Minas Gerais",
                "zip": "34.600-650",
            }
        ]
    };

    let token = " ";
    let password = Users.passwordCreate('123456');

    beforeEach(done => {
        Users
            .remove({})
            .exec()
            .then(() => Users.create({
                name: 'jamess',
                email: 'james@gmail.com',
                password: password
            }))
            .then(user => {
                //console.log("user: ", user);
                token = jwt.encode({ _id: user._id }, jwtSecret);
                Client
                    .remove({})
                    .exec()
                    .then(() => {
                        Client.create(defaultClient);
                        done();
                    });
            });
    });



    describe('GET /api/client/getAll', () => {
        it('should return a list of clients', done => {
            request
                .get('/api/client/getAll/')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                    expect(res.body.data[0].name).to.eql(defaultClient.name);
                    expect(res.body.data[0].cpf).to.eql(defaultClient.cpf);
                    done(err);
                });
        });
    });

    describe('GET /api/client/get/{cpf}', () => {
        it('should return a client by cpf', done => {
            request
                .get('/api/client/get/16214625791')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                    expect(res.body.data[0].name).to.eql(defaultClient.name);
                    expect(res.body.data[0].cpf).to.eql(defaultClient.cpf);
                    done(err);
                });
        });
    });


    describe('POST /api/client/add', () => {
        it('should post a client', done => {

            const client = {
                "name": "Ronaldo Gomessss",
                "email": "ronaldo@gmail.com",
                "cpf": "29532459286",
                "maritalStatus": "Solteiro",
                "phoneNumbers": [
                    {
                        "number": "31-98483-8486",
                    }
                ],
                "addresses": [
                    {
                        "street": "Rua Minas Novas, 103",
                        "city": "Sabará",
                        "state": "Minas Gerais",
                        "zip": "34.600-650",
                    }
                ]
            };

            request
                .post('/api/client/add')
                .set('Authorization', `JWT ${token}`)
                .send(client)
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res.body.data.name).to.eql(client.name);
                    expect(res.body.data.cpf).to.eql(client.cpf);
                    done(err);
                });
        });
    });
    
        describe('PUT /api/client/update', () => {
        it('should update a client', done => {

            const client = {
                "name": "James Moreira Gomes",
                "email": "jamesgomes.sistemas@gmail.com",
                "cpf": "16214625791",
                "maritalStatus": "Casado",
                "phoneNumbers": [
                    {
                        "number": "31-88447884",
                    }
                ],
                "addresses": [
                    {
                        "street": "Rua Minas Novas, 118",
                        "city": "Sabará",
                        "state": "Minas Gerais",
                        "zip": "34.600-650",
                    }
                ]
            };

            request
                .put('/api/client/update')
                .set('Authorization', `JWT ${token}`)
                .send(client)
                .end((err, res) => {
                    expect(res.body.data.cpf).to.eql(client.cpf);
                    done(err);
                });
        });
    });

});
