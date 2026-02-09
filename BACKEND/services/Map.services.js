
const axios = require('axios');
const { response } = require('../app');

module.exports.getMapCordinates = (async (address) => {

    const apiKey = process.env.GOOGLE_MAP_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        // console.log(response.data)
        if (response.data.status == "OK") {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };

        } else {
            throw new Error("unable to Fetch the Co-ordinates")
        }

    }
    catch (err) {
        console.log(err);
        throw err;

    }


})

module.exports.getTheDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Please mention both origin and destination");
    }

    const apiKey = process.env.GOOGLE_MAP_API;

    // First attempt: use raw addresses
    const addrUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&mode=driving&key=${apiKey}`;
    const addrResponse = await axios.get(addrUrl);
    const addrData = addrResponse.data;
    console.log("DistanceMatrix (addresses) data", addrData);

    try {
        if (addrData.status === "OK") {
            const element = addrData.rows?.[0]?.elements?.[0];

            if (element && element.status === "OK") {
                return {
                    distance: element.distance.text,
                    duration: element.duration.text,
                    distanceValue: element.distance.value,
                    durationValue: element.duration.value
                };
            }

            // If Google returns ZERO_RESULTS or NOT_FOUND on elements, try with geocoded lat,lng
            if (!element || ["ZERO_RESULTS", "NOT_FOUND"].includes(element?.status)) {
                const [origCoords, destCoords] = await Promise.all([
                    module.exports.getMapCordinates(origin),
                    module.exports.getMapCordinates(destination)
                ]);

                if (!origCoords || !destCoords) {
                    throw new Error("Failed to geocode one or both addresses");
                }

                const coordUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origCoords.ltd},${origCoords.lng}&destinations=${destCoords.ltd},${destCoords.lng}&mode=driving&key=${apiKey}`;
                const coordResponse = await axios.get(coordUrl);
                const coordData = coordResponse.data;
                console.log("DistanceMatrix (coordinates) data", coordData);

                if (coordData.status === "OK") {
                    const coordEl = coordData.rows?.[0]?.elements?.[0];
                    if (coordEl && coordEl.status === "OK") {
                        return {
                            distance: coordEl.distance.text,
                            duration: coordEl.duration.text,
                            distanceValue: coordEl.distance.value,
                            durationValue: coordEl.duration.value
                        };
                    }
                    throw new Error("Unable to find a route between coordinates: " + (coordEl?.status || coordData.status));
                }
                throw new Error("Distance Matrix error (coordinates): " + coordData.status);
            }

            // If element exists but is not OK and not covered above
            throw new Error("Unable to get distance or time from API: " + (element?.status || addrData.status));
        }

        // Top-level API status not OK
        throw new Error("Distance Matrix error: " + addrData.status);
    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
};

module.exports.getAutoCompleteSuggestion = async (input) => {
    if (!input) {
        throw new Error("Query is required");
    }

    const apiKey = process.env.GOOGLE_MAP_API;
    if (!apiKey) {
        throw new Error("API key is missing");
    }
    console.log(input,apiKey)
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        console.log(response.data);

        if (response.data.status === "OK") {
            return response.data.predictions;
        } else {
            throw new Error(`Google API Error: ${response.data.status} - ${response.data.error_message || 'No additional details'}`);
        }
    } catch (error) {
        console.error("Google API request failed:", error.message);
        throw error;
    }
};