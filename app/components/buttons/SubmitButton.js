
'use client'
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, className = '' }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={
                "bg-blue-500 disabled:bg-blue-400 text-white disabled:text-gray-200 py-2 px-4 mx-auto w-full rounded-3xl flex items-center gap-2 justify-center " + className
            }
        >
            {pending && (
                <span className="flex items-center gap-2">
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                    Saving...
                </span>
            )}
            {!pending && children}
        </button>
    );
}
