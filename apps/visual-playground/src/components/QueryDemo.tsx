import { useQuery } from '@tanstack/react-query';
import { mockApi, Post } from '../api/mockApi';
import { motion } from 'framer-motion';

interface QueryDemoProps {
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number;
  enabled?: boolean;
}

export function QueryDemo({
  staleTime = 0,
  refetchOnWindowFocus = false,
  refetchInterval,
  enabled = true,
}: QueryDemoProps) {
  const { data, isLoading, isError, error, isFetching, dataUpdatedAt, refetch } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => mockApi.getPosts(),
    staleTime,
    refetchOnWindowFocus,
    refetchInterval,
    enabled,
  });

  return (
    <div>
      <div className="query-info">
        <div className="query-info-item">
          <span className="query-info-label">Status:</span>
          <span className="query-info-value">
            {isLoading ? 'Loading' : isError ? 'Error' : 'Success'}
          </span>
        </div>
        <div className="query-info-item">
          <span className="query-info-label">Fetching:</span>
          <span className="query-info-value">{isFetching ? 'Yes' : 'No'}</span>
        </div>
        <div className="query-info-item">
          <span className="query-info-label">Last Updated:</span>
          <span className="query-info-value">
            {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : 'Never'}
          </span>
        </div>
        <div className="query-info-item">
          <span className="query-info-label">Stale Time:</span>
          <span className="query-info-value">{staleTime}ms</span>
        </div>
        <div className="query-info-item">
          <span className="query-info-label">Refetch on Focus:</span>
          <span className="query-info-value">{refetchOnWindowFocus ? 'Yes' : 'No'}</span>
        </div>
        {refetchInterval && (
          <div className="query-info-item">
            <span className="query-info-label">Refetch Interval:</span>
            <span className="query-info-value">{refetchInterval}ms</span>
          </div>
        )}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button className="btn btn-primary" onClick={() => refetch()} style={{ marginBottom: '1rem' }}>
          Manual Refetch
        </button>
      </div>

      {isLoading && (
        <div className="loading-state">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Loading posts...
          </motion.div>
        </div>
      )}

      {isError && (
        <motion.div
          className="error-state"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </motion.div>
      )}

      {data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ marginTop: '1rem' }}
        >
          <h3>Posts ({data.length}):</h3>
          {data.slice(0, 5).map((post) => (
            <motion.div
              key={post.id}
              className="cache-entry"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>
                {post.title}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {post.body.substring(0, 100)}...
              </div>
            </motion.div>
          ))}
          {data.length > 5 && (
            <div style={{ marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              And {data.length - 5} more...
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
