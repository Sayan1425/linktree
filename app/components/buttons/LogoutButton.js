"use client"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function LogoutButton({
    className= "flex items-center p-2 px-4 rounded-sm font-semibold pl-2 cursor-pointer shadow ",
    iconLeft = false,
    iconClasses = ""
}){
    const router = useRouter();

    async function handleLogout() {
    // Call the server to destroy the HttpOnly cookie
    await fetch('/api/auth/logout', { method: 'POST' });
    // Remove the client-side token
    localStorage.removeItem('authToken');
    //Do a full page reload to reset all states
    window.location.href = '/';
  }

    return(
        <button onClick={handleLogout} className={className}>
            {iconLeft && (
                <FontAwesomeIcon icon ={faRightFromBracket} className={iconClasses}/>
            )}
            <span>Log out</span>
            {!iconLeft && (
                <FontAwesomeIcon icon ={faRightFromBracket} className={iconClasses}/>
            )}
        </button>
    )
}
