import { ReactNode } from 'react';
import { NetworkLane } from './NetworkLane';
import { CacheView } from './CacheView';

interface CanvasProps {
  children: ReactNode;
}

export function Canvas({ children }: CanvasProps) {
  return (
    <div className="canvas">
      <NetworkLane />
      {children}
      <CacheView />
    </div>
  );
}
