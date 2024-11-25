// script.js

// Initialize the map
const map = L.map('map').setView([-25.754, 28.229], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

let vehicleMarkers = {};

// Function to display vehicles on the map and list
function renderVehicles(vehicles) {
  const vehicleList = document.getElementById('vehicleList');
  vehicleList.innerHTML = '';

  vehicles.forEach(vehicle => {
    // Add vehicle to the list
    const listItem = document.createElement('li');
    listItem.textContent = `${vehicle.id} - (${vehicle.latitude.toFixed(2)}, ${vehicle.longitude.toFixed(2)})`;
    listItem.className = 'p-2 hover:bg-gray-200 cursor-pointer';
    listItem.addEventListener('click', () => centerOnVehicle(vehicle));
    vehicleList.appendChild(listItem);

    // Add marker to map
    if (vehicleMarkers[vehicle.id]) {
      vehicleMarkers[vehicle.id].setLatLng([vehicle.latitude, vehicle.longitude]);
    } else {
      vehicleMarkers[vehicle.id] = L.marker([vehicle.latitude, vehicle.longitude]).addTo(map)
        .bindPopup(`<strong>${vehicle.id}</strong><br>Last updated: ${new Date(vehicle.timestamp).toLocaleTimeString()}`);
    }
  });
}

// Center the map on a vehicle and open its popup
function centerOnVehicle(vehicle) {
  map.setView([vehicle.latitude, vehicle.longitude], 14);
  vehicleMarkers[vehicle.id].openPopup();
}

// Function to fetch and render vehicle data
async function updateVehicleData() {
  showLoadingState();
  try {
    const vehicles = await fetchVehicleData();
    renderVehicles(vehicles);
    hideLoadingState();
  } catch (error) {
    showErrorState(error);
  }
}

// Show loading state
function showLoadingState() {
  document.getElementById('loadingIndicator').classList.remove('hidden');
  document.getElementById('errorMessage').classList.add('hidden');
  document.getElementById('vehicleList').classList.add('hidden');
}

// Hide loading state
function hideLoadingState() {
  document.getElementById('loadingIndicator').classList.add('hidden');
  document.getElementById('vehicleList').classList.remove('hidden');
}

// Show error state
function showErrorState(error) {
  document.getElementById('errorMessage').textContent = error;
  document.getElementById('errorMessage').classList.remove('hidden');
}

// Auto-refresh every 30 seconds
setInterval(updateVehicleData, 30000);
updateVehicleData();

// Filter functionality
document.getElementById('filterInput').addEventListener('input', (event) => {
  const filterText = event.target.value.toLowerCase();
  const filteredMarkers = Object.values(vehicleMarkers)
    .filter(marker => marker._popup._content.toLowerCase().includes(filterText));
  
  // Remove all markers and re-add filtered ones
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
  
  filteredMarkers.forEach(marker => map.addLayer(marker));
});

