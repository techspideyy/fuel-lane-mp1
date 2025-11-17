import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  id: string;
  email?: string;
  username?: string;
  role?: string;
  user_metadata?: any; // backward compatibility
}

interface AuthContextType {
  profile: UserProfile | null;   // expected by your other files
  user: UserProfile | null;      // alias for backward compatibility
  authLoading: boolean;          // expected by your other files
  loading: boolean;              // alias for backward compatibility
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const fetchProfile = async (id: string, metadata?: any) => {
    try {
      console.log("🔵 fetchProfile CALLED for:", id);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("❌ Profile fetch error:", error.message);
        return null;
      }

      if (data) {
        // ensure compatibility with user_metadata usage
        return { ...data, user_metadata: metadata };
      }

      return null;
    } catch (err) {
      console.error("❌ Unexpected fetch error:", err);
      return null;
    }
  };

  // INITIAL SESSION
  useEffect(() => {
    const init = async () => {
      console.log("🔵 Checking initial session...");
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        const id = data.session.user.id;
        const metadata = data.session.user.user_metadata;

        const profileData = await fetchProfile(id, metadata);

        setProfile(profileData);
      }

      setAuthLoading(false);
    };

    init();
  }, []);

  // AUTH STATE LISTENER
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("🔵 Auth changed:", event);

        if (event === "SIGNED_IN" && session?.user) {
          const id = session.user.id;
          const metadata = session.user.user_metadata;

          const profileData = await fetchProfile(id, metadata);
          setProfile(profileData);
        }

        if (event === "SIGNED_OUT") {
          setProfile(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        profile,
        user: profile,          // backwards compatibility
        authLoading,
        loading: authLoading,   // backwards compatibility
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
