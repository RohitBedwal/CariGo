const captainModel = require("../models/captain.model");
const captainServices = require("../services/captain.services");
const {validationResult} = require('express-validator');
const cookieParser = require('cookie-parser');
const blacklistTokenModel = require("../models/blacklistToken.model");
const rideModel = require("../models/ride.models");

module.exports.registerCaptain = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {fullname,email,password,vehicle} = req.body;
    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if(isCaptainAlreadyExist){
        return res.status(400).json({message:'Captain already exists'})
    }
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainServices.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType
        
    });
    
    
    const token = captain.generateAuthToken();

    res.status(201).json({token,captain})

}

module.exports.loginCaptain = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password} = req.body;
    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message:'Invalid Email or Password'})
    }
    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid Email or Password'})
    }
    const token = captain.generateAuthToken();
    res.cookie('token',token)
    res.status(200).json({token,captain})
}
module.exports.getProfile = async (req,res,next)=>{
    return res.status(200).json(req.captain)
}
module.exports.logoutCaptain = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({token})
    res.clearCookie('token')
    return res.status(200).json({message:'logged out'})
}

module.exports.getEarnings = async (req, res) => {
    try {
        const total = await rideModel.aggregate([
            { $match: { captain: req.captain._id, status: 'completed', fare: { $ne: null } } },
            { $group: { _id: null, total: { $sum: '$fare' } } }
        ]);
        const amount = total[0]?.total || 0;
        return res.status(200).json({ total: amount });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to fetch earnings' });
    }
}
