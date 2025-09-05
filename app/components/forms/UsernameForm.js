'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import grabUsername from "@/app/actions/grabUsername";

export default function UsernameForm({ desired_username }) {
  const [taken, setTaken] = useState(false);
  const [username, setUsername] = useState(desired_username || "");
  const router = useRouter();

  // If coming from login with desired_username in localStorage
  useEffect(() => {
    if ('localStorage' in window && window.localStorage.getItem('desired_username')) {
      const savedUsername = window.localStorage.getItem('desired_username');
      window.localStorage.removeItem('desired_username');
      setUsername(savedUsername);
    }
  }, []);

  async function handleSubmit(formData) {
    const formDataObj = formData instanceof FormData ? formData : new FormData();

    if (!(formDataObj instanceof FormData)) formDataObj.append("username", username);

    const result = await grabUsername(formDataObj);

    if (result === false) {
      setTaken(true);
    } else {
      // Page created successfully, redirect to /account
      router.push('/account');
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(e.target));
      }}
    >
      <h1 className="text-4xl font-bold text-center text-slate-300 mb-2 mt-10">
        Grab your username
      </h1>
      <p className="text-center mb-6 text-xl text-slate-400 font-semibold">Choose your username</p>
      <div className="max-w-xs mx-auto placeholder:text-slate-300 mt-2 text-slate-300">
        <input
          name="username"
          className="block p-2 mx-auto border w-full rounded-3xl text-center"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {taken && (
          <div className="bg-red-400 border p-2 mb-2 rounded-3xl text-center">
            Already taken by another user.
          </div>
        )}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full p-2 bg-blue-900 text-slate-200 rounded-3xl"
        >
          Claim your username
        </button>
      </div>
    </form>
  );
}