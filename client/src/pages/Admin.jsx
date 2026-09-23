import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AlertCircle, ChevronDown, Inbox, LogOut, RefreshCw } from 'lucide-react';
import { BrandImage } from '../components/Layout';
import Seo from '../components/Seo';
import { company } from '../company';

function AdminBrand() {
  return (
    <Link className="admin-brand" to="/" aria-label={`${company.brandName} home`}>
      <BrandImage />
      <span>Admin portal</span>
    </Link>
  );
}

export function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      navigate('/admin');
    } catch (requestError) {
      setError(requestError.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login">
      <Seo title="Admin login" description={`${company.brandName} administration portal.`} noindex />
      <div className="login-card">
        <AdminBrand />
        <h1>Welcome back</h1>
        <p>Sign in to review and manage enquiries.</p>
        <form onSubmit={submit}>
          <label>
            Email
            <input
              type="email"
              required
              autoComplete="username"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              minLength="12"
              autoComplete="current-password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
          </label>
          {error && <div className="form-notice error" role="alert"><AlertCircle />{error}</div>}
          <button className="button" disabled={loading}>{loading ? 'Signing in…' : 'Sign in securely'}</button>
        </form>
        <Link to="/">← Return to website</Link>
      </div>
    </main>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const load = useCallback(async () => {
    setError('');
    const response = await fetch(`/api/admin/enquiries?status=${filter}`, { credentials: 'include' });
    if (response.status === 401) {
      navigate('/admin/login');
      return;
    }
    const responseData = await response.json();
    if (!response.ok) {
      setError(responseData.message);
      return;
    }
    setData(responseData);
  }, [filter, navigate]);

  useEffect(() => { load(); }, [load]);

  const update = async (id, status) => {
    const response = await fetch(`/api/admin/enquiries/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (response.ok) load();
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    navigate('/admin/login');
  };

  return (
    <main className="dashboard">
      <Seo title="Enquiries" description={`${company.brandName} enquiry dashboard.`} noindex />
      <header>
        <AdminBrand />
        <button onClick={logout}><LogOut /> Sign out</button>
      </header>
      <div className="dashboard-body">
        <div className="dashboard-title">
          <div>
            <p className="eyebrow">Admin workspace</p>
            <h1>Enquiries</h1>
            <p>Review requests and keep their status current.</p>
          </div>
          <button onClick={load}><RefreshCw /> Refresh</button>
        </div>
        <div className="toolbar">
          <span><Inbox /> {data?.total ?? '—'} enquiries</span>
          <label>
            Show
            <select value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="in-progress">In progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <ChevronDown />
          </label>
        </div>
        {error && <div className="form-notice error">{error}</div>}
        {!data && !error ? (
          <div className="admin-loading">Loading enquiries…</div>
        ) : data?.items.length === 0 ? (
          <div className="empty-state">
            <Inbox />
            <h2>No enquiries here</h2>
            <p>New website enquiries will appear in this workspace.</p>
          </div>
        ) : (
          <div className="enquiry-list">
            {data?.items.map((item) => (
              <article key={item.id}>
                <div className="enquiry-head">
                  <div>
                    <span className={`status ${item.status}`}>{item.status}</span>
                    <time>{new Date(item.createdAt).toLocaleString()}</time>
                  </div>
                  <select
                    aria-label={`Status for ${item.name}`}
                    value={item.status}
                    onChange={(event) => update(item.id, event.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="in-progress">In progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <h2>{item.name}</h2>
                <p className="meta">{item.company || 'No company'} · {item.sector.replaceAll('-', ' ')}</p>
                <p>{item.message}</p>
                <div className="contact-chips">
                  <a href={`mailto:${item.email}`}>{item.email}</a>
                  {item.phone && <span>{item.phone}</span>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export function AdminRoute() {
  return <Navigate to="/admin" replace />;
}
