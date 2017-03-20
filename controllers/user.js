


class UserController {

    constructor(Users) {
        this.Users = Users;
    }

    add(user, callback) {
        this.Users.add(user, callback);
    }

    get(email, callback) {
        this.Users.getByEmail(email, callback);
    }
}

export default UserController;


