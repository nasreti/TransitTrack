import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Tooltip,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { STATIONS } from '../data/transitData.js';

// ── Real-world station coordinates [lat, lng] ─────────────────
const LL = {
  // Canada Line
  'waterfront-canada':          [49.2847, -123.1113],
  'vancouver-city-centre':      [49.2797, -123.1167],
  'yaletown':                   [49.2739, -123.1215],
  'olympic-village':            [49.2674, -123.1100],
  'broadway-city-hall-canada':  [49.2634, -123.1163],
  'king-edward':                [49.2488, -123.1163],
  'oakridge':                   [49.2332, -123.1163],
  'langara':                    [49.2229, -123.1163],
  'marine-drive':               [49.2097, -123.1163],
  'bridgeport':                 [49.1951, -123.1163],
  'aberdeen':                   [49.1831, -123.1322],
  'lansdowne':                  [49.1748, -123.1390],
  'richmond-brighouse':         [49.1668, -123.1390],
  'sea-island-centre':          [49.1960, -123.1532],
  'yvr-airport':                [49.1940, -123.1841],

  // Expo Line
  'waterfront':                 [49.2847, -123.1113],
  'burrard':                    [49.2864, -123.1203],
  'granville':                  [49.2831, -123.1177],
  'stadium':                    [49.2791, -123.1094],
  'main-science':               [49.2728, -123.0994],
  'broadway-city-hall-expo':    [49.2634, -123.1163],
  'nanaimo':                    [49.2470, -123.0496],
  '29th-avenue':                [49.2415, -123.0370],
  'joyce':                      [49.2366, -123.0255],
  'patterson':                  [49.2252, -122.9938],
  'metrotown':                  [49.2247, -122.9991],
  'royal-oak':                  [49.2247, -122.9803],
  'edmonds':                    [49.2148, -122.9803],
  '22nd-street':                [49.2043, -122.9718],
  'new-westminster':            [49.2005, -122.9121],
  'columbia':                   [49.2060, -122.9013],
  'scott-road':                 [49.1972, -122.9013],
  'gateway':                    [49.1884, -122.8989],
  'surrey-central':             [49.1891, -122.8456],
  'king-george':                [49.1827, -122.8456],

  // Millennium Line
  'vcc-clark':                  [49.2639, -123.0694],
  'commercial-broadway':        [49.2627, -123.0695],
  'renfrew':                    [49.2628, -123.0426],
  'rupert':                     [49.2629, -123.0283],
  'gilmore':                    [49.2659, -122.9997],
  'brentwood':                  [49.2668, -122.9800],
  'holdom':                     [49.2669, -122.9626],
  'sperling':                   [49.2699, -122.9408],
  'lake-city-way':              [49.2669, -122.9251],
  'production-way':             [49.2523, -122.9234],
  'lougheed':                   [49.2481, -122.8993],
  'burquitlam':                 [49.2631, -122.8856],
  'moody-centre':               [49.2807, -122.8450],
  'inlet-centre':               [49.2903, -122.8155],
  'coquitlam-central':          [49.2836, -122.8002],
  'lincoln':                    [49.2678, -122.7956],
  'lafarge':                    [49.2558, -122.7958],
};

// ── Polyline paths for each line (Canada has 3 segments for branches) ──
const LINE_PATHS = {
  canada: [
    // Main line: Waterfront → Bridgeport
    [
      [49.2847, -123.1113], [49.2797, -123.1167], [49.2739, -123.1215],
      [49.2674, -123.1100], [49.2634, -123.1163], [49.2488, -123.1163],
      [49.2332, -123.1163], [49.2229, -123.1163], [49.2097, -123.1163],
      [49.1951, -123.1163],
    ],
    // Richmond branch: Bridgeport → Richmond-Brighouse
    [
      [49.1951, -123.1163], [49.1831, -123.1322], [49.1748, -123.1390],
      [49.1668, -123.1390],
    ],
    // YVR branch: Bridgeport → YVR-Airport
    [
      [49.1951, -123.1163], [49.1960, -123.1532], [49.1940, -123.1841],
    ],
  ],
  expo: [
    [
      [49.2847, -123.1113], [49.2864, -123.1203], [49.2831, -123.1177],
      [49.2791, -123.1094], [49.2728, -123.0994], [49.2634, -123.1163],
      [49.2470, -123.0496], [49.2415, -123.0370], [49.2366, -123.0255],
      [49.2252, -122.9938], [49.2247, -122.9991], [49.2247, -122.9803],
      [49.2148, -122.9803], [49.2043, -122.9718], [49.2005, -122.9121],
      [49.2060, -122.9013], [49.1972, -122.9013], [49.1884, -122.8989],
      [49.1891, -122.8456], [49.1827, -122.8456],
    ],
  ],
  millennium: [
    [
      [49.2639, -123.0694], [49.2627, -123.0695], [49.2628, -123.0426],
      [49.2629, -123.0283], [49.2659, -122.9997], [49.2668, -122.9800],
      [49.2669, -122.9626], [49.2699, -122.9408], [49.2669, -122.9251],
      [49.2523, -122.9234], [49.2481, -122.8993], [49.2631, -122.8856],
      [49.2807, -122.8450], [49.2903, -122.8155], [49.2836, -122.8002],
      [49.2678, -122.7956], [49.2558, -122.7958],
    ],
  ],
};

const LINE_COLORS = {
  canada:     '#6EC9E0',
  expo:       '#0076C0',
  millennium: '#FFD700',
};

// Vibrant versions used for the active route highlight
const LINE_HIGHLIGHT_COLORS = {
  expo:       '#00AAFF',
  millennium: '#FFE033',
  canada:     '#4DE8FF',
};

const LINE_NAMES = {
  canada:     'Canada Line',
  expo:       'Expo Line',
  millennium: 'Millennium Line',
};

// Default metro bounds — shows all three lines
const METRO_BOUNDS = [
  [49.155, -123.20],
  [49.30,  -122.76],
];

// ── Child component: adjusts map view as selection changes ─────
function MapController({ selectedLine, origin, destination }) {
  const map = useMap();

  useEffect(() => {
    if (origin && destination) {
      const a = LL[origin.id];
      const b = LL[destination.id];
      if (a && b) {
        map.fitBounds([a, b], { padding: [60, 60], maxZoom: 14 });
        return;
      }
    }
    if (origin) {
      const pos = LL[origin.id];
      if (pos) { map.flyTo(pos, 13, { duration: 0.8 }); return; }
    }
    if (selectedLine) {
      const coords = STATIONS[selectedLine.id]
        .map((s) => LL[s.id])
        .filter(Boolean);
      if (coords.length) {
        map.fitBounds(coords, { padding: [30, 30], maxZoom: 12 });
        return;
      }
    }
    map.fitBounds(METRO_BOUNDS, { duration: 0.6 });
  }, [selectedLine?.id, origin?.id, destination?.id]);

  return null;
}

// ── Route highlight between origin and destination ─────────────
function RouteHighlight({ selectedLine, origin, destination }) {
  if (!selectedLine || !origin || !destination) return null;

  const stations = STATIONS[selectedLine.id];
  const oIdx = stations.findIndex((s) => s.id === origin.id);
  const dIdx = stations.findIndex((s) => s.id === destination.id);
  if (oIdx === -1 || dIdx === -1) return null;

  const [lo, hi] = oIdx < dIdx ? [oIdx, dIdx] : [dIdx, oIdx];
  const coords = stations
    .slice(lo, hi + 1)
    .map((s) => LL[s.id])
    .filter(Boolean);

  if (coords.length < 2) return null;

  const highlightColor = LINE_HIGHLIGHT_COLORS[selectedLine.id] ?? '#ffffff';

  return (
    <Polyline
      positions={coords}
      color={highlightColor}
      weight={7}
      opacity={0.9}
    />
  );
}

// ── Main component ─────────────────────────────────────────────
export default function MetroMap({ selectedLine, origin, destination }) {
  const lineIds = ['expo', 'millennium', 'canada'];

  return (
    <div className="metro-map-wrap">
      <MapContainer
        bounds={METRO_BOUNDS}
        className="metro-map"
        zoomControl={true}
        scrollWheelZoom={true}
        attributionControl={true}
        style={{ height: '100%', width: '100%' }}
      >
        {/* Dark map tiles — no API key required */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>'
          maxZoom={20}
          subdomains="abcd"
        />

        <MapController
          selectedLine={selectedLine}
          origin={origin}
          destination={destination}
        />

        {/* ── Transit lines ─────────────────────────────────── */}
        {lineIds.map((lineId) => {
          const isSelected = selectedLine?.id === lineId;
          const dimmed    = selectedLine && !isSelected;
          const color     = LINE_COLORS[lineId];

          return LINE_PATHS[lineId].map((segment, i) => (
            <Polyline
              key={`${lineId}-${i}`}
              positions={segment}
              color={color}
              weight={isSelected ? 6 : 2.5}
              opacity={dimmed ? 0.1 : isSelected ? 0.95 : 0.22}
            />
          ));
        })}

        {/* ── Route segment highlight ───────────────────────── */}
        <RouteHighlight
          selectedLine={selectedLine}
          origin={origin}
          destination={destination}
        />

        {/* ── Station dots ──────────────────────────────────── */}
        {lineIds.map((lineId) => {
          const isSelected = selectedLine?.id === lineId;
          const dimmed    = selectedLine && !isSelected;
          const color     = LINE_COLORS[lineId];

          return STATIONS[lineId].map((station) => {
            const pos = LL[station.id];
            if (!pos) return null;
            const isOrigin = origin?.id === station.id;
            const isDest   = destination?.id === station.id;
            if (isOrigin || isDest) return null;

            return (
              <CircleMarker
                key={station.id}
                center={pos}
                radius={isSelected ? 5 : 2.5}
                pathOptions={{
                  color:       color,
                  fillColor:   color,
                  fillOpacity: dimmed ? 0.08 : isSelected ? 0.9 : 0.15,
                  weight:      isSelected ? 1.5 : 0,
                }}
              >
                {isSelected && (
                  <Tooltip
                    permanent
                    direction="top"
                    offset={[0, -7]}
                    className="station-name-label"
                  >
                    {station.name}
                  </Tooltip>
                )}
              </CircleMarker>
            );
          });
        })}

        {/* ── Origin marker ─────────────────────────────────── */}
        {origin && LL[origin.id] && (
          <CircleMarker
            center={LL[origin.id]}
            radius={10}
            pathOptions={{
              color:       '#ffffff',
              fillColor:   LINE_COLORS[selectedLine?.id] ?? '#1a6fd4',
              fillOpacity: 1,
              weight:      2.5,
            }}
          >
            <Tooltip permanent direction="right" offset={[12, 0]} className="map-tooltip">
              🚉 {origin.name}
            </Tooltip>
          </CircleMarker>
        )}

        {/* ── Destination marker ────────────────────────────── */}
        {destination && LL[destination.id] && (
          <CircleMarker
            center={LL[destination.id]}
            radius={10}
            pathOptions={{
              color:       '#ffffff',
              fillColor:   LINE_HIGHLIGHT_COLORS[selectedLine?.id] ?? '#ffffff',
              fillOpacity: 1,
              weight:      2.5,
            }}
          >
            <Tooltip permanent direction="right" offset={[12, 0]} className="map-tooltip">
              🏁 {destination.name}
            </Tooltip>
          </CircleMarker>
        )}
      </MapContainer>

      {/* ── Legend overlay ────────────────────────────────── */}
      <div className="map-legend">
        {lineIds.map((id) => (
          <div key={id} className="map-legend-item">
            <span className="map-legend-pip" style={{ background: LINE_COLORS[id] }} />
            <span>{LINE_NAMES[id]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
