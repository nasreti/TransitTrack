# TransTrack.  <img width="32" height="32" alt="image" src="https://github.com/user-attachments/assets/7c7ec83a-9110-4030-b570-e40312120828" />



A live SkyTrain arrival tracker for Translink trains across Metro Vancouver, built with React and Leaflet.

## Overview

TransTrack lets riders quickly look up upcoming departures on any of Vancouver's three SkyTrain lines. Pick your line, choose where you are departing from, and select your destination. The app shows the next four trains, estimated departure times, ride duration, and arrival time. A live interactive map updates throughout the flow to highlight your selected route.
<img width="1917" height="961" alt="Screenshot 2026-03-26 182402" src="https://github.com/user-attachments/assets/7d279cfc-6eee-4557-83e4-f153b2e77477" />
## Features

- **Three SkyTrain lines:** Expo Line (20 stations), Millennium Line (17 stations), Canada Line (15 stations, including both the Richmond Brighouse and YVR Airport branches)
- **Interactive Metro Vancouver map:** powered by Leaflet with CartoDB dark tiles; the map pans, zooms, highlights your selected line, and draws a route segment between your chosen stations
- **Step by step flow:** line, departure, destination; each step advances automatically on selection with a back link to change your mind
- **Station search filter:** type to narrow down the station list instantly
- **Arrival board:** shows the next 4 departures with minutes until departure, ride duration, and estimated arrival time; auto refreshes every 30 seconds
- **Translink Open API support:** paste your free API key from developer.translink.ca in the settings panel to switch from simulated to live data
- **Responsive layout:** split map and sidebar on desktop, stacked on mobile

## Train Visualization

The interactive map updates at every step of the selection flow:

- **No selection:** all three SkyTrain lines are rendered at equal opacity across Metro Vancouver, giving an immediate overview of the network
- **Line selected:** the chosen line is highlighted with a glowing polyline and the map automatically fits its bounds; the other two lines fade to barely visible
- **Departure selected:** the map flies to the chosen station, which is marked with a pulsing filled circle in the line brand color
- **Destination selected:** a second white marker appears at the destination, and a bright white polyline is drawn over the line path connecting the two stations, representing the exact segment you will be riding
- **Station dots:** every station on the selected line is rendered as a circle marker; hovering shows the station name in a tooltip styled to match the dark theme
- 
<img width="1774" height="699" alt="image" src="https://github.com/user-attachments/assets/205fdc55-f7e2-4204-863a-b6d37b638459" />

All coordinate data uses real world GPS positions for all 52 stations across the three lines, including both Canada Line branches.

## SEO Optimization

- **Descriptive page title:** the browser tab reads TransTrack, Stay in the loop, clearly identifying the purpose of the app
- **Favicon:** the Translink T logo is set as the browser tab icon for instant brand recognition
- **Semantic HTML:** the app uses proper landmark elements such as header, aside, and footer to help search engines and screen readers understand the page structure
- **lang attribute:** the root HTML element declares the language as English for correct indexing
- **Charset and viewport meta tags:** standard metadata is present in index.html for correct encoding and mobile rendering
- **Aria labels:** interactive controls include accessible labels on the map container and the settings button
- **Meaningful alt text:** the Translink logo image uses a descriptive alt attribute

## Tech Stack

- React 18, component based UI with hooks for state and side effects
- Vite, fast development server and optimized production bundler
- Leaflet, open source interactive mapping library
- react leaflet v4, React bindings for Leaflet compatible with React 18
- CartoDB Dark Matter tiles, free dark map tile layer with no API key required
- Plain CSS with custom properties, no CSS framework; all styles handwritten using CSS variables for theming
- Translink Open API, optional integration for live departure data
- Simulated arrival fallback, realistic mock data generated client side so the app works without any credentials

## Getting Started

```bash
cd translink-app
npm install
npm run dev
