import { useEffect, useState } from 'react';
import { Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PixelBag, PixelKey } from '../ui/PixelIcons';
import { DiscSprite, FloppySprite, FolderSprite, InternetSprite, MailSprite, MusicSprite, NotepadSprite, WorkstationSprite } from '../ui/DesktopSprites';

const clockFormat = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });

const apps = [
  { label: 'Workstation', icon: WorkstationSprite },
  { label: 'Files', icon: FolderSprite },
  { label: 'Notepad', icon: NotepadSprite },
  { label: 'Jukebox', icon: MusicSprite },
  { label: 'Floppy Disk', icon: FloppySprite },
  { label: 'Internet', icon: InternetSprite },
  { label: 'Mail', icon: MailSprite },
  { label: 'CD-ROM', icon: DiscSprite },
];

export function AuthDeskBar() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 10000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="desktop-menubar">
      <div className="desktop-menubar-inner auth-menubar">
        <Link to="/" className="auth-menubar-brand">
          <span aria-hidden="true" className="desktop-brand-mark">S</span>
          <span className="desktop-wordmark">STASH</span>
        </Link>
        <span className="auth-menubar-tab" aria-label="Account"><PixelKey size={14} /> <span>Account</span></span>
        <span className="auth-menubar-fill" aria-hidden="true" />
        <div className="auth-menubar-tray">
          <Link to="/marketplace" aria-label="Open Marketplace" title="Marketplace" className="desktop-tool-button">
            <PixelBag />
          </Link>
          <time className="auth-menubar-time" dateTime={now.toISOString()}>
            <Clock3 size={13} aria-hidden="true" /> {clockFormat.format(now)}
          </time>
        </div>
      </div>
    </header>
  );
}

export function AuthDesktopApps() {
  return (
    <ul className="auth-desktop-apps" aria-hidden="true">
      {apps.map(({ label, icon: Icon }) => (
        <li key={label}>
          <Icon />
          <span className="auth-desktop-app-label">{label}</span>
        </li>
      ))}
    </ul>
  );
}
