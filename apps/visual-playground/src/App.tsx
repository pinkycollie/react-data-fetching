import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Controls } from './components/Controls';
import { Canvas } from './components/Canvas';
import { QueryDemo } from './components/QueryDemo';
import { OptimisticTodoList } from './components/OptimisticTodoList';
import './styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const queryClient = useQueryClient();

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleFetch = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  const handleInvalidate = () => {
    queryClient.invalidateQueries();
  };

  const handleExternalFetch = () => {
    queryClient.refetchQueries();
  };

  return (
    <div className="app-container" data-theme={theme}>
      <header className="app-header">
        <h1>🚀 React Query Visual Playground</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      <div className="main-content">
        <Controls
          onFetch={handleFetch}
          onInvalidate={handleInvalidate}
          onExternalFetch={handleExternalFetch}
        />

        <Canvas>
          <div className="demo-section">
            <h2>📊 useQuery Demo</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Demonstrates React Query's useQuery hook with configurable options. Watch how data is fetched,
              cached, and managed with different strategies.
            </p>
            <QueryDemo
              staleTime={5000}
              refetchOnWindowFocus={true}
              enabled={true}
            />
          </div>

          <div className="demo-section">
            <h2>✅ Optimistic Updates Demo</h2>
            <OptimisticTodoList />
          </div>
        </Canvas>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
