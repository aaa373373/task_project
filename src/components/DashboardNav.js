import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  BookOpenIcon,
  CalendarIcon,
  CheckCircleIcon,
  CogIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import { signoutUser } from "../../utils";

const DashboardNav = ({ activeLink, firstName, lastName }) => {
  const router = useRouter();

  async function handleSignout() {
    await signoutUser();
    router.push("/auth/login");
  }

  return (
    <div className="p-5 h-full w-4/12 bg-white">
      <div className="h-20 mt-10 flex items-center">
        <div className="mr-4 h-full w-20 rounded-full bg-gray-600">
          {/* Image */}
        </div>
        <div>
          <p className="font-medium text-sm text-gray-500 capitalize">
            {firstName}
          </p>
          <p className="font-medium text-lg text-blue-700 capitalize">
            {lastName}
          </p>
        </div>
      </div>

      {/* Line divider */}
      <div className="mt-10 mx-6 border-b-2 border-blue-700"></div>

      {/* Navigation */}
      <nav className="mt-16">
        <Link
          href="/dashboard"
          className={`flex items-center font-medium ${
            activeLink === "task" ? "text-blue-700" : "text-gray-500"
          }`}
        >
          <CalendarIcon className="mr-7 w-6" />
          Tasks
        </Link>

        {/* Task Filter */}
        <nav className="mt-5 ml-5">
          <Link
            href="/dashboard/priority/high"
            className={`mb-2 flex items-center font-medium ${
              activeLink === "high" ? "text-blue-700" : "text-gray-500"
            }`}
          >
            <span className="mr-3 h-3 w-3 inline-block rounded-full bg-red-600"></span>
            High
          </Link>
          <Link
            href="/dashboard/priority/medium"
            className={`mb-2 flex items-center font-medium ${
              activeLink === "medium" ? "text-blue-700" : "text-gray-500"
            }`}
          >
            <span className="mr-3 h-3 w-3 inline-block rounded-full bg-blue-700"></span>
            Medium
          </Link>
          <Link
            href="/dashboard/priority/low"
            className={`flex items-center font-medium ${
              activeLink === "low" ? "text-blue-700" : "text-gray-500"
            }`}
          >
            <span className="mr-3 h-3 w-3 inline-block rounded-full bg-yellow-500"></span>
            Low
          </Link>
        </nav>

        <Link
          href="/dashboard/status/true"
          className={`mt-5 flex items-center font-medium ${
            activeLink === "completed" ? "text-blue-700" : "text-gray-500"
          }`}
        >
          <CheckCircleIcon className={`mr-7 w-6`} />
          Completed Tasks
        </Link>

        <Link
          href="/dashboard/notes"
          className={`mt-5 flex items-center font-medium ${
            activeLink === "notes" ? "text-blue-700" : "text-gray-500"
          }`}
        >
          <BookOpenIcon className={`mr-7 w-6`} />
          Notes
        </Link>

        <Link
          href="/dashboard/quick-note"
          className={`mt-5 flex items-center font-medium ${
            activeLink === "quick-note" ? "text-blue-700" : "text-gray-500"
          }`}
        >
          <PencilSquareIcon className={`mr-7 w-6`} />
          Quick Note
        </Link>

        {/* <Link
          href="#"
          className="mt-5 flex items-center font-medium text-gray-500"
        >
          <CogIcon className="mr-7 w-6 text-gray-500" />
          Settings
        </Link> */}
      </nav>

      <button
        className="mt-10 p-2 w-full bg-blue-700 hover:bg-blue-600 transition-all duration-200 text-white capitalize rounded-lg"
        onClick={handleSignout}
      >
        Sign out
      </button>
    </div>
  );
};

export default DashboardNav;
