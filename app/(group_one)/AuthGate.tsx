"use client";

import { useAuth } from "@/lib/firebase/auth-context";
import Profile from "@/app/(group_two)/profile/page";

export function AuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    user,
    loading,
    profileComplete,
  } = useAuth();

  console.log({
    loading,
    user,
    profileComplete,
  });
// We still don't know anything. 
// AuthProvider is already showing the LoadingSpinner, 
// so we don't show children.
  if (loading) {
    return null;
  }
// No authenticated user. 
// You could eventually redirect them to /login here.
  if (!user) {
    return null;
  }

  // Authenticated user + userData/{uid} does not exist
  if (profileComplete === false) {
    return <Profile />;
  }

  // Authenticated user + userData/{uid} exists
  if (profileComplete === true) {
    return <>{children}</>;
  }

  return null;
}