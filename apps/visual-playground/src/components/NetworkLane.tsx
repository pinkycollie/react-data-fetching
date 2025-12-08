import { motion, AnimatePresence } from 'framer-motion';
import { mockApi } from '../api/mockApi';
import { useEffect, useState } from 'react';

export function NetworkLane() {
  const [logs, setLogs] = useState(mockApi.requestLog);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs([...mockApi.requestLog]);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Keep only recent logs (last 10 seconds)
  const recentLogs = logs.filter((log) => Date.now() - log.timestamp < 10000);

  return (
    <div className="network-lane">
      <h3>Network Activity</h3>
      <div className="network-tokens">
        <AnimatePresence>
          {recentLogs.map((log, index) => (
            <motion.div
              key={`${log.timestamp}-${index}`}
              className={`network-token token-${log.status}`}
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {log.url} - {log.status}
            </motion.div>
          ))}
        </AnimatePresence>
        {recentLogs.length === 0 && (
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            No recent network activity
          </div>
        )}
      </div>
    </div>
  );
}
