import { PixelFile } from '../ui/PixelIcons';

export default function WindowTitle({ title, id, icon: Icon = PixelFile }) {
  const Heading = id ? 'h1' : 'span';

  return (
    <div className="desktop-titlebar">
      <span className="desktop-window-emblem" aria-hidden="true"><Icon size={18} /></span>
      <Heading id={id} className="desktop-window-name">{title}</Heading>
      <span className="desktop-title-stripes" aria-hidden="true" />
      <span className="desktop-window-cap" aria-hidden="true" />
    </div>
  );
}
