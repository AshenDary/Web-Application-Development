function Sprite({ children }) {
  return <svg className="auth-desktop-app-icon" width="54" height="54" viewBox="0 0 32 32" shapeRendering="crispEdges" aria-hidden="true">{children}</svg>;
}

export function WorkstationSprite() {
  return <Sprite>
    <path fill="#27263e" d="M7 2h20v2h2v17h-3v3h3v2h1v3H2v-4h2v-3h2V4h1z" />
    <path fill="#f4ecd9" d="M8 4h17v2H8zm-1 2h2v14H7zM5 24h21v2H5z" />
    <path fill="#a597b6" d="M25 4h2v16h-3v3H7v-3h18zM3 26h25v2H3z" />
    <path fill="#545a80" d="M9 6h15v14H9z" />
    <path fill="#172641" d="M11 8h11v10H11z" />
    <path fill="#375e78" d="M12 9h9v7h-9z" />
    <path fill="#9acc9c" d="M13 10h2v1h1v2h-1v1h-2v-1h1v-2h-1zm4 4h3v1h-3z" />
    <path fill="#5a5272" d="M9 25h3v1H9zm4 0h3v1h-3zm4 0h3v1h-3z" />
    <path fill="#a5cf96" d="M22 21h2v1h-2z" />
  </Sprite>;
}

export function FolderSprite() {
  return <Sprite>
    <path fill="#4a3323" d="M3 5h10v2h2v2h13v2h2v15h-2v2H2V7h1z" />
    <path fill="#a97936" d="M4 7h8v2h2v2h13v13H3V8h1z" />
    <path fill="#ffecad" d="M4 7h8v1H4zm0 3h11v1H4z" />
    <path fill="#f1c663" d="M5 12h23v13H4V14h1z" />
    <path fill="#ffdf83" d="M6 13h21v2H6zm-1 2h2v9H5z" />
    <path fill="#c8903f" d="M27 15h1v10h-2v1H4v-2h23z" />
  </Sprite>;
}

export function NotepadSprite() {
  return <Sprite>
    <path fill="#332b50" d="M7 3h20v24h-2v3H5V5h2z" />
    <path fill="#8a85af" d="M8 5h18v21h-2v2H7V6h1z" />
    <path fill="#eae9fa" d="M8 7h16v19H8z" />
    <path fill="#fff8ed" d="M9 8h14v15H9z" />
    <path fill="#8076a3" d="M10 12h11v1H10zm0 3h11v1H10zm0 3h11v1H10zm0 3h7v1h-7z" />
    <path fill="#514767" d="M9 2h2v6H9zm4 0h2v6h-2zm4 0h2v6h-2zm4 0h2v6h-2z" />
    <path fill="#e7dbe9" d="M10 3h1v2h-1zm4 0h1v2h-1zm4 0h1v2h-1zm4 0h1v2h-1z" />
  </Sprite>;
}

export function MusicSprite() {
  return <Sprite>
    <path fill="#292449" d="M12 5h6V4h6V3h5v20h-1v2h-2v1h-6v-2h-1v-4h2v-1h5V11h-4v1h-5v13h-1v3h-2v1H7v-1H4v-2H3v-4h2v-2h7z" />
    <path fill="#5c6ac9" d="M14 6h5V5h6V4h2v18h-1v2h-5v-3h2v-1h4V9h-5v1h-6v15h-1v2h-2v1H7v-2H5v-3h2v-2h6z" />
    <path fill="#9eaaff" d="M15 7h4V6h6V5h2v2h-3v1h-6v1h-2v14h-1zM7 23h5v2H7zm15-1h3v1h-3z" />
    <path fill="#c6ccff" d="M17 7h4v1h-4zm7-1h3v1h-3z" />
  </Sprite>;
}

export function FloppySprite() {
  return <Sprite>
    <path fill="#262948" d="M5 3h23v2h2v22h-1v2H3V5h2z" />
    <path fill="#596cba" d="M5 5h22v2h1v20H5z" />
    <path fill="#879cde" d="M5 5h22v2H7v19H5z" />
    <path fill="#252e5f" d="M10 5h14v12H10z" />
    <path fill="#bdc9e7" d="M11 5h11v10H11z" />
    <path fill="#526694" d="M17 6h4v7h-4z" />
    <path fill="#ebeaf2" d="M9 18h15v9H9z" />
    <path fill="#7f88a9" d="M11 20h11v1H11zm0 3h11v1H11zm0 2h8v1h-8z" />
  </Sprite>;
}

export function InternetSprite() {
  return <Sprite>
    <path fill="#26304a" d="M11 2h10v2h4v3h3v4h2v11h-2v4h-4v3H9v-2H5v-4H2V10h2V6h3V4h4z" />
    <path fill="#3865a2" d="M11 4h10v2h3v3h3v3h1v9h-2v3h-3v3H10v-2H7v-4H4V11h2V8h3V6h2z" />
    <path fill="#6f9ddd" d="M11 5h8v2h-8v2H8v5H6v-3h2V8h3z" />
    <path fill="#9dc384" d="M12 6h6v2h2v4h-4v3h-3v4h-3v-2H8v-4h2v-3h2zm10 10h4v5h-2v3h-4v2h-3v-4h3v-4h2z" />
    <path fill="#6e9c72" d="M17 8h3v4h-4v3h-2v-2h2v-2h1zm9 12v2h-2v3h-4v1h-3v-2h5v-3h2v-1z" />
    <path fill="#263f75" d="M5 20h2v4h4v2h11v-2h4v-3h2v2h-2v3h-4v1H10v-2H7v-3H5z" />
  </Sprite>;
}

export function MailSprite() {
  return <Sprite>
    <path fill="#342e47" d="M9 2h13v3h3v6h3v3h2v14H2V14h2v-3h3V5h2z" />
    <path fill="#aaa4c0" d="M4 15l12-9 12 9v11H4z" />
    <path fill="#eee8dd" d="M10 4h11v3h2v12H9V6h1z" />
    <path fill="#a094a7" d="M11 8h9v1h-9zm0 3h9v1h-9zm0 3h7v1h-7z" />
    <path fill="#b0b9d6" d="M4 16h2v2h3v2h4v3h6v-3h4v-2h3v-2h2v11H4z" />
    <path fill="#e3e7f4" d="M5 25h2v-2h3v-2h3v2h6v-2h3v2h3v2h2v1H5z" />
    <path fill="#ad6069" d="M23 8h4v1h1v4h-1v1h-4v-1h-1V9h1z" />
    <path fill="#f4d8d2" d="M24 10h3v2h-3z" />
  </Sprite>;
}

export function DiscSprite() {
  return <Sprite>
    <path fill="#302c47" d="M11 2h10v2h4v3h3v4h2v10h-2v4h-3v3h-4v2H11v-2H7v-3H4v-4H2V11h2V7h3V4h4z" />
    <path fill="#a5a1c0" d="M11 4h10v2h4v3h2v4h1v6h-1v4h-2v3h-4v2H11v-2H7v-3H5v-4H4v-6h1V9h2V6h4z" />
    <path fill="#e9e5ec" d="M11 5h6v8h-3v2H8v-2H5V9h2V7h4zm9 14h5v3h2v1h-2v3h-4v2h-4v-8h3z" />
    <path fill="#8bafd0" d="M19 5h2v1h4v3h2v3h-8zm-9 14h4v9h-3v-2H7v-3H5v-2h5z" />
    <path fill="#e6d897" d="M22 20h1v3h2v1h-2v1h-1zm-11-9h2v2h-2z" />
    <path fill="#5a526f" d="M14 11h4v1h2v2h1v4h-1v2h-2v1h-4v-1h-2v-2h-1v-4h1v-2h2z" />
    <path fill="#e5dce8" d="M15 13h2v1h2v4h-2v1h-2v-1h-2v-4h2z" />
  </Sprite>;
}
