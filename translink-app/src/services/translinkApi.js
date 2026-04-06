import { getRouteStationIds, STATIONS } from '../data/transitData.js';

const API_BASE = 'https://api.translink.ca/rttiapi/v1';

export async function fetchArrivals({ lineId, originId, destinationId, apiKey }) {
  if (apiKey && apiKey.trim().length > 0) {
    try {
      return await fetchFromApi({ lineId, originId, destinationId, apiKey });
    } catch {
    }
  }
  return generateMockArrivals({ lineId, originId, destinationId });
}

async function fetchFromApi({ lineId, originId, destinationId, apiKey }) {
  const stations = STATIONS[lineId];
  if (!stations) throw new Error('Unknown line');

  const origin = stations.find((s) => s.id === originId);
  if (!origin) throw new Error('Unknown origin');

  const url = `${API_BASE}/stops/${origin.stopNo}/estimates?apiKey=${apiKey}&count=5&timeRange=120`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const data = await res.json();
  return parseApiResponse(data, lineId, originId, destinationId);
}

function parseApiResponse(data, lineId, originId, destinationId) {
  const arrivals = [];

  for (const stop of data) {
    for (const schedule of stop.Schedules || []) {
      const leaveTime = schedule.ExpectedLeaveTime;
      const mins = parseInt(schedule.ExpectedCountdown, 10);
      arrivals.push({
        departureTime: leaveTime,
        minutesUntil: isNaN(mins) ? null : mins,
        estimatedTravel: estimateTravelTime(lineId, originId, destinationId),
        destination: schedule.Destination || 'Unknown',
        isRealTime: true,
      });
    }
  }

  return arrivals.slice(0, 4);
}

function estimateTravelTime(lineId, originId, destinationId) {
  const path = getRouteStationIds(lineId, originId, destinationId);
  if (path.length < 2) return null;
  const stops = path.length - 1;
  return stops * 2 + 1;
}

function generateMockArrivals({ lineId, originId, destinationId }) {
  const travelMins = estimateTravelTime(lineId, originId, destinationId) ?? 10;
  const now = new Date();
  const intervals = [2, 8, 14, 22];

  return intervals.map((offset, i) => {
    const depart = new Date(now.getTime() + offset * 60 * 1000);
    const arrive = new Date(depart.getTime() + travelMins * 60 * 1000);
    return {
      departureTime: formatTime(depart),
      arrivalTime: formatTime(arrive),
      minutesUntil: offset,
      estimatedTravel: travelMins,
      isRealTime: false,
      trainLabel: `Train ${i + 1}`,
      status: offset <= 2 ? 'Boarding' : offset <= 5 ? 'Approaching' : 'On time',
    };
  });
}

function formatTime(date) {
  return date.toLocaleTimeString('en-CA', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
