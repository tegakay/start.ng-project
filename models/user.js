const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("../api/jwt/auth");

const userSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        
            },
    firstname :{
        type : String,
        required : true,
    },
    lastname :{
        type : String,
        required : true,
    },
    password:{
        type :String,
        required:true,
    },
    role: {
        type: String,
        default: "student",
        roles: [
          "student",
          "tutor",
          "admin",
        ]
      }
      ,
    class:{
        type: String,
           
    },
    tokens:{type:String} 
},
{
    timestamps:true
}  
    );

//generating tokens


userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.method.findByCredentials =  (email, password) => {
    // Search for a user by email and password.
   User.findOne({ email} )
   .then(user =>{
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = bcrypt.compare(password, user.password)
    .then(user2=>{

        if (!isPasswordMatch) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        if (isPasswordMatch) {
           
        }
        

    })
    
   })
  
}

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, config.secret)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };
  


module.exports =mongoose.model("User", userSchema);



