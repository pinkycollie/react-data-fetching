import { useState } from 'react';
import Controls from './components/Controls';
import Canvas from './components/Canvas';
import CacheView from './components/CacheView';
import NetworkLane from './components/NetworkLane';
import QueryDemo from './components/QueryDemo';
import OptimisticTodoList from './components/OptimisticTodoList';
import type { NetworkEvent } from './components/NetworkLane';

function App() {
  const [pollingInterval, setPollingInterval] = useState(0);
  const [selectedEndpoint, setSelectedEndpoint] = useState('mock-todos');
  const [networkEvents, setNetworkEvents] = useState<NetworkEvent[]>([]);

  const handleNetworkEvent = (event: NetworkEvent) => {
    setNetworkEvents((prev) => [...prev, event]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎨 Visual React Query Playground</h1>
        <p className="app-subtitle">
          Interactive demo of React Query caching, SWR flows, polling, and optimistic updates
        </p>
      </header>

      <div className="app-layout">
        <aside className="sidebar">
          <Controls
            onLatencyChange={() => {}}
            onFailureRateChange={() => {}}
            onPollingIntervalChange={setPollingInterval}
            onEndpointChange={setSelectedEndpoint}
            pollingInterval={pollingInterval}
            selectedEndpoint={selectedEndpoint}
          />
        </aside>

        <main className="main-content">
          <Canvas>
            <QueryDemo
              endpoint={selectedEndpoint}
              pollingInterval={pollingInterval}
              onNetworkEvent={handleNetworkEvent}
            />
            <OptimisticTodoList onNetworkEvent={handleNetworkEvent} />
          </Canvas>
        </main>

        <aside className="sidebar-right">
          <CacheView />
          <NetworkLane events={networkEvents} />
        </aside>
      </div>

      <footer className="app-footer">
        <p>
          Built with React Query v5 • Vite • TypeScript
        </p>
        <p className="footer-links">
          <a
            href="https://tanstack.com/query/latest"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Query Docs
          </a>
          {' | '}
          <a
            href="https://github.com/pinkycollie/react-data-fetching"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
