import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import Toast from "@/components/ui/Toast";
import Email from "@/components/ui/Email";
import Password from "@/components/ui/Password";

export default function SignIn() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleUserChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errs = {};
    if (!login.email) errs.email = "Email required";
    if (!login.password) errs.password = "Password required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setError("");
      setIsLoading(true);

      try {
        await signIn(login.email, login.password);
        router.push("/dashboard");
      } catch (err) {
        setError("Invalid email or password. Please try again.");
        console.error("Login error:", err);
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white h-20 border-b border-gray-900/10 px-6 lg:px-8 flex-shrink-0">
        <Header />
      </div>
      {error && <Toast title="Sign In Error" message={error} isError={true} />}
      <div className="flex flex-col min-h-[90vh] items-center justify-center">
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 transform-gpu overflow-hidden blur-3xl"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                opacity: 0.5,
              }}
              className="relative left-1/2 aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6e42fc] to-[#fcee08]"
            />
          </div>
        </div>
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
            Sign in to your account
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Not a member?{" "}
            <a
              href="/sign-up"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              Sign up now
            </a>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <Email
                componentclassname={"mb-3"}
                label={"Email*"}
                value={login.email}
                onChange={handleUserChange}
                id="email"
                name="email"
                autoComplete="email"
                error={!!errors.email}
                errormessage={errors.email}
              />
              <Password
                componentclassname={"mb-3"}
                label={"Password*"}
                value={login.password}
                onChange={handleUserChange}
                id="password"
                name="password"
                autoComplete="password"
                error={!!errors.password}
                errormessage={errors.password}
              />
            </div>
            <div className="flex justify-between mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="ml-auto px-6 py-2 rounded bg-blue-600 text-white font-semibold"
              >
                {isLoading ? "Signing in.." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-white h-fit">
        <Footer />
      </div>
    </div>
  );
}
