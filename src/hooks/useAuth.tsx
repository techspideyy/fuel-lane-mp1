import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  user_id: string;
  name: string;
  phone?: string;
  role: 'user' | 'driver' | 'mechanic' | 'admin';
  address?: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  authLoading: boolean;      // Loading while checking session
  profileLoading: boolean;   // Loading while fetching/creating profile
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  recoverFromAuthError: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  // Fetch or create user profile
  const fetchProfile = async (user: User) => {
    setProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error?.code === 'PGRST116') {
        // Create profile if it doesn't exist
        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Unknown User',
            phone: user.user_metadata?.phone || null,
            role: user.user_metadata?.role || 'user',
            address: user.user_metadata?.address || null,
          })
          .select()
          .single();

        if (createError) throw createError;
        setProfileLoading(false);
        return createdProfile;
      }

      if (error) throw error;

      setProfileLoading(false);
      return data;
    } catch (err) {
      console.error('Profile fetch/create error:', err);
      setProfileLoading(false);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user);
      setProfile(profileData);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!isMounted) return;

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const profileData = await fetchProfile(session.user);
        setProfile(profileData);
      } else {
        setProfile(null);
      }

      setAuthLoading(false);
    });

    // Check existing session on mount
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error);
          if (error.message?.includes('Invalid Refresh Token')) {
            try {
              await supabase.auth.signOut({ scope: 'global' });
            } catch (_) {}
            if (typeof window !== 'undefined') {
              try {
                localStorage.clear();
              } catch (_) {}
            }
          }
        }

        if (!isMounted) return;

        setSession(session ?? null);
        setUser(session?.user ?? null);

        if (session?.user) {
          const profileData = await fetchProfile(session.user);
          setProfile(profileData);
        }

        setAuthLoading(false);
      } catch (err) {
        console.error('Critical session error:', err);
        setAuthLoading(false);
      }
    };

    checkSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    setUser(null);
    setSession(null);
    setProfile(null);

    try {
      const { error } = await supabase.auth.signOut();
      if (error && error.message?.includes('Invalid Refresh Token')) {
        await supabase.auth.signOut({ scope: 'global' });
      }
    } catch (err) {
      console.error('Sign out error:', err);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('supabase.auth.token');
        localStorage.removeItem('supabase.auth.refreshToken');
      }
    }
  };

  const recoverFromAuthError = async () => {
    try {
      setUser(null);
      setSession(null);
      setProfile(null);

      if (typeof window !== 'undefined') localStorage.clear();

      await supabase.auth.signOut({ scope: 'global' });
      console.log('Auth recovery completed. User must sign in again.');
    } catch (err) {
      console.error('Auth recovery error:', err);
    }
  };

  const value = useMemo(() => ({
    user,
    session,
    profile,
    authLoading,
    profileLoading,
    signOut,
    refreshProfile,
    recoverFromAuthError,
  }), [user, session, profile, authLoading, profileLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
