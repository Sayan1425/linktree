"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginWithGoogle() {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      window.google?.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      window.google?.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        { theme: "outline", size: "large" }
      );
    };
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const handleCredentialResponse = async (response) => {
    console.log("Google ID Token:", response.credential);
    const res = await fetch("/api/auth/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: response.credential }),
    });
    const data = await res.json();
    if (data.success && data.token) {
      localStorage.setItem("authToken", data.token); // store JWT
      window.location.href = "/";
    } else {
      console.error("Login failed:", data.error);
    }
  };
  return <div id="googleBtn" className="w-full flex justify-center"></div>;

}