import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes: User', () => {

    const Users = app.dalUser;
    const jwtSecret = app.config.jwtSecret;


    const defaultUser = {
        name: 'Test User',
        email: 'test@mail.com',
        password: 'testPassword',
    };

    let token;
    let password = Users.passwordCreate('123456');

    beforeEach(done => {
        Users
            .remove({})
            .exec()
            .then(() => Users.create({
                name: 'James',
                email: 'james@gmail.com',
                password: password
            }))
            .then(user => {
                token = jwt.encode({ _id: user._id }, jwtSecret);
                done();
            });
    });

    describe('POST /api/user/add', () => {
        it('should post a user', done => {

            let newUserPwd = Users.passwordCreate('newUserPwd');
            const user = {
                name: 'User Created',
                email: 'newUser@mail.com',
                password: newUserPwd,
            };

            request
                .post('/api/user/add')
                .set('Authorization', `JWT ${token}`)
                .send(user)
                .end((err, res) => {
                    expect(res.body.data.name).to.eql(user.name);
                    expect(res.body.data.email).to.eql(user.email);
                    done(err);
                });
        });
    });
});