import React, { memo, useCallback, useState } from "react";
import { 
  GoogleMap, 
  MarkerF, 
  useJsApiLoader,
  Libraries 
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "60vh",
};

const center = {
  lat: 31.969958203597592,
  lng: 34.77102953182283,
};

const libraries: Libraries = ['places'];

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    language: "he",
    googleMapsApiKey: window.__CONFIG__.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    map.setCenter(center);
    map.setZoom(15);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return <div>טוען מפה...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <MarkerF
        position={center}
        icon={{
          url: "/marker-tv-shop.png",
          scaledSize: new window.google.maps.Size(115, 90)
        }}
        onClick={() => console.log('Marker clicked')}
      />
    </GoogleMap>
  );
}

export default memo(MapComponent);