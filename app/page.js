"use client"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      redirect('/api/auth/login?post_login_redirect_url=/dashboard');
    }
  }, [mounted]);

  return <div />;
}
