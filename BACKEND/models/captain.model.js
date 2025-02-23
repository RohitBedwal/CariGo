const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const captainSchema  = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"Firstname should be 3 characters long"]
        },
        lastname:{
            type:String,
            minlength:[3,"Firstname should be 3 characters long"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        select:false,
        required:true
        
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'color must be 3 characters long']
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate must be 3 characters long']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"capacity must be at least 1 "]
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car' ,'auto', 'motorcycle']
        }

    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    location:{
        lat:{
            type:Number,
        },
        long:{
            type:Number
        }
    }


})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token;
}
captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)

}
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10)
}

const captainModel =mongoose.model('captain',captainSchema)

module.exports = captainModel;
