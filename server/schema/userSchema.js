const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }
    ]
});
userSchema.pre('save',async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
});
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({ _id: this._id }, process.env.SECRET);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        console.log('save')
        return token 
    }catch(error){
        console.log(error)
    }
}

const User = mongoose.model('myusers',userSchema);
module.exports = User;
