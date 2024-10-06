"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "@kinde-oss/kinde-auth-nextjs/client";

export default function Home() {
  const { isAuthenticated, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect('/api/auth/login?post_login_redirect_url=/dashboard');
    }
  }, [isLoading, isAuthenticated]);

  return <div />;
}
