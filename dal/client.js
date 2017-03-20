import mongoose from 'mongoose';
import validator from 'node-mongoose-validator';

let Schema = mongoose.Schema;

let AddressesSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    }

});

let PhoneNumbersSchema = new Schema({
    number: {
        type: String
        //required: true
    }
});

// Client Schema
let ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    addresses: [AddressesSchema],
    phoneNumbers: [PhoneNumbersSchema],
    create_date: {
        type: Date,
        default: Date.now
    },
    update_date: {
        type: Date,
        default: Date.now
    }
});

// Validations

ClientSchema.path('name').validate(validator.$notEmpty({ msg: 'Please provide a name.' }));
ClientSchema.path('email').validate(validator.$isEmail({ msg: 'Please provide a valid email address' }));
ClientSchema.path('cpf').validate(validator.$notEmpty({ msg: 'Please provide a cpf.' }));
ClientSchema.path('maritalStatus').validate(validator.$notEmpty({ msg: 'Please provide a maritalStatus.' }));
ClientSchema.path('phoneNumbers').validate(validator.$notEmpty({ msg: 'Please provide a phoneNumbers.' }));
ClientSchema.path('addresses').validate((features) => {
    if (!features) { return false }
    else if ((features.length === 0) || (features.length > 1)) { return false }
    return true;
}, 'Please provide a addresses.');

let Client = module.exports = mongoose.model('Client', ClientSchema);

// Add Client
module.exports.addClient = (client, callback) => {
    Client.create(client, callback);
}

// Get client
module.exports.getClients = (callback) => {
    Client.find(callback);
}

// Get Client
module.exports.getClientByCpf = (cpf, callback) => {
    Client.find({ cpf: { $eq: cpf } }, callback);
}
// Update Client
module.exports.updateClient = (id, client, callback) => {
    var query = { _id: id };
    client.update_date = new Date();
    Client.findOneAndUpdate(query, client, { runValidators: true }, callback);
}


module.exports.Client;