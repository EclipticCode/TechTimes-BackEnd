const { mongoose } = require('./db')

const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    username : { type : String } ,
    password : { type : String } ,
})

const RegistrationModel = mongoose.model("registrations" , RegistrationSchema)

module.exports = {
    RegistrationModel
}