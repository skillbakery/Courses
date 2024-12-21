"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSession, signIn, signOut } from "next-auth/react";

export default function NavMenu() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="flex-1"></div> {/* Empty space for left alignment */}
        <ul className="flex space-x-6">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={clsx(
                  "text-white py-2 px-4 rounded hover:bg-gray-700 transition-all",
                  {
                    "bg-gray-700 font-bold text-blue-300": pathname === item.href,
                  }
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex-1 flex justify-end items-center space-x-4">
          {session ? (
            <>
              <span className="text-white">Welcome, {session.user?.name}!</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-all"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn("github")}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all"
              >
                Sign In with GitHub
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
