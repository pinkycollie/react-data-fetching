import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

interface CacheEntry {
  queryKey: string;
  state: string;
  dataUpdatedAt: number;
  isStale: boolean;
  isFetching: boolean;
}

export default function CacheView() {
  const queryClient = useQueryClient();
  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([]);

  useEffect(() => {
    const updateCache = () => {
      const cache = queryClient.getQueryCache();
      const queries = cache.getAll();
      
      const entries: CacheEntry[] = queries.map((query) => ({
        queryKey: JSON.stringify(query.queryKey),
        state: query.state.status,
        dataUpdatedAt: query.state.dataUpdatedAt,
        isStale: query.isStale(),
        isFetching: query.state.fetchStatus === 'fetching',
      }));
      
      setCacheEntries(entries);
    };

    updateCache();
    const interval = setInterval(updateCache, 500);
    return () => clearInterval(interval);
  }, [queryClient]);

  const formatTime = (timestamp: number) => {
    if (!timestamp) return 'Never';
    const now = Date.now();
    const diff = now - timestamp;
    if (diff < 1000) return 'Just now';
    if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
    return `${Math.floor(diff / 60000)}m ago`;
  };

  return (
    <div className="cache-view">
      <h3>🗂️ Cache Inspector</h3>
      <div className="cache-entries">
        {cacheEntries.length === 0 ? (
          <div className="cache-empty">No cached queries yet</div>
        ) : (
          cacheEntries.map((entry, index) => (
            <div
              key={index}
              className={`cache-entry ${entry.isStale ? 'stale' : 'fresh'} ${
                entry.isFetching ? 'fetching' : ''
              }`}
            >
              <div className="cache-entry-header">
                <span className="cache-key">{entry.queryKey}</span>
                <span className={`cache-status ${entry.state}`}>
                  {entry.state}
                </span>
              </div>
              <div className="cache-entry-meta">
                <span className={`cache-freshness ${entry.isStale ? 'stale' : 'fresh'}`}>
                  {entry.isStale ? '🔴 Stale' : '🟢 Fresh'}
                </span>
                <span className="cache-time">
                  Updated: {formatTime(entry.dataUpdatedAt)}
                </span>
                {entry.isFetching && (
                  <span className="cache-fetching">⏳ Fetching...</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
