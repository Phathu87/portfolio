// mock-api.js

// Generate mock vehicle data
function generateVehicleData() {
    return [
      { id: "V123", latitude: -25.754, longitude: 28.229, timestamp: new Date().toISOString() },
      { id: "V124", latitude: -26.204, longitude: 28.047, timestamp: new Date().toISOString() },
      { id: "V125", latitude: -27.963, longitude: 30.848, timestamp: new Date().toISOString() },
      // More vehicles can be added here
    ];
  }
  
  // Simulate fetching vehicle data from an API
  function fetchVehicleData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a random error with a 10% chance
        if (Math.random() < 0.1) {
          reject("Failed to load data.");
        } else {
          resolve(generateVehicleData());
        }
      }, 1500); // Simulate network delay
    });
  }
  