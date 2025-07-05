const mapService = require('./Map.services')
const rideModel = require('../models/ride.models');
const { getDistanceTime } = require('../controllers/map.controller');
const crypto = require('crypto')

async function getFare(pickup, destination){
    if(!pickup || !destination){
        throw new Error('Pickup and destination are required')
    }

    const distanceTime = await mapService.getTheDistanceTime(pickup,destination);

        const baseFare= {
            auto :30,
            car:50,
            motorcycle:20
        }
        const perKmRate = {
            auto:10,
            car:15,
            motorcycle:8


        }
        const ratePerMinute = {
            auto: 2,
            car : 3,
            motorcycle:1.5
        };
        console.log(distanceTime)
        const fare  = {
            auto:Math.round(baseFare.auto+((distanceTime.distanceValue)/1000*perKmRate.auto)+((distanceTime.durationValue)/60 * ratePerMinute.auto)),
            car:Math.round(baseFare.car+((distanceTime.distanceValue)/1000*perKmRate.car)+((distanceTime.durationValue)/60 * ratePerMinute.car)),
            motorcycle:Math.round(baseFare.motorcycle+((distanceTime.distanceValue)/1000*perKmRate.motorcycle)+((distanceTime.durationValue)/60 * ratePerMinute.motorcycle)),
            
        }
        return fare

}
module.exports.getFare = getFare;


function getOtp(num){
    function generateOTP(num) {
        const otp = crypto.randomInt(0, 10 ** num).toString().padStart(num, '0');
        return otp;
      }
      return generateOTP(num);
}




module.exports.createRide = async({
    user,pickup,destination,vehicleType
})=>{
    if(!user, !pickup,!destination, !vehicleType){
        throw new Error ('all fields are required')
    }
    
    const fare  = await getFare(pickup,destination);
    

    const ride  = rideModel.create({
        user,
        pickup,
        destination,
        otp:getOtp(6),
        fare:fare[vehicleType]

    })

    return ride;
   



}