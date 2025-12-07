import { ReactNode } from 'react';

interface CanvasProps {
  children: ReactNode;
}

export default function Canvas({ children }: CanvasProps) {
  return (
    <div className="canvas">
      <div className="canvas-content">
        {children}
      </div>
    </div>
  );
}
