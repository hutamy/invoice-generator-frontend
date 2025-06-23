import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Form from "@/components/clients/ClientForm";
import List from "@/components/clients/ClientList";

const clients = [
  {
    id: 1,
    name: "Tuple",
    email: "example@mail.com",
    phone: "+1234567890",
    address: "123 Main St, City, Country",
    imageUrl: "https://tailwindcss.com/plus-assets/img/logos/48x48/tuple.svg",
  },
];

export default function Clients() {
  const [showForm, setShowForm] = useState(false);
  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errs = {};
    if (!client.name) errs.name = "Name is required";
    if (!client.email) errs.email = "Email is required";
    if (!client.phone) errs.phone = "Phone number is required";
    if (!client.address) errs.address = "Address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit the form data
      console.log("Client data submitted:", client);
      clearForm();
      setShowForm(false);
    }
  };

  const clearForm = () => {
    setClient({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setErrors({});
  };

  return (
    <>
      <div className="bg-white h-20 border-b border-gray-900/10 px-6 lg:px-8 flex-shrink-0">
        <Header />
      </div>
      <main>
        {!showForm && (
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
        )}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 py-16 xl:space-y-20">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold text-gray-900">
                  Clients
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  {showForm
                    ? "Add new client info to use in multiple invoices at once"
                    : "A list of all the clients in your account including their name, email, phone, and address."}
                </p>
              </div>
              {!showForm && (
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    className={
                      "rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:cursor-pointer focus-visible:outline-blue-600 bg-blue-600 hover:bg-blue-500"
                    }
                    onClick={() => setShowForm(true)}
                  >
                    <span className="flex items-center gap-x-1">
                      <PlusIcon
                        aria-hidden="true"
                        className="-ml-1.5 h-4 w-4"
                      />
                      Add client
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
          {showForm ? (
            <Form
              client={client}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              clearForm={clearForm}
              errors={errors}
              setShowForm={setShowForm}
            />
          ) : (
            <List
              clients={clients}
              setClient={setClient}
              setShowForm={setShowForm}
            />
          )}
        </div>
      </main>
      <div className="bg-white h-fit">
        <Footer />
      </div>
    </>
  );
}
