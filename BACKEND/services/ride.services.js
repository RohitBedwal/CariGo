const mapService = require('./Map.services')
const rideModel = require('../models/ride.models');
const captainModel = require('../models/captain.model');
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
    // Compute distance/time and fare so we can persist them with the ride
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

    const fare  = {
        auto:Math.round(baseFare.auto+((distanceTime.distanceValue)/1000*perKmRate.auto)+((distanceTime.durationValue)/60 * ratePerMinute.auto)),
        car:Math.round(baseFare.car+((distanceTime.distanceValue)/1000*perKmRate.car)+((distanceTime.durationValue)/60 * ratePerMinute.car)),
        motorcycle:Math.round(baseFare.motorcycle+((distanceTime.distanceValue)/1000*perKmRate.motorcycle)+((distanceTime.durationValue)/60 * ratePerMinute.motorcycle)),
        
    }
    

    const ride  = rideModel.create({
        user,
        pickup,
        destination,
        otp:getOtp(6),
        fare:fare[vehicleType],
        distance: distanceTime.distanceValue,
        duration: distanceTime.durationValue

    })

    return ride;
   



}

module.exports.findLatestPendingRide = async () => {
    // Fetch most recently created pending ride without an assigned captain
    const ride = await rideModel.findOne({ status: 'pending', captain: { $exists: false } })
        .sort({ _id: -1 });
    return ride;
};

module.exports.acceptRide = async (rideId, captainId) => {
    if (!rideId || !captainId) {
        throw new Error('rideId and captainId are required');
    }
    const ride = await rideModel.findById(rideId);
    if (!ride) {
        throw new Error('Ride not found');
    }
    if (ride.status !== 'pending') {
        throw new Error('Ride is not pending');
    }
    ride.captain = captainId;
    ride.status = 'accepted';
    await ride.save();
    return ride;
};

module.exports.findActiveRideForUser = async (userId) => {
    if (!userId) throw new Error('userId required');
    // Return rides that are active for the user, or completed but not yet paid
    const ride = await rideModel.findOne({
        user: userId,
        $or: [
            { status: { $in: ['pending', 'accepted', 'ongoing'] } },
            { status: 'completed', paid: { $ne: true } }
        ]
    })
        .sort({ _id: -1 })
        .select('+otp');
    return ride;
};

module.exports.findActiveRideForCaptain = async (captainId) => {
    if (!captainId) throw new Error('captainId required');
    // Only surface rides that are actionable for the captain
    const ride = await rideModel.findOne({
        captain: captainId,
        status: { $in: ['accepted', 'ongoing'] }
    }).sort({ _id: -1 });
    return ride;
};

module.exports.finishRide = async (rideId, captainId) => {
    if (!rideId || !captainId) {
        throw new Error('rideId and captainId are required');
    }
    const ride = await rideModel.findById(rideId);
    if (!ride) throw new Error('Ride not found');
    if (String(ride.captain) !== String(captainId)) {
        throw new Error('Ride not assigned to this captain');
    }
    if (ride.status === 'completed') {
        // Idempotent: finishing an already completed ride returns current state
        return ride;
    }
    if (ride.status !== 'ongoing') {
        const err = new Error(`Ride cannot be finished from status '${ride.status}'`);
        err.code = 'INVALID_STATUS';
        throw err;
    }
    ride.status = 'completed';
    await ride.save();
    return ride;
};

module.exports.startRide = async (rideId, captainId, otp) => {
    if (!rideId || !captainId || !otp) {
        throw new Error('rideId, captainId and otp are required');
    }
    const ride = await rideModel.findById(rideId).select('+otp');
    if (!ride) {
        throw new Error('Ride not found');
    }
    if (String(ride.captain) !== String(captainId)) {
        throw new Error('Ride not assigned to this captain');
    }
    if (ride.status !== 'accepted') {
        throw new Error('Ride is not in accepted state');
    }
    // Normalize provided OTP to preserve leading zeros
    const providedOtp = String(otp).trim();
    const normalizedProvidedOtp = providedOtp.padStart(String(ride.otp).length, '0');
    if (String(ride.otp) !== normalizedProvidedOtp) {
        throw new Error('Invalid OTP');
    }
    ride.status = 'ongoing';
    await ride.save();
    // Do not include otp in response by default
    const sanitizedRide = await rideModel.findById(ride._id);
    return sanitizedRide;
};

module.exports.payRide = async (rideId, userId, method) => {
    if (!rideId || !userId) throw new Error('rideId and userId are required');
    const ride = await rideModel.findById(rideId);
    if (!ride) throw new Error('Ride not found');
    if (String(ride.user) !== String(userId)) throw new Error('Ride does not belong to this user');
    if (ride.status !== 'completed') throw new Error('Ride is not completed');
    // Mark payment (simplified cash payment)
    ride.paymentId = method || 'cash';
    ride.paid = true;
    await ride.save();
    return ride;
};