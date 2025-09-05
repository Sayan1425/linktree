'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HeroForm({ user, page }) {
  const router = useRouter()
  // ... (useEffect and handleSubmit logic remains the same) ...
  useEffect(() => {
    if ('localStorage' in window && window.localStorage.getItem('desired_username')) {
      const username = window.localStorage.getItem('desired_username')
      window.localStorage.removeItem('desired_username')
      router.push('/account?desired_username=' + username)
    }
  }, [router])
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username').toString().trim();
    if (!username) return;
    if (user) {
      if (page && username === page.uri) {
        router.push('/account');
      } else {
        alert("To access your account, please enter your correct username.");
      }
    } else {
      window.localStorage.setItem('desired_username', username);
      router.push('/login');
    }
  }

  return (
    
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-2 text-lg md:text-xl text-slate-300">
      
      <div className="flex items-center shadow-lg shadow-gray-500/25 m">
        <span className="pl-4 pr-2 py-2 text-center rounded-sm border border-r-0">
          <span className="font-semibold">Link</span>
          <span className='text-green-500 font-semibold'>list</span>.to/
        </span>
        <input
          name="username"
          type="text"
          className="border bg-transparent border-l-0 placeholder:text-slate-300 py-2 px-2 text-slate-300 w-full mt-2"
          placeholder="Username"
        />
      </div>

      <button type="submit" className="bg-blue-900 text-center text-slate-300 py-2 px-4 rounded-sm cursor-pointer border w-full md:w-auto">
        Join for free
      </button>
    </form>
  )
}