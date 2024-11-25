# Vehicle Tracking Dashboard

## Overview
A front-end web application that displays vehicle locations on a map and provides a list view. The dashboard supports real-time updates with auto-refresh every 30 seconds. Users can filter vehicles by Vehicle ID, and click a vehicle to zoom into its location.

## Features
- Display vehicle locations on an interactive map (using Leaflet.js).
- List of vehicles with their current location and timestamp.
- Auto-refresh every 30 seconds.
- Filter vehicles by Vehicle ID.
- Error handling for API requests.

## Setup Instructions
1. Clone this repository.
2. Open `index.html` in a web browser.

### Running the App
You can directly open the `index.html` file in your browser, as the app uses mock data for vehicle locations.

## Additional Information
- The app uses **Leaflet.js** for displaying the map.
- The app fetches vehicle data via a simulated mock API.
- The page auto-refreshes every 30 seconds to show updated locations.
- For real-world applications, replace the mock API with a real-time data API.
