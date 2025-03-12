import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import PropTypes from 'prop-types';
import { MapPin } from 'lucide-react';


// Fix for default marker icon
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon
const customIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiI+PHBhdGggZmlsbD0iI2ZiYmYyNCIgZD0iTTE4IDJhMTQgMTQgMCAwIDAtMTQgMTRjMCA3LjM4NSA4LjgxNSAxNy4yOCAxMy4zNDYgMjAuODA4YTEuMDAxIDEuMDAxIDAgMCAwIDEuMzA4IDBDMjMuMTg1IDMzLjI4IDMyIDE3LjM4NSAzMiAxNkExNCAxNCAwIDAgMCAxOCAyem0wIDIwYTYgNiAwIDEgMSAwLTEyIDYgNiAwIDAgMSAwIDEyeiIvPjwvc3ZnPg==',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36]
});

// Component to handle map movements
const MapController = ({ selectedDistrict, locations }) => {
  const map = useMap();

  React.useEffect(() => {
    if (selectedDistrict) {
      const location = locations.find(loc => loc.district === selectedDistrict);
      if (location) {
        map.flyTo([location.coordinates.lat, location.coordinates.lng], 10, {
          duration: 1.5
        });
      }
    }
  }, [selectedDistrict, locations, map]);

  return null;
};

const TenderMap = ({ locations, selectedDistrict, onDistrictSelect }) => {
  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[7.8731, 80.7718]} // Sri Lanka center
        zoom={7}
        className="w-full h-full rounded-lg"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {locations.map((location) => (
          <Marker
            key={location.district}
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => onDistrictSelect(location.district)
            }}
          >
            <Popup className="tender-popup">
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 mb-2">{location.district}</h3>
                <p className="text-sm text-gray-600">{location.tenderCount} active tenders</p>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <button 
                    className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
                    onClick={() => onDistrictSelect(location.district)}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </Popup>
            {location.tenderCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-white 
                text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {location.tenderCount}
              </div>
            )}
          </Marker>
        ))}

        <MapController selectedDistrict={selectedDistrict} locations={locations} />
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md z-[1000]">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-yellow-500" />
            <span className="text-xs text-gray-600">Active Tenders</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-200"></div>
            <span className="text-xs text-gray-600">Selected District</span>
          </div>
        </div>
      </div>
    </div>
  );
};

TenderMap.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    district: PropTypes.string.isRequired,
    coordinates: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired,
    tenderCount: PropTypes.number.isRequired,
    activeTenders: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      budget: PropTypes.number.isRequired
    })).isRequired
  })).isRequired,
  selectedDistrict: PropTypes.string,
  onDistrictSelect: PropTypes.func.isRequired
};
MapController.propTypes = {
  selectedDistrict: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.shape({
    district: PropTypes.string.isRequired,
    coordinates: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired
  })).isRequired
};
export default TenderMap;