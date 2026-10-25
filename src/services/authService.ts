export const ADMIN_CREDENTIALS = {
  email: 'admin@vanshaviationacademy.com',
  password: 'VanshAviation@2026!',
};

const LOCAL_ADMIN_KEY = 'vaa_admin_session_auth';

export interface AdminUser {
  id: string;
  email: string;
  role: 'superadmin' | 'admin';
  name: string;
}

export interface AdminSession {
  user: AdminUser;
  token: string;
  expires_at: number;
}

export interface AuthResponse {
  user: AdminUser | null;
  session: AdminSession | null;
  error: string | null;
}

export const authService = {
  async signInAdmin(email: string, password: string): Promise<AuthResponse> {
    const cleanEmail = email.trim().toLowerCase();

    if (
      cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const user: AdminUser = {
        id: 'vaa-superadmin-01',
        email: ADMIN_CREDENTIALS.email,
        role: 'superadmin',
        name: 'Academy Registrar'
      };

      const session: AdminSession = {
        user,
        token: 'vaa-admin-session-token-' + Date.now(),
        expires_at: Date.now() + 86400 * 1000 // 24 hours
      };

      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(session));

      return { user, session, error: null };
    }

    return {
      user: null,
      session: null,
      error: 'Invalid credentials. Please verify your administrator email and password.'
    };
  },

  async getSession(): Promise<AdminSession | null> {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (!raw) return null;
      const session = JSON.parse(raw) as AdminSession;
      if (session.expires_at < Date.now()) {
        this.signOut();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  },

  async signOut(): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(LOCAL_ADMIN_KEY);
  },

  async signOutAdmin(): Promise<void> {
    return this.signOut();
  },

  async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    return !!session;
  }
};
