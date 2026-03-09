import React, { useState, useEffect, createContext, useContext } from "react";

// AuthContext (يمكن نقله إلى ملف منفصل)
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    id: "",
    
  });

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Component to get and display user location
const LocationContent = () => {
  const { user, logout } = useAuth();
  const [location, setLocation] = useState(null); // تم إصلاح الاسم من Location إلى location
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to get address from coordinates
  const getAddressFromCoordinates = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.display_name) {
          setAddress({
            fullAddress: data.display_name,
            city: data.address?.city || data.address?.town || data.address?.village,
            country: data.address?.country,
            state: data.address?.state
          });
        }
      }
    } catch (error) {
      console.log('Failed to get address:', error);
    }
  };

  // Get current location
  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);
    setAddress(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toLocaleString()
        };
        
        setLocation(locationData);
        
        // Get address details
        await getAddressFromCoordinates(locationData.latitude, locationData.longitude);
        
        setLoading(false);
      },
      (err) => {
        let errorMessage = '';
        switch(err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case err.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
          default:
            errorMessage = err.message || "Failed to retrieve location";
            break;
        }
        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Auto-detect location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Copy coordinates to clipboard
  const copyCoordinates = () => {
    if (location) {
      const coords = `${location.latitude}, ${location.longitude}`;
      navigator.clipboard.writeText(coords).then(() => {
        alert('Coordinates copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy coordinates');
      });
    }
  };

  // Share location
  const shareLocation = () => {
    if (navigator.share && location) {
      navigator.share({
        title: 'My Location',
        text: `Check out my current location: ${location.latitude}, ${location.longitude}`,
        url: `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
      }).catch(err => console.log('Error sharing:', err));
    } else {
      copyCoordinates();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header with user info */}
        <div className="bg-white backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center border border-white/50">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-4xl">{user?.name }</span>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-4xl">📍</span>
                Location Tracker
              </h1>
              <p className="text-gray-600">Real-time location detection</p>
            </div>
          </div>

        
        </div>

        {/* Location Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
          
          {/* Control buttons */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>🌍</span>
              Your Current Location
            </h2>
            <button
              onClick={getCurrentLocation}
              disabled={loading}
              className="bg-yellow-300 hover:bg-yellow-600 disabled:bg-yellow-300 text-black px-4 py-2 rounded-xl transition-colors font-medium flex items-center gap-2 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Locating...
                </>
              ) : (
                <>
                  <span>🔄</span>
                  Refresh Location
                </>
              )}
            </button>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-600 p-4 rounded-xl mb-4 text-center">
              <span className="text-2xl block mb-2">❌</span>
              <p className="font-medium">{error}</p>
              <button
                onClick={getCurrentLocation}
                className="mt-3 bg-yellow-300 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && !location && (
            <div className="text-center py-8">
              <div className="animate-pulse space-y-4">
                <div className="text-4xl">📡</div>
                <p className="text-gray-600 font-medium">Detecting your location...</p>
                <div className="w-16 h-1 bg-yellow-300 rounded-full mx-auto animate-pulse"></div>
              </div>
            </div>
          )}

          {/* Location Data */}
          {location && !loading && (
            <div className="space-y-6">
              
              {/* Coordinates */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🎯</span>
                  Geographic Coordinates
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/60 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Latitude</label>
                    <p className="text-lg font-mono text-gray-800">{location.latitude.toFixed(6)}°</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Longitude</label>
                    <p className="text-lg font-mono text-gray-800">{location.longitude.toFixed(6)}°</p>
                  </div>
                </div>
                
                <div className="bg-white/60 rounded-lg p-4 mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Accuracy</label>
                  <p className="text-green-600 font-medium">±{Math.round(location.accuracy)} meters</p>
                </div>

                <div className="bg-white/60 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Detected At</label>
                  <p className="text-gray-700">{location.timestamp}</p>
                </div>
              </div>

              {/* Address Information */}
              {address && (
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>📮</span>
                    Address Details
                  </h3>
                  
                  {address.fullAddress && (
                    <div className="bg-white/60 rounded-lg p-4 mb-3">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Full Address</label>
                      <p className="text-gray-700 leading-relaxed">{address.fullAddress}</p>
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    {address.city && (
                      <div className="bg-white/60 rounded-lg p-3">
                        <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                        <p className="text-gray-800 font-medium">{address.city}</p>
                      </div>
                    )}
                    {address.state && (
                      <div className="bg-white/60 rounded-lg p-3">
                        <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
                        <p className="text-gray-800 font-medium">{address.state}</p>
                      </div>
                    )}
                    {address.country && (
                      <div className="bg-white/60 rounded-lg p-3 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Country</label>
                        <p className="text-gray-800 font-medium">{address.country}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={copyCoordinates}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-colors font-medium flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>📋</span>
                  Copy Coordinates
                </button>
                
                <button
                  onClick={shareLocation}
                  className="bg-yellow-300 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl transition-colors font-medium flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>📤</span>
                  Share Location
                </button>
              </div>

              {/* Map Links */}
              <div className="bg-gradient-to-r from-white to-white rounded-xl p-6 border border-yellow-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🗺️</span>
                  View on Maps
                </h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <a
                    href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-gray-50 text-gray-800 p-4 rounded-xl transition-all duration-300 text-center border border-gray-200 hover:border-yellow-300 hover:shadow-md group block"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🗺️</div>
                    <div className="font-medium">Google Maps</div>
                  </a>
                  
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}&zoom=15`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-gray-50 text-gray-800 p-4 rounded-xl transition-all duration-300 text-center border border-gray-200 hover:border-yellow-300 hover:shadow-md group block"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🌍</div>
                    <div className="font-medium">OpenStreetMap</div>
                  </a>
                  
                  <a
                    href={`https://www.bing.com/maps?cp=${location.latitude}~${location.longitude}&lvl=15`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-gray-50 text-gray-800 p-4 rounded-xl transition-all duration-300 text-center border border-gray-200 hover:border-yellow-300 hover:shadow-md group block"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🗺️</div>
                    <div className="font-medium">Bing Maps</div>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

       
        
      </div>
    </div>
  );
};

// Main wrapper component
const Location = () => {
  return (
    <AuthProvider>
      <LocationContent />
    </AuthProvider>
  );
};

export default Location;