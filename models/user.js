import bcrypt from 'bcrypt';
import User from '../dal/user';

exports.add = (item, callback) => {

    User.getUserByEmail(item.email, (err, data) => {

        if (err) {
            callback({
                "success": false,
                "msg": err,
                "data": null,
            });
        } else {
            if (data.length == 0) {

                item.password = User.passwordCreate(item.password);

                User.addUser(item, (err, data) => {

                    if (err) {
                        callback({
                            "success": false,
                            "msg": err,
                            "data": null,
                        });
                    } else {

                        callback({
                            "success": true,
                            "msg": "User registered successfully",
                            "data": data,
                        });
                    }
                });

            } else {

                callback({
                    "success": false,
                    "msg": "User already registered",
                    "data": null,
                });
            }

        }

    });

}


exports.getByEmail = (email, callback) => {
    User.getUserByEmail(email, (err, data) => {
        if (err) {
            callback({
                "success": false,
                "msg": err,
                "data": null,
            });
        }
        else {
            callback({
                "success": true,
                "msg": "Customer list",
                "data": data,
            });
        }
    });
}

exports.findById = (id, callback) => {
    User.getUserById(id, (err, data) => {
        if (err) {
            callback({
                "success": false,
                "msg": err,
                "data": null,
            });
        }
        else {
            callback({
                "success": true,
                "msg": "Customer list",
                "data": data,
            });
        }
    });
}

exports.isPassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword)
}

