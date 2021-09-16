const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    username: {
        type: String,
        require:true
    },
    password: {
        type: String,
        require:true
    },
    cpassword: {
        type: String,
        require:true
    },
    tokens:[{
        token:{
            type: String,
            require:true
        }
    }]
})
// generating tokens
userSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()},"mynameisanupamisitoneofvfredsawe");
        this.tokens = this.tokens.concat({token});
        await this.save();
        return token;
    }catch(error){
        res.send("the error part");
    }
}
// converting password into hash 

userSchema.pre("save",async function(next){

    if(this.isModified("password")){
        
        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = await bcrypt.hash(this.password, 10);
        

        this.cpassword = undefined;
    }

next();
})

const User = mongoose.model('login',userSchema);
module.exports = User;