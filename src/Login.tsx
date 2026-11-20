
import { useState } from 'react';
import type { FormEvent } from 'react';

type LoginProps = {
  onDemoLogin: () => void;
};

export default function Login({ onDemoLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setError('Lütfen e-posta adresinizi girin.');
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setError('Geçerli bir e-posta adresi girin.');
      return;
    }

    if (!password) {
      setError('Lütfen şifrenizi girin.');
      return;
    }

    if (password.length < 6) {
      setError('Demo şifresi en az 6 karakter olmalıdır.');
      return;
    }

    // Yalnızca arayüz testi, gerçek kimlik doğrulaması değil.
    onDemoLogin();
  }

  return (
    <main style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      padding: 24
    }}>
      <section
        className="panel"
        style={{ width: '100%', maxWidth: 420 }}
      >
        <h1>CodeWise AI</h1>
        <p>Giriş Ekranı — Demo</p>

        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ display: 'grid', gap: 12 }}
        >
          <label htmlFor="email">E-posta</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setError('');
            }}
            autoComplete="username"
          />

          <label htmlFor="password">Şifre</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={event => {
              setPassword(event.target.value);
              setError('');
            }}
            autoComplete="current-password"
          />

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          <button className="primary" type="submit">
            Demo Giriş
          </button>
        </form>

        <p className="fineprint">
          Bu ekran gerçek kimlik doğrulaması yapmaz.
          Yalnızca test bilgileri kullanın.
        </p>
      </section>
    </main>
  );
}
