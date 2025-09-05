"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LogoutButton from "../components/buttons/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setUser(null);
      return;
    }
    fetch(`/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          setUser(data.user);
        } else {
          localStorage.removeItem("authToken");
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <header className="bg-blue-900 border-b py-6">
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto max-w-7xl gap-2 px-4 md:px-8">
        <div className="text-2xl md:texl-xl">
          <Link href="/">
            <FontAwesomeIcon icon={faLink} className=" text-green-600 bg-slate-300" />
            <span className="font-semibold text-slate-300">Link</span>
            <span className='text-green-500'>Tree</span>
          </Link>
        </div>
        <nav className="flex flex-row md:flex-row items-center gap-4 md:gap-4 text-slate-300 text-sm md:text-base">

          <Link href="/about" className="shadow-lg shadow-white/15  px-3 py-2">About</Link>

          <Link href="/plans" className="shadow-b shadow-md shadow-white/15 px-3 py-2">Plans</Link>

          <Link href="/contact" className="shadow-b shadow-md shadow-white/15 px-3 py-2" >Contact us</Link>
        </nav>

        <nav className="flex items-center gap-2 text-slate-300 text-sm md:text-base">
          {!user ? (
            <>
              <Link href="/login" className="shadow-b shadow-md shadow-white/15 px-3 py-2">Sign In</Link>
              <Link href="/register" className="shadow-b shadow-md shadow-white/15 px-3 py-2">Create account</Link>
            </>
          ) : (
            <>
              <span className="text-xl">Hello,</span>
              <Link href="/account">
                <span className="shadow-b shadow-md shadow-white/15 mr-2 p-2 ">
                {user.name}
                </span>
              </Link>
              <LogoutButton onLogout={() => setUser(null)} className="shadow-b shadow-md shadow-white/15 p-2 flex items-center gap-2" />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}