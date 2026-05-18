import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = isRegister ? '/auth/register' : '/auth/login';
      const { data } = await api.post(url, form);
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: 'white', borderRadius: 16, padding: 40,
        width: '100%', maxWidth: 400,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
      }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b' }}>
            {isRegister ? 'Create account' : 'Welcome back'}
          </h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>
            {isRegister ? 'Start managing your leads' : 'Sign in to your CRM'}
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: 8, padding: '10px 14px',
            color: '#dc2626', fontSize: 14, marginBottom: 16
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                Full name
              </label>
              <input
                placeholder="Ali Ahmed"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={{ width: '100%' }}
                required
              />
            </div>
          )}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={{ width: '100%' }}
              required
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={{ width: '100%' }}
              required
            />
          </div>
          <button type="submit" style={{
            width: '100%', padding: '12px',
            background: '#6366f1', color: 'white',
            fontSize: 15, fontWeight: 600, borderRadius: 8
          }}>
            {isRegister ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <button onClick={() => setIsRegister(!isRegister)} style={{
          width: '100%', marginTop: 16, padding: '10px',
          background: 'none', border: '1px solid #e2e8f0',
          color: '#6366f1', fontWeight: 500
        }}>
          {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
}