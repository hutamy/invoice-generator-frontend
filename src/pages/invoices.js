import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PlusIcon } from "@heroicons/react/20/solid";
import InvoiceList from "@/components/invoice/InvoiceList";
import { useState } from "react";
import InvoiceGenerator from "@/components/invoice/InvoiceGenerator";

const invoices = [
  {
    number: "INV-001",
    issued_date: "2023-10-01",
    due_date: "2023-10-15",
    amount: "$200.00",
    status: "paid",
    client: {
      name: "Lindsay Walton",
      email: "lindsay.walton@example.com",
    },
  },
];

export default function Invoices() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="bg-white h-20 border-b border-gray-900/10 px-6 lg:px-8 flex-shrink-0">
        <Header />
      </div>
      <main className="min-h-screen">
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 py-16 xl:space-y-20">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold text-gray-900">
                  Invoices
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the invoices in your account including their
                  number, client, email, amount, status, issue date, and due
                  date.
                </p>
              </div>

              {!showForm && (
                <div className="sm:ml-16 sm:mt-0 sm:flex-none">
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
                      Create invoice
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              {showForm ? (
                <InvoiceGenerator setShowForm={setShowForm} allowSave={true} />
              ) : (
                <InvoiceList invoices={invoices} />
              )}
            </div>
          </div>
        </div>
      </main>
      <div className="bg-white h-fit">
        <Footer />
      </div>
    </>
  );
}
