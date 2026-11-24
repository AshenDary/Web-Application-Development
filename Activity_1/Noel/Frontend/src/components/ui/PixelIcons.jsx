function PixelIcon({ size = 16, children, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden="true" {...props}>{children}</svg>;
}

export function PixelFolder(props) {
  return <PixelIcon {...props}>
    <path fill="#604525" d="M1 3h6v2h7v2h1v6h-1v1H1z" />
    <path fill="#d59b49" d="M2 4h4v2h7v6H2z" />
    <path fill="#f4ce72" d="M3 7h11v6H2v-4h1z" />
    <path fill="#fff0ab" d="M4 8h8v1H4z" />
  </PixelIcon>;
}

export function PixelFlame(props) {
  return <PixelIcon {...props}>
    <path fill="#793628" d="M8 1h2v3h2v3h2v2h1v3h-1v2h-2v1H4v-1H2v-2H1V9h1V6h2v2h1V5h1V3h2z" />
    <path fill="#e98552" d="M8 3h1v2h2v3h2v2h1v2h-2v2H4v-1H3v-2H2V9h2v1h2V6h1V4h1z" />
    <path fill="#ffdc79" d="M8 8h1v2h2v2h-1v2H6v-1H5v-2h1v-1h2z" />
  </PixelIcon>;
}

export function PixelCart(props) {
  return <PixelIcon {...props}>
    <path fill="#363b60" d="M1 1h4v2h1v2h8v2h-1v6h-1v1H5v-1H4V7H3V3H1zm5 6v5h6V7zm0 7h2v1H6zm4 0h2v1h-2z" />
    <path fill="#a1a9dc" d="M6 7h6v5H6z" />
    <path fill="#dfdff5" d="M7 8h2v1H7zm3 0h1v1h-1zm-3 2h2v1H7zm3 0h1v1h-1z" />
  </PixelIcon>;
}

export function PixelFile(props) {
  return <PixelIcon {...props}>
    <path fill="#34486b" d="M3 1h7v1h1v1h1v1h1v11H3z" />
    <path fill="#edf2fe" d="M4 2h5v4h3v8H4z" />
    <path fill="#a3b4d6" d="M10 3h1v1h1v1h-2zM5 8h6v1H5zm0 2h6v1H5zm0 2h4v1H5z" />
  </PixelIcon>;
}

export function PixelClipboard(props) {
  return <PixelIcon {...props}>
    <path fill="#60452e" d="M2 3h4V1h4v2h4v12H2z" />
    <path fill="#c3996a" d="M3 4h10v10H3z" />
    <path fill="#fff1ce" d="M4 5h8v8H4z" />
    <path fill="#d8aa59" d="M6 2h4v3H6z" />
    <path fill="#79634f" d="M5 7h6v1H5zm0 2h6v1H5zm0 2h4v1H5z" />
  </PixelIcon>;
}

export function PixelGear(props) {
  return <PixelIcon {...props}>
    <path fill="#3e4b49" d="M6 1h4v2h2V2h2v2h-1v2h2v4h-2v2h1v2h-2v-1h-2v2H6v-2H4v1H2v-2h1v-2H1V6h2V4H2V2h2v1h2z" />
    <path fill="#a8bbaf" d="M7 2h2v2h3v3h2v2h-2v3H9v2H7v-2H4V9H2V7h2V4h3z" />
    <path fill="#465b58" d="M6 5h4v1h1v4h-1v1H6v-1H5V6h1zm1 2v2h2V7z" fillRule="evenodd" />
  </PixelIcon>;
}

export function PixelKey(props) {
  return <PixelIcon {...props}>
    <path fill="#664628" d="M8 1h5v1h1v1h1v5h-1v1h-1v1H9v2H7v2H5v1H1v-4h1v-1h1V9h2V5h1V3h1V2h1z" />
    <path fill="#edbb57" d="M8 2h5v1h1v5h-2v1H8v2H6v2H4v1H2v-2h1v-1h1v-1h2V6h1V4h1z" />
    <path fill="#714b2c" d="M10 4h2v2h-2z" />
  </PixelIcon>;
}

export function PixelPrinter(props) {
  return <PixelIcon {...props}>
    <path fill="#393653" d="M4 1h8v4h2v1h1v7h-3v2H4v-2H1V6h1V5h2z" />
    <path fill="#fbf4dc" d="M5 2h6v3H5zm0 8h6v4H5z" />
    <path fill="#aaaecb" d="M3 6h10v1h1v5h-2V9H4v3H2V7h1z" />
    <path fill="#61678e" d="M6 11h4v1H6z" />
    <path fill="#f6cf71" d="M11 7h2v1h-2z" />
  </PixelIcon>;
}
