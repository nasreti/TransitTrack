import { useState, useMemo } from 'react';
import MetroMap from './components/MetroMap.jsx';
import ArrivalBoard from './components/ArrivalBoard.jsx';
import { LINES, getStationsForLine, getDestinations } from './data/transitData.js';

const STEP = { LINE: 0, ORIGIN: 1, DESTINATION: 2, RESULTS: 3 };

export default function App() {
  const [step, setStep]               = useState(STEP.LINE);
  const [selectedLine, setSelectedLine] = useState(null);
  const [origin, setOrigin]           = useState(null);
  const [destination, setDestination] = useState(null);
  const [filter, setFilter]           = useState('');
  const [apiKey, setApiKey]           = useState('');
  const [showApiKey, setShowApiKey]   = useState(false);

  const goBack = () => {
    setFilter('');
    if (step === STEP.ORIGIN)      { setSelectedLine(null); setOrigin(null); setDestination(null); }
    if (step === STEP.DESTINATION) { setOrigin(null); setDestination(null); }
    if (step === STEP.RESULTS)     { setDestination(null); }
    setStep((s) => Math.max(STEP.LINE, s - 1));
  };

  const handleLineSelect = (line) => {
    setFilter('');
    setSelectedLine(line); setOrigin(null); setDestination(null);
    setStep(STEP.ORIGIN);
  };

  const handleOriginSelect = (station) => {
    setFilter('');
    setOrigin(station); setDestination(null);
    setStep(STEP.DESTINATION);
  };

  const handleDestinationSelect = (station) => {
    setFilter('');
    setDestination(station);
    setStep(STEP.RESULTS);
  };

  const allStations   = selectedLine ? getStationsForLine(selectedLine.id) : [];
  const allDests      = (selectedLine && origin) ? getDestinations(selectedLine.id, origin.id) : [];

  const stations  = useMemo(() =>
    allStations.filter((s) => s.name.toLowerCase().includes(filter.toLowerCase())),
    [allStations, filter]
  );
  const dests = useMemo(() =>
    allDests.filter((s) => s.name.toLowerCase().includes(filter.toLowerCase())),
    [allDests, filter]
  );

  const lc = selectedLine?.color ?? null;

  return (
    <div className="layout">

      {/* ── Map (left) ───────────────────────────────────────── */}
      <div className="map-pane">
        <MetroMap selectedLine={selectedLine} origin={origin} destination={destination} />
      </div>

      {/* ── Sidebar (right) ──────────────────────────────────── */}
      <aside className="sidebar" style={lc ? { '--lc': lc } : {}}>

        {/* Colored line accent running full height */}
        <div className="sidebar-stripe" />

        {/* ── Brand header ──────────────────────────────────── */}
        <header className="sidebar-header">
          <div className="brand">
            <img src="/translink-logo.png" alt="T" className="brand-logo" />
            <div>
              <p className="brand-name">TransTrack</p>
              <p className="brand-tag">Stay in the loop</p>
            </div>
          </div>
          <button
            className="gear-btn"
            onClick={() => setShowApiKey((v) => !v)}
            aria-label="API settings"
          >
            ⚙
          </button>
        </header>

        {showApiKey && (
          <div className="api-drawer">
            <span className="api-label">
              API Key
              <a href="https://developer.translink.ca/" target="_blank" rel="noreferrer">
                developer.translink.ca ↗
              </a>
            </span>
            <input
              className="api-input"
              type="text"
              placeholder="Paste key for live data…"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="api-note">Without a key, simulated times are shown.</p>
          </div>
        )}

        {/* ── Route breadcrumb ──────────────────────────────── */}
        {selectedLine && (
          <div className="route-trail" style={{ borderColor: lc }}>
            {step > STEP.LINE && (
              <button className="back-link" onClick={goBack}>← back</button>
            )}
            <div className="crumbs">
              <span className="crumb crumb--line" style={{ color: lc }}>
                {selectedLine.shortName ?? selectedLine.name}
              </span>
              {origin && (
                <>
                  <span className="crumb-sep">›</span>
                  <span className="crumb">{origin.name}</span>
                </>
              )}
              {destination && (
                <>
                  <span className="crumb-sep">›</span>
                  <span className="crumb crumb--dest">{destination.name}</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── Step body ─────────────────────────────────────── */}
        <div className="sidebar-body">

          {/* STEP 0 — Line selection */}
          {step === STEP.LINE && (
            <div className="step-view" key="line">
              <h2 className="step-q">Which line<br/>are you taking?</h2>
              <ul className="line-list">
                {LINES.map((line) => (
                  <li key={line.id}>
                    <button
                      className="line-row"
                      style={{ '--lc': line.color }}
                      onClick={() => handleLineSelect(line)}
                    >
                      <span className="line-row-pip" />
                      <span className="line-row-name">{line.name}</span>
                      <span className="line-row-arrow">›</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* STEP 1 — Origin */}
          {step === STEP.ORIGIN && selectedLine && (
            <div className="step-view" key="origin">
              <h2 className="step-q">Departing<br/>from?</h2>
              <div className="search-wrap">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Filter stations…"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  autoFocus
                  style={{ '--lc': lc }}
                />
                {filter && (
                  <button className="search-clear" onClick={() => setFilter('')}>✕</button>
                )}
              </div>
              <ul className="station-list">
                {stations.map((s) => (
                  <li key={s.id}>
                    <button
                      className="station-row"
                      style={{ '--lc': lc }}
                      onClick={() => handleOriginSelect(s)}
                    >
                      <span className="station-dot" />
                      <span className="station-name">{s.name}</span>
                      <span className="station-arrow">›</span>
                    </button>
                  </li>
                ))}
                {stations.length === 0 && (
                  <li className="no-results">No stations match "{filter}"</li>
                )}
              </ul>
            </div>
          )}

          {/* STEP 2 — Destination */}
          {step === STEP.DESTINATION && selectedLine && origin && (
            <div className="step-view" key="destination">
              <h2 className="step-q">Going<br/>to?</h2>
              <div className="search-wrap">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Filter stations…"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  autoFocus
                  style={{ '--lc': lc }}
                />
                {filter && (
                  <button className="search-clear" onClick={() => setFilter('')}>✕</button>
                )}
              </div>
              <ul className="station-list">
                {dests.map((s) => (
                  <li key={s.id}>
                    <button
                      className="station-row"
                      style={{ '--lc': lc }}
                      onClick={() => handleDestinationSelect(s)}
                    >
                      <span className="station-dot" />
                      <span className="station-name">{s.name}</span>
                      <span className="station-arrow">›</span>
                    </button>
                  </li>
                ))}
                {dests.length === 0 && (
                  <li className="no-results">No stations match "{filter}"</li>
                )}
              </ul>
            </div>
          )}

          {/* STEP 3 — Results */}
          {step === STEP.RESULTS && selectedLine && origin && destination && (
            <div className="step-view" key="results">
              <ArrivalBoard
                line={selectedLine}
                origin={origin}
                destination={destination}
                apiKey={apiKey}
              />
            </div>
          )}

        </div>

        {/* ── Footer ────────────────────────────────────────── */}
        <footer className="sidebar-footer">
          <a href="https://www.translink.ca" target="_blank" rel="noreferrer">Translink</a>
          <span>·</span>
          <span>Metro Vancouver</span>
        </footer>
      </aside>
    </div>
  );
}
