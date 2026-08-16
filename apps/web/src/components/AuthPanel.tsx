import { useState, type FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

type Props = {
  session: Session | null;
  onClose: () => void;
};

export function AuthPanel({ session, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return setMessage('Supabase is not configured.');
    setBusy(true);
    setMessage('');
    const result = mode === 'signin'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + import.meta.env.BASE_URL }
        });
    setBusy(false);
    if (result.error) return setMessage(result.error.message);
    if (mode === 'signup' && !result.data.session) {
      setMessage('Check your email and confirm your account, then sign in.');
      return;
    }
    onClose();
  }

  async function signOut() {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.auth.signOut();
    setBusy(false);
    if (error) return setMessage(error.message);
    onClose();
  }

  return <div className="authBackdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="authPanel" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <button className="authClose" onClick={onClose} aria-label="Close">×</button>
      <div className="sectionLabel">Private trip workspace</div>
      {session ? <>
        <h2 id="auth-title">You’re signed in.</h2>
        <p>Your cloud trips can now be linked to your Supabase account.</p>
        <div className="authIdentity"><small>Signed in as</small><b>{session.user.email}</b></div>
        {message && <p className="authMessage">{message}</p>}
        <button className="dangerButton authWide" onClick={signOut} disabled={busy}>{busy ? 'Signing out…' : 'Sign out'}</button>
      </> : <>
        <h2 id="auth-title">{mode === 'signin' ? 'Welcome back.' : 'Create your account.'}</h2>
        <p>Sign in to securely synchronize your Sri Lanka trip plan.</p>
        <form className="authForm" onSubmit={submit}>
          <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label>
          <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} /></label>
          {message && <p className="authMessage">{message}</p>}
          <button className="primary authWide" disabled={busy}>{busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}</button>
        </form>
        <button className="authSwitch" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setMessage(''); }}>
          {mode === 'signin' ? 'New here? Create an account' : 'Already registered? Sign in'}
        </button>
      </>}
    </section>
  </div>;
}
