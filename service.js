const { RegistrationModel } = require('./Schema')
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')

const jwtUserkey = process.env.JWT_USERKEY ;



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
const handleLogin = async (apiReq , apiRes) => {
  try {
    const username = apiReq.params.username
    const password = apiReq.params.password
    
    const dbResponse = await RegistrationModel.findOne({
        username : username
    })
    if(dbResponse?.username){
        const passwordMatch = await bcrypt.compare(password , dbResponse.password)
        if(passwordMatch){
            const token = jwt.sign({ data : username } , jwtUserkey)
            apiRes.json({ username : dbResponse.username , token : token})
            return;
        }
    }
    apiRes.send("Login Failed")
  } catch(error){
    console.error("Error during Login")
    apiRes.send("Login failed")
  }
}



module.exports = {
    handleRegistration , 
    handleLogin
}