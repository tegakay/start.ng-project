const user = require('../../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let config = require('../jwt/auth')


exports.logIn = (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  user.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Error user not found' })
      }
       bcrypt.compare(req.body.password,user.password,(err,isPasswordMatch)=>{
        if (!isPasswordMatch) {
          return res.status(404).send({ message: 'invalid login parameters' })
        } else
        if (isPasswordMatch) {
          let token = jwt.sign({ email: req.body.email }, config.secret, {
            expiresIn: "480h" // expires in 24 hours
          });
          if(req.body.device_token){
            User.findOneAndUpdate({email: req.body.email}, {token: req.body.token}, function(err, docs){
              console.log(err)
            });
           }
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: "Authentication successful!",
            token: token,
            data: docs})
      }
       });
      
       

 
    })

   

}