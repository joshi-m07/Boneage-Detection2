import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../api';

export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await registerUser(name, email, password);
      // Immediately log the user context in post registration
      login(data);
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Signup failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex max-w-md flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full glass-card p-6 sm:p-8 animate-landing-in">
        <div className="glass-card-inner">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">
              Create an Account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Register to use the Bone Age platform
            </p>
          </div>

          {error && (
            <div className="mb-5 animate-fade-in-up rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 shadow-sm">
              <p className="font-semibold">Registration Error</p>
              <p className="mt-1 opacity-90">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label 
                htmlFor="name" 
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                disabled={loading}
                className="input-base"
                placeholder="Dr. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                disabled={loading}
                className="input-base"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label 
                htmlFor="password" 
                className="mb-1.5 flex justify-between text-sm font-semibold text-slate-700"
              >
                <span>Password</span>
              </label>
              <input
                id="password"
                type="password"
                required
                disabled={loading}
                className="input-base"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary mt-2 w-full shadow-md"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Registering...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-semibold tracking-wide text-primary-600 transition hover:text-primary-800 focus:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
