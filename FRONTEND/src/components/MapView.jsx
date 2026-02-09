import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, Polyline, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = { lat: 28.6139, lng: 77.2090 }; // New Delhi fallback

const MapView = ({ pickup, destination }) => {
  const [pickupCoord, setPickupCoord] = useState(null);
  const [destCoord, setDestCoord] = useState(null);
  const [directions, setDirections] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    const geocode = (address, setter) => {
      if (!address || address.trim().length < 3 || !window.google) {
        setter(null);
        return;
      }
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const loc = results[0].geometry.location;
          setter({ lat: loc.lat(), lng: loc.lng() });
        } else {
          setter(null);
        }
      });
    };
    geocode(pickup, setPickupCoord);
    geocode(destination, setDestCoord);
  }, [pickup, destination, isLoaded]);

  const center = useMemo(() => {
    if (pickupCoord) return pickupCoord;
    if (destCoord) return destCoord;
    return defaultCenter;
  }, [pickupCoord, destCoord]);

  // Fit the map to show both points when available
  useEffect(() => {
    if (mapInstance && pickupCoord && destCoord && window.google) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(pickupCoord);
      bounds.extend(destCoord);
      mapInstance.fitBounds(bounds);
    }
  }, [mapInstance, pickupCoord, destCoord]);

  // Fetch directions when both points are available
  useEffect(() => {
    if (!isLoaded || !pickupCoord || !destCoord || !window.google) {
      onload= (m)=> setMapInstance(m);
      setDirections(null);
      return;
    }
    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: pickupCoord,
        destination: destCoord,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        } else {
          setDirections(null);
        }
      }
    );
  }, [isLoaded, pickupCoord, destCoord]);

  if (!isLoaded) {
    return <div className="h-full w-full bg-gray-200" />;
  }
      {!directions && pickupCoord && destCoord && (
        <Polyline
          path={[pickupCoord, destCoord]}
          options={{
            strokeColor: '#1E90FF',
            strokeOpacity: 0.6,
            strokeWeight: 4,
          }}
        />
      )}

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={(m)=>{} }
      options={{
        gestureHandling: 'greedy',
        zoomControl: true,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {pickupCoord && <Marker position={pickupCoord} label="P" />}
      {destCoord && <Marker position={destCoord} label="D" />}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: true,
            preserveViewport: false,
            polylineOptions: {
              strokeColor: '#1E90FF',
              strokeOpacity: 0.9,
              strokeWeight: 5,
            },
          }}
        />
      )}
    </GoogleMap>
  );
};

export default MapView;
