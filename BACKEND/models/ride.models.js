const mongoose = require('mongoose')

const  rideSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:'ture'
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Captain'
    },
    pickup:{
        type:String,
        required:true,

    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type: Number,
        required:true
    }
    ,status:{
        type:String,
        enum:['pending','accepted', 'ongoing','completed','canceled'],
        default:'pending'

    },
    duration:{
        type:Number
    },// in seconds
    distance:{
        type:Number
    }//in meters
    ,
    paymentId:{
        type:String
    },
    paid:{
        type:Boolean,
        default:false
    },
    orderId:{
        type:String
    },
    signature:{
        type:String
    },
    otp:{
        type:String,
        select:false,
        required:true
    }


})
module.exports = mongoose.model('ride',rideSchema)