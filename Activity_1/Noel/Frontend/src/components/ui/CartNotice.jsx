import { useEffect, useRef } from 'react';
import { FolderOpen, X } from 'lucide-react';

export default function CartNotice({ message, onDismiss }) {
  const dialogRef = useRef(null);
  const okRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
    okRef.current.focus();
  }, []);

  function close() {
    dialogRef.current.close();
  }

  return (
    <dialog ref={dialogRef} className="cart-notice" aria-labelledby="cart-notice-title" aria-describedby="cart-notice-message" onClose={onDismiss}>
      <header className="cart-notice-titlebar">
        <h2 id="cart-notice-title">Cart updated</h2>
        <button className="cart-notice-close" type="button" aria-label="Close confirmation" onClick={close}>
          <X size={16} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </header>
      <div className="cart-notice-body">
        <div className="cart-notice-message">
          <FolderOpen size={36} fill="var(--gold)" strokeWidth={1.5} aria-hidden="true" />
          <p id="cart-notice-message">{message}</p>
        </div>
        <button ref={okRef} type="button" className="btn-secondary cart-notice-ok" onClick={close}>OK</button>
      </div>
    </dialog>
  );
}
