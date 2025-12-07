import { useState, useEffect } from 'react';

export interface NetworkEvent {
  id: string;
  type: 'request' | 'response' | 'error';
  timestamp: number;
  endpoint: string;
  duration?: number;
}

interface NetworkLaneProps {
  events: NetworkEvent[];
}

export default function NetworkLane({ events }: NetworkLaneProps) {
  const [visibleEvents, setVisibleEvents] = useState<NetworkEvent[]>([]);

  useEffect(() => {
    // Keep only recent events (last 10)
    setVisibleEvents(events.slice(-10));
  }, [events]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'request':
        return '➡️';
      case 'response':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '•';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'request':
        return 'blue';
      case 'response':
        return 'green';
      case 'error':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="network-lane">
      <h3>🌐 Network Activity</h3>
      <div className="network-events">
        {visibleEvents.length === 0 ? (
          <div className="network-empty">No network activity yet</div>
        ) : (
          visibleEvents.map((event, index) => (
            <div
              key={`${event.id}-${index}`}
              className={`network-event ${event.type}`}
              style={{ borderLeftColor: getEventColor(event.type) }}
            >
              <span className="network-icon">{getEventIcon(event.type)}</span>
              <div className="network-info">
                <div className="network-endpoint">{event.endpoint}</div>
                <div className="network-meta">
                  {new Date(event.timestamp).toLocaleTimeString()}
                  {event.duration && (
                    <span className="network-duration"> • {event.duration}ms</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
