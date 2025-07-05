const { map } = require('../app');
const mapService = require('../services/Map.services');
const {validationResult} = require('express-validator')

module.exports.getCoordinates = async(req,res,next)=>{
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {address} = req.query;

    try{
        const coordinates = await mapService.getMapCordinates(address);
        res.status(200).json(coordinates)  
      }catch(err){
        res.status(404).json({message: "coordinates not found"})
      }


}


module.exports.getDistanceTime = async(req,res,next)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    
    const {origin,destination} = req.query;
    try{
        
        const DistanceTime = await mapService.getTheDistanceTime(origin,destination);
        
        res.status(200).json(DistanceTime)
    }
    catch(error){
        return res.status(400).json({message:"distance and time not found"})

    }

}

module.exports.getAutoCompleteSuggestions = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {input} = req.query;
    try{
        const suggestions = await mapService.getAutoCompleteSuggestion(input)
        res.status(200).json(suggestions)
    }
    catch(error){
        console.log(error);
        res.status(402).json({message:'Internal server error'})

    }

}