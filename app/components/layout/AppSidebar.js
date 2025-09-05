'use client';

import { faChartLine, faCircleArrowLeft, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoutButton from "../buttons/LogoutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
  const path = usePathname();

  return (
    <nav className="inline-flex flex-col gap-5 mt-10 rounded-xl mx-auto items-center">
      <Link
        href="/account"
        className={`flex items-center gap-1 p-2 px-6  rounded-sm shadow-lg text-sm hover:font-semibold ${
          path === "/account" ? "text-blue-500 font-bold hover:text-blue-700" : ""
        }`}
      >
        <FontAwesomeIcon fixedWidth={true} icon={faIdBadge} className="w-5 h-5" />
        <span>My page</span>
      </Link>

      <Link
        href="/analytics"
        className={`flex items-center gap-1 p-2 px-6 rounded-sm shadow-lg text-sm hover:font-semibold ${
          path === "/analytics" ? "text-blue-500 font-bold" : ""
        }`}
      >
        <FontAwesomeIcon fixedWidth={true} icon={faChartLine} className="w-5 h-5" />
        <span>Analytics</span>
      </Link>

      <LogoutButton iconLeft={true} className="flex items-center gap-2 p-2 px-8 rounded-sm shadow-lg text-sm hover:font-semibold" iconClasses="h-5 w-5" />

      <Link
        href="/"
        className="flex items-center gap-1 p-2 px-4 rounded-sm shadow-lg text-sm hover:font-semibold"
      >
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          fixedWidth={true}
          className="h-4 w-4"
        />
        <span>Back to Home</span>
      </Link>
    </nav>
  );
}
