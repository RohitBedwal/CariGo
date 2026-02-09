const express = require('express');
const  router = express.Router();
const {query,body} = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const  rideController  = require('../controllers/ride.controller');



router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('invalid ride service '),
    rideController.createRide

    
)
router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('invalid pickup address'),
    query('destination').isString().isLength({min:3}).withMessage('invalid destination address'),
    rideController.getFare
)

// Captain checks for available pending ride requests
router.get('/pending',
    authMiddleware.authCaptain,
    rideController.getPendingRide
)

// Captain accepts a ride
router.post('/accept',
    authMiddleware.authCaptain,
    rideController.acceptRide
)

// User polls active/latest ride including OTP
router.get('/active',
    authMiddleware.authUser,
    rideController.getActiveRide
)

// Captain starts ride after OTP verification
router.post('/start',
    authMiddleware.authCaptain,
    rideController.startRide
)

// Captain polls active/latest ride
router.get('/active-captain',
    authMiddleware.authCaptain,
    rideController.getActiveRideForCaptain
)

// Captain finishes an ongoing ride
router.post('/finish',
    authMiddleware.authCaptain,
    rideController.finishRide
)

// User completes payment after ride completion
router.post('/pay',
    authMiddleware.authUser,
    rideController.payRide
)
module.exports = router;