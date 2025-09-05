'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginWithGoogle from "../../components/buttons/LoginWithGoogle";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
export default function LoginPage() {

    return (
        <div className="mt-16 md:mt-24 text-slate-300">
            <div className="p-6 max-w-md mx-auto">
                <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
                    Please, Sign in!
                </h1>
                <p className='text-center text-base md:text-lg mb-6'>
                    Sign in to your account using one of the methods from below <span>
                        <FontAwesomeIcon icon={faHandPointRight} />
                    </span>
                </p>
                <LoginWithGoogle />
            </div>
        </div>
    )
}