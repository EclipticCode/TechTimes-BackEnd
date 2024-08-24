const { RegistrationModel } = require('./Schema')
const bcrypt = require ('bcryptjs')



// Registration 

const handleRegistration = async (apiReq , apiRes) => {
   try {
    const { username , password } = apiReq.body
   if(username && password){
    const hashedPassword = await bcrypt.hash(password , 0)
    const dbResponse = await RegistrationModel.create({
        username : username , 
        password : hashedPassword
    });
    apiRes.json({message : "Data added"})
   }
   } catch (error) {
    console.error("Error during Registration:" , error);
    apiRes.send(500).send("Internal server error")
   }
}

// Login



module.exports = {
    handleRegistration
}