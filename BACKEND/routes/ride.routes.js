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
module.exports = router;