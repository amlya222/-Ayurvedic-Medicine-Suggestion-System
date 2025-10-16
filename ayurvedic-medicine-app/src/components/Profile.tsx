import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import StayHealthy from './StayHealthy';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ fullName: '', username: '', email: '', bio: '', language: 'English (United States)', timezone: '(UTC+05:30) India Standard Time' });
  const [activeTab, setActiveTab] = useState<'profile' | 'stayHealthy'>('profile');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    authService.me(token).then((me) => {
      setForm({
        fullName: me.fullName || '',
        username: me.username || '',
        email: me.email,
        bio: me.bio || '',
        language: me.language || 'English (United States)',
        timezone: me.timezone || '(UTC+05:30) India Standard Time'
      });
      setUser(me);
    }).catch(() => setError('Failed to load profile')).finally(() => setLoading(false));
  }, [navigate]);

  const update = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;
    setError(null);
    try {
      await authService.updateProfile(token, form);
      alert('Profile updated');
    } catch (e: any) {
      setError(e.message || 'Update failed');
    }
  };

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;

  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', width: '100%', display: 'grid', gridTemplateColumns: '240px minmax(0, 1fr)', columnGap: 24, alignItems: 'start' }}>
      <aside style={{ width: 240, boxSizing: 'border-box', border: '1px solid #e5e7eb', borderRadius: 12, padding: 12, position: 'sticky', top: 90, height: 'fit-content', alignSelf: 'start', justifySelf: 'start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e6f0ff', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
            {(form.fullName || form.email).charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{form.fullName || 'Unnamed User'}</div>
            <div style={{ color: '#6b7280', fontSize: 12 }}>@{form.username || 'username'}</div>
          </div>
        </div>
        <nav style={{ display: 'grid', gap: 6, marginTop: 8 }}>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              background: activeTab === 'profile' ? '#e6f0ff' : 'transparent',
              color: activeTab === 'profile' ? '#1d4ed8' : '#6b7280',
              padding: '8px 10px',
              borderRadius: 8,
              fontWeight: 600,
              border: '1px solid #e5e7eb',
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('stayHealthy')}
            style={{
              background: activeTab === 'stayHealthy' ? '#e6f0ff' : 'transparent',
              color: activeTab === 'stayHealthy' ? '#1d4ed8' : '#6b7280',
              padding: '8px 10px',
              borderRadius: 8,
              fontWeight: 600,
              border: '1px solid #e5e7eb',
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            Stay Healthy
          </button>
        </nav>
      </aside>

      <main style={{ display: 'grid', gap: 16, width: '100%' }}>
        {activeTab === 'profile' ? (
          <>
            <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, width: '100%', boxSizing: 'border-box' }}>
              <h2 style={{ marginTop: 0 }}>Personal Information</h2>
              <form onSubmit={update} style={{ display: 'grid', gap: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label>Full Name</label>
                    <input className="auth-input" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                  </div>
                  <div>
                    <label>Username</label>
                    <input className="auth-input" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label>Email</label>
                  <input className="auth-input" value={form.email} disabled />
                </div>
                <div>
                  <label>Bio</label>
                  <textarea className="auth-input" rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
                </div>
                <button className="auth-primary-btn" type="submit">Save Changes</button>
                {error && <div style={{ color: '#b91c1c' }}>{error}</div>}
              </form>
            </section>

            <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, width: '100%', boxSizing: 'border-box' }}>
              <h2 style={{ marginTop: 0 }}>Account Settings</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label>Language</label>
                  <select className="auth-input" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}>
                    <option>English (United States)</option>
                    <option>English (United Kingdom)</option>
                    <option>Hindi</option>
                  </select>
                </div>
                <div>
                  <label>Timezone</label>
                  <select className="auth-input" value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })}>
                    <option>(UTC+05:30) India Standard Time</option>
                    <option>(UTC+00:00) Coordinated Universal Time</option>
                    <option>(UTC-08:00) Pacific Time</option>
                  </select>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, width: '100%', boxSizing: 'border-box' }}>
            <StayHealthy embedded={true} userId={user.id} />
          </section>
        )}
      </main>
    </div>
  );
};

export default Profile;


