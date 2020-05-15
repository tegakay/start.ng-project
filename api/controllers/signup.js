const User = require("../../models/user");
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

exports.signup = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const usertype = req.body.role;
  const classes = req.body.class


  //verify email and password
  if (!email || !password || !firstname || !usertype || !classes) {
    res.status(400).send({
      status: false,
      message: "All fields are required"
    })
    return;
  }


  //verify if email is taken
  User.findOne({ email })
    .then(user => {
      if (user) {
        return res
          .status(423)
          .send({ status: false, message: "This email already exists" });
      }
      else {
        let user = new User(req.body);
        return user.save()
          .then(result => {
            res.status(201).send({
              message: "Registration successful"
            })
          })

          .catch(err => res.send({ message: "an error occured try again later" }))
      }


    })


}
