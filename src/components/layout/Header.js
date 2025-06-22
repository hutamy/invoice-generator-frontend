import { useAuth } from "@/contexts/AuthContext";

const publicPath = [
  "/",
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

const privatePath = [
  "/dashboard",
  "/invoices",
  "/clients",
  "/expenses",
  "/settings",
];

const publicNavigation = [
  { name: "Home", href: "/", id: "#home" },
  { name: "Features", href: "/", id: "#features" },
  { name: "Invoice", href: "/", id: "#invoice" },
  { name: "Dashboard", href: "/dashboard", id: "#dashboard" },
];

const privateNavigation = [
  { name: "Home", href: "/dashboard" },
  { name: "Invoices", href: "/invoices" },
  { name: "Clients", href: "/clients" },
  { name: "Expenses", href: "/expenses" },
];

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        {/* // to make other item centered */}
        <div className="hidden lg:flex lg:flex-1"></div>
        <div className="flex lg:gap-x-12 gap-x-8 lg:max-w-screen max-w-2/3 overflow-x-auto overflow-scroll-x">
          {publicNavigation.map((item) => (
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
            <button
              onClick={logout}
              className="text-sm/6 font-semibold text-gray-900 hover:text-blue-600"
            >
              Sign out
            </button>
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
