export type LoginResponse = {
  token: string;
  user: { id: string; email: string; fullName?: string };
};

const API_BASE = process.env.REACT_APP_API_BASE || '';

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
    return res.json();
  },
  async signup(fullName: string, email: string, password: string): Promise<{ id: string; email: string; fullName?: string }> {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password })
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Signup failed');
    return res.json();
  },
  async me(token: string) {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  },
  async updateProfile(token: string, payload: Record<string, unknown>) {
    const res = await fetch(`${API_BASE}/api/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Update failed');
    return res.json();
  }
};


