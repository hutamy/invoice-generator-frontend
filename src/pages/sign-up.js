import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import Toast from "@/components/ui/Toast";
import SignUpForm from "@/components/signUp/SignUpForm";
import SignUpSteps from "@/components/signUp/SignUpSteps";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [bankInfo, setBankInfo] = useState({
    bank_name: "",
    bank_account_number: "",
    bank_account_name: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleUserChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleBankChange = (e) => {
    setBankInfo({ ...bankInfo, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    let errs = {};
    if (!userInfo.name) errs.name = "Name required";
    if (!userInfo.email) errs.email = "Email required";
    if (!userInfo.address) errs.address = "Address required";
    if (!userInfo.phone) errs.phone = "Phone required";
    if (!userInfo.password) errs.password = "Password required";
    if (userInfo.password !== userInfo.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    let errs = {};
    if (!bankInfo.bank_name) errs.bank_name = "Bank name required";
    if (!bankInfo.bank_account_number)
      errs.bank_account_number = "Account number required";
    if (!bankInfo.bank_account_name)
      errs.bank_account_name = "Account name required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep2()) {
      setError("");
      setIsLoading(true);

      try {
        await signUp({
          ...userInfo,
          ...bankInfo,
        });
        router.push("/dashboard");
      } catch (err) {
        setError("Registration failed. Please try again.");
        console.error("Registration error:", err);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="bg-white h-20 border-b border-gray-900/10 px-6 lg:px-8 flex-shrink-0">
        <Header />
      </div>
      {error && <Toast title="Sign Up Error" message={error} isError={true} />}
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
            Let's get you started
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Enter the details to get going
          </p>
          <SignUpSteps step={step} />
          <SignUpForm
            step={step}
            userInfo={userInfo}
            bankInfo={bankInfo}
            handleUserChange={handleUserChange}
            handleBankChange={handleBankChange}
            handleNext={handleNext}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            errors={errors}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className="bg-white h-fit">
        <Footer />
      </div>
    </div>
  );
}
