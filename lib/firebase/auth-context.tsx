"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./config";
import { UserFetchData } from "../services/users";
import { LoadingSpinner } from "@/components/loading";

interface AuthContextType {
  user: User | null;
  loading: boolean;

// null    = not yet checked
// false   = checked and does NOT exist
// true    = checked and DOES exist
  profileComplete: boolean | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  profileComplete: null,
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const [profileComplete, setProfileComplete] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setLoading(true);
        setUser(user);
        // No User
        
        if (!user) {
          setProfileComplete(null);

          document.cookie =
            "session_token=; path=/; max-age=0; SameSite=Lax; Secure";

          return;
        }

        
        // Check User Data
        
        const profile = await UserFetchData(user.uid);

        
        setProfileComplete(!!profile);

        // Session Token
        
        const token = await user.getIdToken();

        document.cookie = `session_token=${token}; path=/; max-age=1200; SameSite=Lax; Secure`;

      } catch (error) {
        console.error("Error checking authentication/profile:", error);

        setProfileComplete(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        profileComplete,
      }}
    >
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}