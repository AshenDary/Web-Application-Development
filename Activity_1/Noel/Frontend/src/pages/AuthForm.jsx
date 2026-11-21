import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WindowTitle from '../components/layout/WindowTitle';
import useWindowMotion from '../components/layout/useWindowMotion';
import { AuthDeskBar, AuthDesktopApps } from '../components/layout/AuthDesktop';
import DesktopWalker from '../components/layout/DesktopWalker';
import { PixelKey } from '../components/ui/PixelIcons';

const focus = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current';
const field = 'control auth-field';

export default function AuthForm({ register = false }) {
  const { login, register: signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const title = register ? 'Create account' : 'Log in';
  const frame = useWindowMotion(title);

  async function submit(event) {
    event.preventDefault();
    if (pending) return;
    const { name, email, password } = Object.fromEntries(new FormData(event.currentTarget));
    setError('');
    setPending(true);
    try {
      if (register) await signUp({ name, email, password });
      else await login({ email, password });
      navigate(location.state?.from || '/marketplace', { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="desktop-auth">
      <AuthDeskBar />
      <AuthDesktopApps />

      <main className="desktop-auth-stage">
        <section aria-labelledby="auth-title" className="desktop-window desktop-auth-window" ref={frame}>
          <WindowTitle title={title} id="auth-title" icon={PixelKey} />
          <div className="desktop-window-content">
            <div className="auth-account">
              <span className="auth-account-icon"><PixelKey size={24} /></span>
              <span>STASH account</span>
            </div>
            <form className="space-y-5" onSubmit={submit} aria-busy={pending}>
              {register && <label className="block space-y-2 text-sm font-medium">
                <span>Name</span>
                <input className={field} name="name" autoComplete="name" minLength={2} required />
              </label>}
              <label className="block space-y-2 text-sm font-medium">
                <span>Email</span>
                <input className={field} name="email" type="email" autoComplete={register ? 'email' : 'username'} required />
              </label>
              <div>
                <label htmlFor="auth-password" className="mb-2 block text-sm font-medium">Password</label>
                <div className="relative">
                  <input id="auth-password" className={`${field} pr-12`} name="password" type={showPassword ? 'text' : 'password'} autoComplete={register ? 'new-password' : 'current-password'} minLength={8} required />
                  <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)} className="absolute inset-y-1 right-1 grid w-10 place-items-center text-zinc-500 hover:bg-panel">
                    {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                  </button>
                </div>
              </div>
              {error && <p role="alert" className="desktop-error p-3 text-sm">{error}</p>}
              <button type="submit" disabled={pending} className="btn-primary w-full">
                {pending ? (register ? 'Creating account…' : 'Logging in…') : title}
              </button>
            </form>
            <p className="mt-7 border-t border-line pt-5 text-center text-sm text-zinc-500">
              {register ? 'Already have an account?' : 'New to STASH?'}{' '}
              <Link to={register ? '/login' : '/register'} state={location.state} className={`font-semibold text-zinc-100 underline underline-offset-4 ${focus}`}>
                {register ? 'Log in' : 'Sign up'}
              </Link>
            </p>
          </div>
        </section>
      </main>
      <DesktopWalker />
    </div>
  );
}
