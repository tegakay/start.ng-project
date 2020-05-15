const user = require('../../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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
          return res.status(200).send({ message: 'login successful' })
      }
       });
      
       

 /*      const token = User.generateAuthToken()
      res.send({
        message: 'login successful',
        token: token
      })
      */
    })

   

}