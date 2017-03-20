import Client from '../dal/client';

exports.add = (item, callback) => {
    if (checkCpf(item.cpf)) {
        checkClient(item.cpf, (err, team, isCheck) => {
            if (err) {
                callback({
                    "success": false,
                    "msg": err,
                    "data": null,
                });
            }
            else {

                if (!isCheck) {
                    Client.addClient(item, (err, data) => {
                        if (err) {
                            callback({
                                "success": false,
                                "msg": err,
                                "data": null
                            });
                        }
                        else {
                            callback({
                                "success": true,
                                "msg": "Customer registered successfully",
                                "data": data,
                            });
                        }
                    });
                } else {
                    callback({
                        "success": false,
                        "msg": "Customer already registered",
                        "data": null,
                    });
                }
            }
        });
    } else {
        callback({
            "success": false,
            "msg": "Invalid CFP",
            "data": null,
        });
    }
}

exports.update = (item, callback) => {
    if (checkCpf(item.cpf)) {
        Client.getClientByCpf(item.cpf, (err, data) => {
            if (err) {
                callback({
                    "success": false,
                    "msg": err,
                    "data": null,
                });
            }
            else {
                let client = data[0];
                if (client != undefined) {
                    if (item.cpf == client.cpf) {
                        Client.updateClient(client._id, item, (err, data) => {
                            if (err) {
                                callback({
                                    "success": false,
                                    "msg": err,
                                    "data": null
                                });
                            }
                            else {
                                callback({
                                    "success": true,
                                    "msg": "Customer successfully updated",
                                    "data": data,
                                });
                            }
                        });

                    } else {
                        httpMsgs.sendJson(req, resp, {
                            "success": false,
                            "msg": "Client not found"
                        });
                    }

                } else {
                    callback({
                        "success": false,
                        "msg": "Client not found",
                        "data": null,
                    });
                }
            }
        });
    } else {
        callback({
            "success": false,
            "msg": "Invalid CFP",
            "data": null,
        });
    }
}

exports.getByCpf = (cpf, callback) => {
    Client.getClientByCpf(cpf, (err, data) => {
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
                "msg": "Customer",
                "data": data,
            });
        }
    });
}

exports.getAll = function (callback) {
    Client.getClients(function (err, data) {
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

/**
 * Verifica se cliente já está cadastrado
 * 
 * @param {any} cpf 
 * @param {any} callback 
 */
function checkClient(cpf, callback) {

    Client.getClientByCpf(cpf, function (err, data) {
        if (err) {
            callback(err, data, false);
        }
        else {
            callback(err, data, data.length > 0 ? true : false);
        }
    });
}

/**
 * Verifica de o CPF é válido
 * 
 * @param {any} str 
 * @returns 
 */
function checkCpf(strCPF) {

    if (strCPF != undefined) {

        let Soma;
        let Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    } else {
        return false;
    }


}

