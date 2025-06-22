import Text from "@/components/ui/Text";
import Email from "@/components/ui/Email";
import Password from "@/components/ui/Password";

export default function Form({
  step,
  handleNext,
  handleSubmit,
  handleBack,
  userInfo,
  handleUserChange,
  bankInfo,
  handleBankChange,
  errors,
  isLoading,
}) {
  return (
    <form onSubmit={step === 1 ? handleNext : handleSubmit}>
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Text
            componentclassname={"mb-3"}
            label={"Name*"}
            value={userInfo.name}
            onChange={handleUserChange}
            id="name"
            name="name"
            autoComplete="name"
            error={!!errors.name}
            errormessage={errors.name}
          />
          <Email
            componentclassname={"mb-3"}
            label={"Email*"}
            value={userInfo.email}
            onChange={handleUserChange}
            id="email"
            name="email"
            autoComplete="email"
            error={!!errors.email}
            errormessage={errors.email}
          />
          <Text
            componentclassname={"mb-3"}
            label={"Address*"}
            value={userInfo.address}
            onChange={handleUserChange}
            id="address"
            name="address"
            autoComplete="address"
            error={!!errors.address}
            errormessage={errors.address}
          />
          <Text
            componentclassname={"mb-3"}
            label={"Phone*"}
            value={userInfo.phone}
            onChange={handleUserChange}
            id="phone"
            name="phone"
            autoComplete="phone"
            error={!!errors.phone}
            errormessage={errors.phone}
          />
          <Password
            componentclassname={"mb-3"}
            label={"Password*"}
            value={userInfo.password}
            onChange={handleUserChange}
            id="password"
            name="password"
            autoComplete="new-password"
            error={!!errors.password}
            errormessage={errors.password}
          />
          <Password
            componentclassname={"mb-3"}
            label={"Confirm Password*"}
            value={userInfo.confirmPassword}
            onChange={handleUserChange}
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            error={!!errors.confirmPassword}
            errormessage={errors.confirmPassword}
          />
        </div>
      )}
      {step === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Text
            componentclassname={"mb-3"}
            label={"Bank Name*"}
            value={bankInfo.bank_name}
            onChange={handleBankChange}
            id="bank_name"
            name="bank_name"
            error={!!errors.bank_name}
            errormessage={errors.bank_name}
          />
          <Text
            componentclassname={"mb-3"}
            label={"Account Number*"}
            value={bankInfo.bank_account_number}
            onChange={handleBankChange}
            id="bank_account_number"
            name="bank_account_number"
            error={!!errors.bank_account_number}
            errormessage={errors.bank_account_number}
          />
          <Text
            componentclassname={"mb-3"}
            label={"Account Name*"}
            value={bankInfo.bank_account_name}
            onChange={handleBankChange}
            id="bank_account_name"
            name="bank_account_name"
            error={!!errors.bank_account_name}
            errormessage={errors.bank_account_name}
          />
        </div>
      )}
      <div className="flex justify-between mt-8">
        {step === 2 && (
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="ml-auto px-6 py-2 rounded bg-blue-600 text-white font-semibold"
        >
          {step === 1 ? "Next" : isLoading ? "Signing up.." : "Submit"}
        </button>
      </div>
    </form>
  );
}
