const rideService = require('../services/ride.services');

const {validationResult} =require('express-validator');

module.exports.createRide = async(req,res)=>{

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const { pickup , destination , vehicleType} = req.body;
    try{
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType});
        return res.status(201).json(ride);

    }
    catch(err){
        return res.status(400).json({message:err.message})

    }

}

module.exports.getFare = async(req,res)=>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const { pickup , destination } = req.query;
    try {

        const fare = await rideService.getFare(pickup,destination);
        return res.status(200).json(fare);
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
    

}

module.exports.acceptRide = async (req, res) => {
    try {
        const { rideId } = req.body;
        if (!rideId) return res.status(400).json({ message: 'rideId is required' });
        const ride = await rideService.acceptRide(rideId, req.captain._id);
        return res.status(200).json(ride);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

module.exports.getActiveRide = async (req, res) => {
    try {
        const ride = await rideService.findActiveRideForUser(req.user._id);
        if (!ride) return res.status(204).send();
        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: 'Failed to fetch active ride' });
    }
};

module.exports.startRide = async (req, res) => {
    try {
        const { rideId, otp } = req.body;
        if (!rideId || !otp) return res.status(400).json({ message: 'rideId and otp are required' });
        const ride = await rideService.startRide(rideId, req.captain._id, otp);
        return res.status(200).json(ride);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

module.exports.getActiveRideForCaptain = async (req, res) => {
    try {
        const ride = await rideService.findActiveRideForCaptain(req.captain._id);
        if (!ride) return res.status(204).send();
        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: 'Failed to fetch captain active ride' });
    }
};

module.exports.finishRide = async (req, res) => {
    try {
        const { rideId } = req.body;
        if (!rideId) return res.status(400).json({ message: 'rideId is required' });
        const ride = await rideService.finishRide(rideId, req.captain._id);
        return res.status(200).json(ride);
    } catch (err) {
        // Provide clearer status code when ride is not in a finishable state
        if (err && err.code === 'INVALID_STATUS') {
            return res.status(409).json({ message: err.message });
        }
        return res.status(400).json({ message: err.message });
    }
};

module.exports.payRide = async (req, res) => {
    try {
        const { rideId, method } = req.body;
        if (!rideId) return res.status(400).json({ message: 'rideId is required' });
        const paidRide = await rideService.payRide(rideId, req.user._id, method || 'cash');
        return res.status(200).json(paidRide);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
module.exports.getPendingRide = async (req, res) => {
    try {
        const ride = await rideService.findLatestPendingRide();
        if (!ride) {
            // No pending rides available
            return res.status(204).send();
        }
        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: 'Failed to fetch pending ride' });
    }
};