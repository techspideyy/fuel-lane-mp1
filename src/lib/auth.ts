import { supabase } from "@/integrations/supabase/client";

export type CurrentUser = {
  id: string;
  email: string | null;
  role?: string | null;
};

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user ?? null;
    if (!user) return null;

    // Try to read role from profiles table
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (error && (error as any).code !== "PGRST116") {
      // log but still return basic user
      console.error("getCurrentUser profile fetch error:", error);
    }

    return {
      id: user.id,
      email: user.email ?? null,
      role: profile?.role ?? (user.user_metadata as any)?.role ?? null,
    };
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return null;
  }
};

export default getCurrentUser;