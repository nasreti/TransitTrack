import { useEffect, useState } from 'react';
import { fetchArrivals } from '../services/translinkApi.js';

export default function ArrivalBoard({ line, origin, destination, apiKey }) {
  const [arrivals, setArrivals]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchArrivals({
        lineId: line.id,
        originId: origin.id,
        destinationId: destination.id,
        apiKey,
      });
      setArrivals(data);
      setLastUpdated(new Date());
    } catch {
      setError('Could not load arrival times.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, [line.id, origin.id, destination.id, apiKey]);

  const statusClass = (s) => {
    if (s === 'Boarding')   return 'status-boarding';
    if (s === 'Approaching') return 'status-approaching';
    return 'status-ontime';
  };

  return (
    <div className="arrival-board" style={{ '--line-color': line.color }}>

      {/* Departures label */}
      <div className="board-label-row">
        <span className="board-label">Departures</span>
        {lastUpdated && (
          <span className="board-updated">
            {lastUpdated.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: true })}
          </span>
        )}
      </div>

      {loading && (
        <div className="board-loading">
          <div className="spinner" />
          <p>Fetching arrivals…</p>
        </div>
      )}

      {error && !loading && (
        <div className="board-error">
          <p>⚠ {error}</p>
          <button className="retry-btn" onClick={load}>Retry</button>
        </div>
      )}

      {!loading && !error && arrivals.length > 0 && (
        <>
          <div className="arrivals-list">
            {arrivals.map((arrival, idx) => (
              <div
                key={idx}
                className={`arrival-row ${idx === 0 ? 'arrival-next' : ''}`}
              >
                <div className="arrival-left">
                  {idx === 0 && <span className="next-label">NEXT</span>}
                  <span className="arrival-minutes">
                    {arrival.minutesUntil === 0 ? 'Now' : `${arrival.minutesUntil}`}
                  </span>
                  {arrival.minutesUntil !== 0 && (
                    <span className="arrival-clock">min · {arrival.departureTime}</span>
                  )}
                </div>

                <div className="arrival-center">
                  <div className="travel-info">
                    <span className="travel-icon">🚉</span>
                    <span className="travel-duration">{arrival.estimatedTravel} min ride</span>
                  </div>
                  {arrival.arrivalTime && (
                    <span className="arrival-arrives">Arrives {arrival.arrivalTime}</span>
                  )}
                </div>

                <div className="arrival-right">
                  {arrival.status && (
                    <span className={`status-chip ${statusClass(arrival.status)}`}>
                      {arrival.status}
                    </span>
                  )}
                  {!arrival.isRealTime && <span className="demo-chip">Est.</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="board-footer">
            <span className="refresh-icon">↻</span>
            <span>Refreshes every 30 s</span>
            <button className="refresh-btn" onClick={load}>Refresh</button>
          </div>
        </>
      )}

      {!loading && !error && arrivals.length === 0 && (
        <div className="board-empty">No upcoming trains found.</div>
      )}
    </div>
  );
}
