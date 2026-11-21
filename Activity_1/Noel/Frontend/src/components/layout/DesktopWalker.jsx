import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function DesktopWalker() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="landing-walker" data-paused={paused}>
      <div className="landing-walker-lane" aria-hidden="true">
        <span className="landing-city" />
        <span className="landing-sidewalk" />
        <span className="landing-walker-travel"><span className="landing-walker-sprite" /></span>
      </div>
      <button
        type="button"
        className="desktop-tool-button landing-walker-control"
        aria-label={paused ? 'Resume walking animation' : 'Pause walking animation'}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
      </button>
    </div>
  );
}
