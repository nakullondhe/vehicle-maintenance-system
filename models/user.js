var mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid').v1;

var userSchema = new mongoose.Schema({
  firstName:{
      type: String,
      required:true,
      maxlength:32,
      trim:true
  },
  lastName:{
      type:String,
      required:false,
      maxlength:32,
      trim:true
  },
  email:{
      type:String,
      trim:true,
      required:true,
      unique:true
  },
  phone:{
      type:String,
      required:true,
      unique:true
  },
  otp: {
    type: String,
  },
  encry_password :{
      type:String,
      required: true
  },
  salt:String,
  role:{
      type:Number,
      default:0
  },
  // Array of objectIds
  vehicles: [
    {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "UserVehicles"
    }
  ]
}, 
    {timestamps:true}
);
//Encrypting with crypto
userSchema
    .virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    });

userSchema.methods = {
    authenticate: function(plainpassword) {
            return this.securePassword(plainpassword) ===this.encry_password;
        },
//from Node Crypto 
    securePassword: function(plainpassword){
       if(!plainpassword) return ""; 
       try {
            return crypto.createHmac('sha256', this.salt)
//Instead of returning we can also save the values in a variable
            .update(plainpassword)
            .digest('hex');
       }catch (err){
           return "";
       }
    }
}

module.exports = mongoose.model("User",userSchema) 