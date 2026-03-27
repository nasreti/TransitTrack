// SVG viewBox: "0 0 580 370"
// Layout:
//   Canada Line  — vertical, left side (x ≈ 108)
//   Expo Line    — south from Waterfront then east to Surrey (x=130 shared section)
//   Millennium   — diagonal NE from East Vancouver to Coquitlam

export const LINE_META = {
  canada:      { stroke: '#6EC9E0', label: 'Canada Line' },
  expo:        { stroke: '#0076C0', label: 'Expo Line' },
  millennium:  { stroke: '#FFD700', label: 'Millennium Line' },
};

// Each entry is an array of SVG path strings for that line
export const LINE_PATHS_SVG = {
  canada: [
    'M 108 50 L 108 272',
    'M 108 272 L 73 340',
    'M 108 272 L 151 340',
  ],
  expo: [
    'M 130 50 L 130 157',
    'M 130 157 L 480 178',
  ],
  millennium: [
    'M 195 220 L 550 70',
  ],
};

// Exact positions on the paths above.
// Expo vertical section: x=130, y from 50→157
// Expo horizontal section: slope = (178-157)/(480-130) = 21/350 ≈ 0.06  y = 157 + 0.06*(x-130)
// Canada vertical: x=108, y from 50→272, branches below
// Millennium: from (195,220) to (550,70): slope = (70-220)/(550-195) = -150/355 ≈ -0.4225
//             y = 220 - 0.4225*(x-195)
export const STATION_COORDS = {
  // ── Canada Line ──────────────────────────────────────────────
  'waterfront-canada':       { x: 108, y: 50  },
  'vancouver-city-centre':   { x: 108, y: 80  },
  'yaletown':                { x: 108, y: 107 },
  'olympic-village':         { x: 108, y: 130 },
  'broadway-city-hall-canada':{ x: 108, y: 157 },
  'king-edward':             { x: 108, y: 180 },
  'oakridge':                { x: 108, y: 200 },
  'langara':                 { x: 108, y: 220 },
  'marine-drive':            { x: 108, y: 242 },
  'bridgeport':              { x: 108, y: 272 },
  // Richmond branch
  'aberdeen':                { x: 91,  y: 295 },
  'lansdowne':               { x: 80,  y: 318 },
  'richmond-brighouse':      { x: 73,  y: 340 },
  // YVR branch
  'sea-island-centre':       { x: 129, y: 295 },
  'yvr-airport':             { x: 151, y: 340 },

  // ── Expo Line ────────────────────────────────────────────────
  'waterfront':              { x: 130, y: 50  },
  'burrard':                 { x: 130, y: 77  },
  'granville':               { x: 130, y: 100 },
  'stadium':                 { x: 130, y: 122 },
  'main-science':            { x: 130, y: 144 },
  'broadway-city-hall-expo': { x: 130, y: 157 },
  // East section (y = 157 + 0.06*(x-130))
  'nanaimo':                 { x: 172, y: 160 },
  '29th-avenue':             { x: 200, y: 162 },
  'joyce':                   { x: 228, y: 164 },
  'patterson':               { x: 260, y: 165 },
  'metrotown':               { x: 292, y: 167 },
  'royal-oak':               { x: 320, y: 169 },
  'edmonds':                 { x: 344, y: 170 },
  '22nd-street':             { x: 363, y: 171 },
  'new-westminster':         { x: 383, y: 172 },
  'columbia':                { x: 400, y: 173 },
  'scott-road':              { x: 418, y: 174 },
  'gateway':                 { x: 437, y: 175 },
  'surrey-central':          { x: 459, y: 176 },
  'king-george':             { x: 480, y: 178 },

  // ── Millennium Line ───────────────────────────────────────────
  // y = 220 - 0.4225*(x - 195)
  'vcc-clark':               { x: 195, y: 220 },
  'commercial-broadway':     { x: 220, y: 209 },
  'renfrew':                 { x: 244, y: 199 },
  'rupert':                  { x: 265, y: 190 },
  'gilmore':                 { x: 287, y: 181 },
  'brentwood':               { x: 313, y: 170 },
  'holdom':                  { x: 336, y: 160 },
  'sperling':                { x: 358, y: 151 },
  'lake-city-way':           { x: 378, y: 143 },
  'production-way':          { x: 400, y: 133 },
  'lougheed':                { x: 425, y: 123 },
  'burquitlam':              { x: 452, y: 111 },
  'moody-centre':            { x: 472, y: 103 },
  'inlet-centre':            { x: 490, y: 95  },
  'coquitlam-central':       { x: 508, y: 87  },
  'lincoln':                 { x: 525, y: 80  },
  'lafarge':                 { x: 550, y: 70  },
};

// Waterfront and Broadway–City Hall are shared by Canada + Expo
export const INTERCHANGES = [
  { x: 119, y: 50,  label: 'Waterfront' },
  { x: 119, y: 157, label: 'Broadway–City Hall' },
];

// Subtle geography labels
export const AREA_LABELS = [
  { x: 55,  y: 28,  text: 'Downtown' },
  { x: 55,  y: 40,  text: 'Vancouver' },
  { x: 300, y: 148, text: 'Burnaby' },
  { x: 490, y: 60,  text: 'Coquitlam' },
  { x: 460, y: 192, text: 'Surrey' },
  { x: 58,  y: 355, text: 'Richmond' },
  { x: 160, y: 355, text: 'YVR' },
];
