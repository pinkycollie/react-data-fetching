import { useState } from 'react';
import { mockApi } from '../api/mockApi';

interface ControlsProps {
  onFetch: () => void;
  onInvalidate: () => void;
  onExternalFetch: () => void;
}

export function Controls({ onFetch, onInvalidate, onExternalFetch }: ControlsProps) {
  const [latency, setLatency] = useState(500);
  const [failureRate, setFailureRate] = useState(0);
  const [pollInterval, setPollInterval] = useState(0);
  const [useExternal, setUseExternal] = useState(false);
  const [strategy, setStrategy] = useState<'manual' | 'mount' | 'swr' | 'poll'>('manual');

  const handleLatencyChange = (value: number) => {
    setLatency(value);
    mockApi.setConfig({ latency: value });
  };

  const handleFailureRateChange = (value: number) => {
    setFailureRate(value);
    mockApi.setConfig({ failureRate: value });
  };

  const handlePollIntervalChange = (value: number) => {
    setPollInterval(value);
    mockApi.setConfig({ pollInterval: value });
  };

  const handleUseExternalChange = (checked: boolean) => {
    setUseExternal(checked);
    mockApi.setConfig({ useExternal: checked });
  };

  const handleClearLogs = () => {
    mockApi.clearLogs();
  };

  return (
    <div className="controls">
      <h2>Controls</h2>

      <div className="control-group">
        <label htmlFor="latency">
          Latency: <span className="value-display">{latency}ms</span>
        </label>
        <input
          id="latency"
          type="range"
          min="0"
          max="3000"
          step="100"
          value={latency}
          onChange={(e) => handleLatencyChange(Number(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label htmlFor="failureRate">
          Failure Rate: <span className="value-display">{(failureRate * 100).toFixed(0)}%</span>
        </label>
        <input
          id="failureRate"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={failureRate}
          onChange={(e) => handleFailureRateChange(Number(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label htmlFor="pollInterval">
          Poll Interval: <span className="value-display">{pollInterval}ms</span>
        </label>
        <input
          id="pollInterval"
          type="range"
          min="0"
          max="10000"
          step="1000"
          value={pollInterval}
          onChange={(e) => handlePollIntervalChange(Number(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label htmlFor="strategy">Strategy:</label>
        <select
          id="strategy"
          value={strategy}
          onChange={(e) => setStrategy(e.target.value as any)}
        >
          <option value="manual">Manual</option>
          <option value="mount">Fetch on Mount</option>
          <option value="swr">Stale-While-Revalidate</option>
          <option value="poll">Polling</option>
        </select>
      </div>

      <div className="control-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={useExternal}
            onChange={(e) => handleUseExternalChange(e.target.checked)}
          />
          Use JSONPlaceholder API
        </label>
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={onFetch}>
          Fetch Data
        </button>
        <button className="btn btn-secondary" onClick={onInvalidate}>
          Invalidate Cache
        </button>
        <button className="btn btn-secondary" onClick={onExternalFetch}>
          Trigger External Fetch
        </button>
        <button className="btn btn-danger" onClick={handleClearLogs}>
          Clear Logs
        </button>
      </div>

      <div className="control-group" style={{ marginTop: '1.5rem' }}>
        <label>Strategy Info:</label>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          {strategy === 'manual' && 'Click "Fetch Data" to load data manually'}
          {strategy === 'mount' && 'Data fetches automatically on component mount'}
          {strategy === 'swr' && 'Data refetches on window focus (staleTime: 5s)'}
          {strategy === 'poll' && `Data polls every ${pollInterval}ms (if > 0)`}
        </div>
      </div>
    </div>
  );
}
