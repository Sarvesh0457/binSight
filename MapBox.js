import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapBox = ({ pincode }) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const [dumpingYards, setDumpingYards] = useState([]);

  useEffect(() => {
    if (pincode.trim()) {
      mapboxgl.accessToken = 'pk.eyJ1IjoidGhpcmQtZXllIiwiYSI6ImNtZzNnYXFydjB5dTMya3NkY2g2anZtNDYifQ.FCb_MzXXr5H5h5goE_fzag';

      // Initialize the map if not already initialized
      if (!mapRef.current) {
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          center: [73.2065, 22.3000], // Default center
          zoom: 10
        });
      }

      // Fetch geolocation data from Mapbox to get the center for the pincode
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pincode}.json?access_token=${mapboxgl.accessToken}`)
        .then((response) => response.json())
        .then((data) => {
          const features = data.features;
          if (features.length > 0) {
            const [longitude, latitude] = features[0].center;

            // Update map center based on the pincode location
            mapRef.current.setCenter([longitude, latitude]);
            mapRef.current.setZoom(10);

            // Fetch dumping yard data from your backend
            fetch(`http://localhost:8080/api/dumping-yard/${pincode}`)
              .then((response) => response.json())
              .then((yardData) => {
                if (yardData.success) {
                  setDumpingYards(yardData.data);
                } else {
                  console.log('No dumping yard data found for this pincode.');
                  setDumpingYards([]);
                }
              })
              .catch((error) => {
                console.error('Error fetching dumping yard data:', error);
                alert('Error fetching dumping yard data.');
              });
          } else {
            alert('No results found for this pincode');
          }
        })
        .catch((error) => {
          console.error('Error fetching geocoding data:', error);
          alert('Error fetching geolocation data.');
        });
    }
  }, [pincode]);

  // Add markers for the dumping yards
  useEffect(() => {
    if (mapRef.current && dumpingYards.length > 0) {
      dumpingYards.forEach((yard) => {
        new mapboxgl.Marker({ color: 'red' })
          .setLngLat([yard.lon, yard.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${yard.name}</h3>`)) // Popup with the name of the yard
          .addTo(mapRef.current);
      });
    }
  }, [dumpingYards]);

  return (
    <div
      style={{ height: '100%' }}
      ref={mapContainerRef}
      className="map-container"
    />
  );
};

export default MapBox;
