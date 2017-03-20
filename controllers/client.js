
class ClientController {
    constructor(Clients) {
        this.Clients = Clients;
    }

    add(client, callback) {
         this.Clients.add(client, callback);
    }

    update(client, callback) {
         this.Clients.update(client, callback);
    }

    get(cpf, callback) {
         this.Clients.getByCpf(cpf, callback);
    }

    getAll(callback) {
         this.Clients.getAll(callback);
    }

}

export default ClientController;


