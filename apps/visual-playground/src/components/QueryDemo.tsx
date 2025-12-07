import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { mockApi } from '../api/mockApi';
import apiClient from '../api/http';
import type { NetworkEvent } from './NetworkLane';

interface QueryDemoProps {
  endpoint: string;
  pollingInterval: number;
  onNetworkEvent: (event: NetworkEvent) => void;
}

export default function QueryDemo({
  endpoint,
  pollingInterval,
  onNetworkEvent,
}: QueryDemoProps) {
  const queryClient = useQueryClient();
  const [staleTime, setStaleTime] = useState(0);
  const [refetchOnWindowFocus, setRefetchOnWindowFocus] = useState(false);

  const fetchData = async () => {
    const requestId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const startTime = Date.now();

    onNetworkEvent({
      id: requestId,
      type: 'request',
      timestamp: startTime,
      endpoint: endpoint,
    });

    try {
      let data;
      
      if (endpoint.startsWith('mock-')) {
        const type = endpoint.split('-')[1];
        switch (type) {
          case 'todos':
            data = await mockApi.getTodos();
            break;
          case 'posts':
            data = await mockApi.getPosts();
            break;
          case 'users':
            data = await mockApi.getUsers();
            break;
          default:
            throw new Error('Unknown endpoint');
        }
      } else {
        // JSONPlaceholder endpoints
        const type = endpoint.split('-')[1];
        const response = await apiClient.get(
          `https://jsonplaceholder.typicode.com/${type}`
        );
        data = response.data;
      }

      const duration = Date.now() - startTime;
      onNetworkEvent({
        id: requestId,
        type: 'response',
        timestamp: Date.now(),
        endpoint: endpoint,
        duration,
      });

      return data;
    } catch (error) {
      onNetworkEvent({
        id: requestId,
        type: 'error',
        timestamp: Date.now(),
        endpoint: endpoint,
      });
      throw error;
    }
  };

  const { data, isLoading, isError, error, isFetching, dataUpdatedAt } = useQuery({
    queryKey: ['data', endpoint],
    queryFn: fetchData,
    staleTime: staleTime,
    refetchOnWindowFocus: refetchOnWindowFocus,
    refetchInterval: pollingInterval > 0 ? pollingInterval : false,
  });

  const handleManualRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ['data', endpoint] });
  };

  return (
    <div className="query-demo">
      <h3>🔍 Query Demo</h3>
      
      <div className="query-controls">
        <div className="query-control">
          <label>
            Stale Time:
            <select
              value={staleTime}
              onChange={(e) => setStaleTime(parseInt(e.target.value))}
            >
              <option value={0}>0ms (always stale)</option>
              <option value={5000}>5 seconds</option>
              <option value={10000}>10 seconds</option>
              <option value={30000}>30 seconds</option>
              <option value={Infinity}>Infinity (never stale)</option>
            </select>
          </label>
        </div>

        <div className="query-control">
          <label>
            <input
              type="checkbox"
              checked={refetchOnWindowFocus}
              onChange={(e) => setRefetchOnWindowFocus(e.target.checked)}
            />
            Refetch on window focus
          </label>
        </div>

        <button onClick={handleManualRefetch} className="refetch-button">
          🔄 Manual Refetch
        </button>
      </div>

      <div className="query-status">
        <div className="status-badge">
          {isLoading && <span className="badge loading">⏳ Loading</span>}
          {isFetching && !isLoading && <span className="badge fetching">🔄 Refetching</span>}
          {isError && <span className="badge error">❌ Error</span>}
          {!isLoading && !isError && !isFetching && (
            <span className="badge success">✅ Success</span>
          )}
        </div>
        {dataUpdatedAt > 0 && (
          <div className="status-time">
            Last updated: {new Date(dataUpdatedAt).toLocaleTimeString()}
          </div>
        )}
      </div>

      <div className="query-data">
        {isError && (
          <div className="error-message">
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        )}
        {data && (
          <div className="data-preview">
            <div className="data-count">
              {Array.isArray(data) ? `${data.length} items` : 'Object'}
            </div>
            <pre>{JSON.stringify(data, null, 2).slice(0, 500)}...</pre>
          </div>
        )}
      </div>
    </div>
  );
}
