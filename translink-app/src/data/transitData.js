export const LINES = [
  {
    id: 'expo',
    name: 'Expo Line',
    shortName: 'Expo',
    color: '#0076C0',
    textColor: '#ffffff',
    icon: '🔵',
  },
  {
    id: 'millennium',
    name: 'Millennium Line',
    shortName: 'Millennium',
    color: '#FFD700',
    textColor: '#1a1a1a',
    icon: '🟡',
  },
  {
    id: 'canada',
    name: 'Canada Line',
    shortName: 'Canada',
    color: '#6EC9E0',
    textColor: '#1a1a1a',
    icon: '🩵',
  },
];

export const STATIONS = {
  expo: [
    { id: 'waterfront', name: 'Waterfront', stopNo: '50001' },
    { id: 'burrard', name: 'Burrard', stopNo: '50002' },
    { id: 'granville', name: 'Granville', stopNo: '50003' },
    { id: 'stadium', name: 'Stadium–Chinatown', stopNo: '50004' },
    { id: 'main-science', name: 'Main St–Science World', stopNo: '50005' },
    { id: 'broadway-city-hall-expo', name: 'Broadway–City Hall', stopNo: '50006' },
    { id: 'nanaimo', name: 'Nanaimo', stopNo: '50007' },
    { id: '29th-avenue', name: '29th Avenue', stopNo: '50008' },
    { id: 'joyce', name: 'Joyce–Collingwood', stopNo: '50009' },
    { id: 'patterson', name: 'Patterson', stopNo: '50010' },
    { id: 'metrotown', name: 'Metrotown', stopNo: '50011' },
    { id: 'royal-oak', name: 'Royal Oak', stopNo: '50012' },
    { id: 'edmonds', name: 'Edmonds', stopNo: '50013' },
    { id: '22nd-street', name: '22nd Street', stopNo: '50014' },
    { id: 'new-westminster', name: 'New Westminster', stopNo: '50015' },
    { id: 'columbia', name: 'Columbia', stopNo: '50016' },
    { id: 'sapperton', name: 'Sapperton', stopNo: '50021' },
    { id: 'braid', name: 'Braid', stopNo: '50022' },
    { id: 'lougheed-expo', name: 'Lougheed Town Centre', stopNo: '51011' },
    { id: 'production-way-expo', name: 'Production Way–University', stopNo: '51010' },
    { id: 'scott-road', name: 'Scott Road', stopNo: '50017' },
    { id: 'gateway', name: 'Gateway', stopNo: '50018' },
    { id: 'surrey-central', name: 'Surrey Central', stopNo: '50019' },
    { id: 'king-george', name: 'King George', stopNo: '50020' },
  ],
  millennium: [
    { id: 'vcc-clark', name: 'VCC–Clark', stopNo: '51001' },
    { id: 'commercial-broadway', name: 'Commercial–Broadway', stopNo: '51002' },
    { id: 'renfrew', name: 'Renfrew', stopNo: '51003' },
    { id: 'rupert', name: 'Rupert', stopNo: '51004' },
    { id: 'gilmore', name: 'Gilmore', stopNo: '51005' },
    { id: 'brentwood', name: 'Brentwood Town Centre', stopNo: '51006' },
    { id: 'holdom', name: 'Holdom', stopNo: '51007' },
    { id: 'sperling', name: 'Sperling–Burnaby Lake', stopNo: '51008' },
    { id: 'lake-city-way', name: 'Lake City Way', stopNo: '51009' },
    { id: 'production-way', name: 'Production Way–University', stopNo: '51010' },
    { id: 'lougheed', name: 'Lougheed Town Centre', stopNo: '51011' },
    { id: 'burquitlam', name: 'Burquitlam', stopNo: '51012' },
    { id: 'moody-centre', name: 'Moody Centre', stopNo: '51013' },
    { id: 'inlet-centre', name: 'Inlet Centre', stopNo: '51014' },
    { id: 'coquitlam-central', name: 'Coquitlam Central', stopNo: '51015' },
    { id: 'lincoln', name: 'Lincoln', stopNo: '51016' },
    { id: 'lafarge', name: 'Lafarge Lake–Douglas', stopNo: '51017' },
  ],
  canada: [
    { id: 'waterfront-canada', name: 'Waterfront', stopNo: '52001' },
    { id: 'vancouver-city-centre', name: 'Vancouver City Centre', stopNo: '52002' },
    { id: 'yaletown', name: 'Yaletown–Roundhouse', stopNo: '52003' },
    { id: 'olympic-village', name: 'Olympic Village', stopNo: '52004' },
    { id: 'broadway-city-hall-canada', name: 'Broadway–City Hall', stopNo: '52005' },
    { id: 'king-edward', name: 'King Edward', stopNo: '52006' },
    { id: 'oakridge', name: 'Oakridge–41st Avenue', stopNo: '52007' },
    { id: 'langara', name: 'Langara–49th Avenue', stopNo: '52008' },
    { id: 'marine-drive', name: 'Marine Drive', stopNo: '52009' },
    { id: 'bridgeport', name: 'Bridgeport', stopNo: '52010' },
    { id: 'aberdeen', name: 'Aberdeen', stopNo: '52011' },
    { id: 'lansdowne', name: 'Lansdowne', stopNo: '52012' },
    { id: 'richmond-brighouse', name: 'Richmond–Brighouse', stopNo: '52013' },
    { id: 'sea-island-centre', name: 'Sea Island Centre', stopNo: '52014' },
    { id: 'yvr-airport', name: 'YVR–Airport', stopNo: '52015' },
  ],
};

export function getStationsForLine(lineId) {
  return STATIONS[lineId] || [];
}

export function getDestinations(lineId, originId) {
  const stations = getStationsForLine(lineId);
  return stations.filter((s) => s.id !== originId);
}

export function getStationIndex(lineId, stationId) {
  return STATIONS[lineId]?.findIndex((s) => s.id === stationId) ?? -1;
}

const EXPO_MAIN_IDS = [
  'waterfront',
  'burrard',
  'granville',
  'stadium',
  'main-science',
  'broadway-city-hall-expo',
  'nanaimo',
  '29th-avenue',
  'joyce',
  'patterson',
  'metrotown',
  'royal-oak',
  'edmonds',
  '22nd-street',
  'new-westminster',
  'columbia',
];

const EXPO_SURREY_IDS = ['scott-road', 'gateway', 'surrey-central', 'king-george'];

const EXPO_PWU_IDS = ['sapperton', 'braid', 'lougheed-expo', 'production-way-expo'];

let expoAdjacency = null;

function getExpoAdjacency() {
  if (expoAdjacency) return expoAdjacency;
  const adj = new Map();
  const link = (a, b) => {
    if (!adj.has(a)) adj.set(a, []);
    if (!adj.has(b)) adj.set(b, []);
    adj.get(a).push(b);
    adj.get(b).push(a);
  };
  for (let i = 0; i < EXPO_MAIN_IDS.length - 1; i++) {
    link(EXPO_MAIN_IDS[i], EXPO_MAIN_IDS[i + 1]);
  }
  link('columbia', EXPO_SURREY_IDS[0]);
  link('columbia', EXPO_PWU_IDS[0]);
  for (let i = 0; i < EXPO_SURREY_IDS.length - 1; i++) {
    link(EXPO_SURREY_IDS[i], EXPO_SURREY_IDS[i + 1]);
  }
  for (let i = 0; i < EXPO_PWU_IDS.length - 1; i++) {
    link(EXPO_PWU_IDS[i], EXPO_PWU_IDS[i + 1]);
  }
  expoAdjacency = adj;
  return adj;
}

function expoShortestPath(originId, destinationId) {
  const adj = getExpoAdjacency();
  const visited = new Set([originId]);
  const queue = [[originId]];
  while (queue.length) {
    const path = queue.shift();
    const cur = path[path.length - 1];
    if (cur === destinationId) return path;
    for (const next of adj.get(cur) || []) {
      if (visited.has(next)) continue;
      visited.add(next);
      queue.push([...path, next]);
    }
  }
  return [];
}

export function getRouteStationIds(lineId, originId, destinationId) {
  if (!destinationId || originId === destinationId) return [];
  if (lineId === 'expo') {
    return expoShortestPath(originId, destinationId);
  }
  const stations = STATIONS[lineId];
  if (!stations) return [];
  const o = stations.findIndex((s) => s.id === originId);
  const d = stations.findIndex((s) => s.id === destinationId);
  if (o === -1 || d === -1) return [];
  const lo = Math.min(o, d);
  const hi = Math.max(o, d);
  const segment = stations.slice(lo, hi + 1);
  return o <= d ? segment.map((s) => s.id) : segment.map((s) => s.id).reverse();
}
