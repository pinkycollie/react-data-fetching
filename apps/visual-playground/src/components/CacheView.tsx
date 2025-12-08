import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function CacheView() {
  const queryClient = useQueryClient();
  const [cacheData, setCacheData] = useState<any[]>([]);

  useEffect(() => {
    const updateCache = () => {
      const cache = queryClient.getQueryCache();
      const queries = cache.getAll();
      
      const cacheEntries = queries.map((query) => ({
        queryKey: JSON.stringify(query.queryKey),
        state: query.state,
        dataUpdatedAt: query.state.dataUpdatedAt,
        isFetching: query.state.fetchStatus === 'fetching',
        isStale: query.isStale(),
      }));

      setCacheData(cacheEntries);
    };

    updateCache();
    const interval = setInterval(updateCache, 500);

    return () => clearInterval(interval);
  }, [queryClient]);

  return (
    <div className="cache-view">
      <h3>React Query Cache</h3>
      {cacheData.length === 0 ? (
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          No cached queries
        </div>
      ) : (
        cacheData.map((entry, index) => (
          <div key={index} className="cache-entry">
            <div className="cache-key">{entry.queryKey}</div>
            <div className="cache-status">
              <span className={entry.isFetching ? 'status-fetching' : entry.isStale ? 'status-stale' : 'status-fresh'}>
                {entry.isFetching ? 'Fetching' : entry.isStale ? 'Stale' : 'Fresh'}
              </span>
              {entry.state.status && (
                <span style={{ color: 'var(--text-secondary)' }}>
                  Status: {entry.state.status}
                </span>
              )}
            </div>
            <div className="cache-timestamp">
              Updated: {entry.dataUpdatedAt ? new Date(entry.dataUpdatedAt).toLocaleTimeString() : 'Never'}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
