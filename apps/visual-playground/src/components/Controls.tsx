import { useState, useEffect } from 'react';
import { mockApiSettings } from '../api/mockApi';

export interface ControlsProps {
  onLatencyChange: (latency: number) => void;
  onFailureRateChange: (rate: number) => void;
  onPollingIntervalChange: (interval: number) => void;
  onEndpointChange: (endpoint: string) => void;
  pollingInterval: number;
  selectedEndpoint: string;
}

export default function Controls({
  onLatencyChange,
  onFailureRateChange,
  onPollingIntervalChange,
  onEndpointChange,
  pollingInterval,
  selectedEndpoint,
}: ControlsProps) {
  const [latency, setLatency] = useState(500);
  const [failureRate, setFailureRate] = useState(0);

  useEffect(() => {
    mockApiSettings.setLatency(latency);
  }, [latency]);

  useEffect(() => {
    mockApiSettings.setFailureRate(failureRate);
  }, [failureRate]);

  const handleLatencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLatency(value);
    onLatencyChange(value);
  };

  const handleFailureRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFailureRate(value);
    onFailureRateChange(value);
  };

  const handlePollingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    onPollingIntervalChange(value);
  };

  return (
    <div className="controls">
      <h2>🎮 Control Panel</h2>
      
      <div className="control-group">
        <label>
          Network Latency: {latency}ms
          <input
            type="range"
            min="0"
            max="3000"
            step="100"
            value={latency}
            onChange={handleLatencyChange}
          />
        </label>
      </div>

      <div className="control-group">
        <label>
          Failure Rate: {(failureRate * 100).toFixed(0)}%
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={failureRate}
            onChange={handleFailureRateChange}
          />
        </label>
      </div>

      <div className="control-group">
        <label>
          Polling Interval:
          <select value={pollingInterval} onChange={handlePollingChange}>
            <option value={0}>Disabled</option>
            <option value={2000}>2 seconds</option>
            <option value={5000}>5 seconds</option>
            <option value={10000}>10 seconds</option>
          </select>
        </label>
      </div>

      <div className="control-group">
        <label>
          Data Source:
          <select value={selectedEndpoint} onChange={(e) => onEndpointChange(e.target.value)}>
            <option value="mock-todos">Mock API - Todos</option>
            <option value="mock-posts">Mock API - Posts</option>
            <option value="mock-users">Mock API - Users</option>
            <option value="jsonplaceholder-todos">JSONPlaceholder - Todos</option>
            <option value="jsonplaceholder-posts">JSONPlaceholder - Posts</option>
            <option value="jsonplaceholder-users">JSONPlaceholder - Users</option>
          </select>
        </label>
      </div>

      <div className="control-info">
        <p>💡 <strong>Tips:</strong></p>
        <ul>
          <li>Adjust latency to simulate slow networks</li>
          <li>Increase failure rate to test error handling</li>
          <li>Enable polling to see automatic refetching</li>
          <li>Switch between mock and real APIs</li>
        </ul>
      </div>
    </div>
  );
}
