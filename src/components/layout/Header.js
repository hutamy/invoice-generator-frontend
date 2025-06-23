import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const publicNavigation = [
  { name: "Home", href: "/", id: "#home" },
  { name: "Features", href: "/", id: "#features" },
  { name: "Invoice", href: "/", id: "#invoice" },
];

const privateNavigation = [
  { name: "Home", href: "/dashboard" },
  { name: "Invoices", href: "/invoices" },
  { name: "Clients", href: "/clients" },
  { name: "Expenses", href: "/expenses" },
];

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        {/* // to make other item centered */}
        <div className="hidden lg:flex lg:flex-1"></div>
        <div className="flex lg:gap-x-12 gap-x-8 lg:max-w-screen max-w-2/3 overflow-x-auto overflow-scroll-x">
          {isAuthenticated
            ? privateNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  {item.name}
                </a>
              ))
            : publicNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.id}
                  className="text-sm/6 font-semibold text-gray-900"
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.href != "/") {
                      window.location.href = item.href;
                      return;
                    } else {
                      if (window.location.pathname !== "/") {
                        window.location.href = item.href;
                        return;
                      }

                      const el = document.querySelector(item.id);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
        </div>
        <div className="flex flex-1 justify-end">
          {isAuthenticated ? (
            <div className="flex flex-1 items-center justify-end gap-x-8">
              <div className="relative">
                <button
                  type="button"
                  className="-m-1.5 p-1.5 cursor-pointer group"
                  onClick={() => setProfileOpen((open) => !open)}
                  aria-haspopup="true"
                  aria-expanded={profileOpen ? "true" : "false"}
                >
                  <span className="flex items-center text-sm/6 font-semibold text-gray-700 group-hover:text-blue-600">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full bg-gray-800 group-hover:ring-1 group-hover:ring-blue-600 transition-all duration-200"
                    />
                    <span className="ml-2">{user?.name || "User"}</span>
                    {profileOpen ? (
                      <ChevronUpIcon className="h-5 w-5  ml-2" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 ml-2" />
                    )}
                  </span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                        window.location.href = "/";
                      }}
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <a
              href="/sign-in"
              className="text-sm/6 font-semibold text-gray-900 hover:text-blue-600"
            >
              Sign in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
