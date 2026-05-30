import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { demoCredentials } from '../data/mockData';
import Card from '../components/ui/Card';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      setError('Invalid email or password. Use the demo credentials below.');
    }
  };

  const fillDemo = () => {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
    setError('');
  };

  return (
    <div className="flex min-h-screen min-w-[1280px] items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
            <Lock className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary">LifeLink</h1>
          <p className="mt-1 text-sm text-muted">Institutional Identity</p>
        </div>

        <Card>
          <h2 className="text-lg font-semibold text-text">Sign in</h2>
          <p className="mt-1 text-sm text-muted">
            Access your secure document vault and verification records.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-text"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@institution.edu"
                  className="w-full rounded-xl border border-border py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-text"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-border py-2.5 pl-10 pr-10 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-danger">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-primary py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-border bg-gray-50 p-4">
            <p className="text-xs font-medium text-text">Demo credentials</p>
            <p className="mt-1 font-mono text-xs text-muted">
              {demoCredentials.email}
            </p>
            <p className="font-mono text-xs text-muted">
              {demoCredentials.password}
            </p>
            <button
              type="button"
              onClick={fillDemo}
              className="mt-3 text-xs font-medium text-primary hover:underline"
            >
              Fill demo credentials
            </button>
          </div>
        </Card>

        <p className="mt-6 text-center text-xs text-muted">
          Research prototype · Simulated authentication only
        </p>
      </div>
    </div>
  );
}
