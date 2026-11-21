export default function PixelStar({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden="true" {...props}>
      <path fill="#68461d" d="M7 1h2v2h1v2h1v1h4v2h-2v1h-1v2h1v4h-2v-1H9v-1H7v1H5v1H3v-4h1V9H3V8H1V6h4V5h1V3h1z" />
      <path fill="#e4a83f" d="M7 3h2v2h1v2h3v1h-2v4h1v1h-2v-1H9v-1H7v1H6v1H4v-1h1V8H3V7h3V5h1z" />
      <path fill="#f7d875" d="M7 4h1v2h1v2h2v1H9v2H7v1H5v-1h1V9H5V8h2z" />
      <path fill="#fff1b4" d="M7 5h1v2H7zm-2 2h2v1H5z" />
    </svg>
  );
}
