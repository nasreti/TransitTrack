# TransitTrack — Stay in the loop

Real time SkyTrain arrival tracker for Translink trains built with React and Leaflet.

## Overview

TransitTrack lets riders quickly look up upcoming departures on any of Vancouver's three SkyTrain lines. Pick your line, choose where you're departing from, and select your destination the app shows the next four trains, estimated departure times, ride duration, and arrival time. A live interactive map updates throughout the flow to highlight your selected route.

## Features

- **Three SkyTrain lines** — Expo Line (20 stations), Millennium Line (17 stations), Canada Line (15 stations, including both the Richmond-Brighouse and YVR-Airport branches)
- **Interactive Metro Vancouver map** — powered by Leaflet with CartoDB dark tiles; the map pans, zooms, highlights your selected line, and draws a route segment between your chosen stations
- **Step-by-step flow** — line → departure → destination, each step auto-advances on selection with a back link to change your mind
- **Station search filter** — type to narrow down the station list instantly
- **Arrival board** — shows the next 4 departures with minutes until departure, ride duration, and estimated arrival time; auto-refreshes every 30 seconds
- **Translink Open API support** — paste your free API key (from developer.translink.ca) in the settings panel to switch from simulated to live real-time data
- **Responsive layout** — split map/sidebar on desktop, stacked on mobile

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Map | Leaflet + react-leaflet v4 |
| Tile layer | CartoDB Dark Matter (no API key required) |
| Styling | Plain CSS with custom properties |
| Data | Translink Open API / simulated fallback |

## Getting Started

```bash
# Install dependencies
cd translink-app
npm install

# Start the development server
npm run dev
