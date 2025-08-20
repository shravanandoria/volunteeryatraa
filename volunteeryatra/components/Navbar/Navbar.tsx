import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-white border-gray-200 border-b-4">
        <div className="flex flex-wrap items-center mx-auto max-w-screen-xl p-4">
          <a
            href="https://flowbite.com"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="https://www.volunteeryatra.com/assets/images/Logo.png"
              alt="volunteerYatra"
              width={200}
              height={200}
            />
          </a>
          <div className="flex mx-7">
            <ul className="flex flex-row font-medium mt-0 space-x-4 rtl:space-x-reverse text-lg ">
              <li>
                <a
                  href="#"
                  className="text-black hover:underline"
                  aria-current="page"
                >
                  About
                </a>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-black hover:underline"
                  aria-current="page"
                >
                  Opportunitues
                </Link>
              </li>
              <li>
                <Link
                  href="/opportunity"
                  className="text-black hover:underline"
                  aria-current="page"
                >
                  Create Opportunity
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
