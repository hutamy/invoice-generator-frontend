import React from "react";

const Preview = ({ invoice, user, client }) => {
  return (
    <div className="w-full md:w-1/2 overflow-hidden">
      <div
        className="bg-gray-50 p-1 rounded-lg shadow-sm"
        style={{ height: "100%", overflow: "auto" }}
      >
        <div className="font-sans text-gray-700 bg-gray-50 py-10 px-5">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-10">
            <div className="flex justify-between items-start mb-10 flex-col md:flex-row">
              <div>
                <div className="text-3xl font-semibold text-gray-800 mb-1">
                  INVOICE
                </div>
                <div className="text-base text-gray-600">
                  {invoice.invoice_number}
                </div>
              </div>
              <div className="text-gray-600 md:text-right mt-4 md:mt-0">
                <div>
                  Issue Date:{" "}
                  {invoice.issue_date &&
                    new Date(invoice.issue_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </div>
                <div>
                  Due Date:{" "}
                  {invoice.due_date &&
                    new Date(invoice.due_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-10 flex-col md:flex-row">
              <div className="mb-4 md:mb-0">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                  From
                </h3>
                <div className="text-sm leading-relaxed">
                  {user.name}
                  <br />
                  {user.address}
                  <br />
                  {user.email}
                  <br />
                  {user.phone}
                </div>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                  To
                </h3>
                <div className="text-sm leading-relaxed">
                  {client.name}
                  <br />
                  {client.address}
                  <br />
                  {client.email}
                  <br />
                  {client.phone}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full mb-8">
                <thead>
                  <tr>
                    <th className="py-3 px-2 text-left bg-gray-50 font-semibold text-sm border-b-2 border-gray-200">
                      Description
                    </th>
                    <th className="py-3 px-2 text-left bg-gray-50 font-semibold text-sm border-b-2 border-gray-200">
                      Quantity
                    </th>
                    <th className="py-3 px-2 text-left bg-gray-50 font-semibold text-sm border-b-2 border-gray-200">
                      Unit Price
                    </th>
                    <th className="py-3 px-2 text-right bg-gray-50 font-semibold text-sm border-b-2 border-gray-200">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index}>
                      <td
                        className={`py-3.5 px-2 ${
                          index === invoice.items.length - 1
                            ? ""
                            : "border-b border-gray-200"
                        }`}
                      >
                        {item.description}
                      </td>
                      <td
                        className={`py-3.5 px-2 ${
                          index === invoice.items.length - 1
                            ? ""
                            : "border-b border-gray-200"
                        }`}
                      >
                        {item.quantity > 0 && item.quantity}
                      </td>
                      <td
                        className={`py-3.5 px-2 ${
                          index === invoice.items.length - 1
                            ? ""
                            : "border-b border-gray-200"
                        }`}
                      >
                        {item.unit_price > 0 && (
                          <span>
                            {invoice.currency} {item.unit_price.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td
                        className={`py-3.5 px-2 text-right ${
                          index === invoice.items.length - 1
                            ? ""
                            : "border-b border-gray-200"
                        }`}
                      >
                        {item.quantity > 0 && item.unit_price > 0 && (
                          <span>
                            {invoice.currency}{" "}
                            {(item.quantity * item.unit_price).toFixed(2)}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col items-end mt-5 pt-4 border-t-2 border-gray-100">
              <div className="flex justify-between w-64 mb-2 text-sm text-gray-600">
                <span>Subtotal:</span>
                <span>
                  {invoice.Currency} {invoice.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between w-64 mb-2 text-sm text-gray-600">
                <span>Tax ({invoice.tax_rate.toFixed(1)}%):</span>
                <span>
                  {invoice.currency} {invoice.tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between w-64 mt-1 pt-2 border-t border-gray-200">
                <span className="text-base font-semibold">Total:</span>
                <span className="text-xl font-bold text-gray-800">
                  {invoice.currency} {invoice.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-10 pt-5 border-t border-gray-200 text-sm text-gray-600">
              <strong>Terms:</strong>
              {invoice.notes}
              <br />
              <strong>Thank you</strong> for your business!
            </div>

            <div className="mt-5 p-5 bg-gray-50 rounded-md text-sm">
              <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                Bank Account Details
              </h4>
              <div className="grid grid-cols-[max-content_1fr] gap-y-2 gap-x-4">
                <div className="font-semibold">Bank Name:</div>
                <div>{user.bank_name}</div>

                <div className="font-semibold">Account Name:</div>
                <div>{user.bank_account_name}</div>

                <div className="font-semibold">Account Number:</div>
                <div>{user.bank_account_number}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
Preview.defaultProps = {
  invoice: {
    InvoiceNumber: "",
    IssueDate: new Date().toISOString(),
    DueDate: new Date().toISOString(),
    Items: [],
    Currency: "$",
    Subtotal: 0,
    TaxRate: 0,
    Tax: 0,
    Total: 0,
    Notes: "",
  },
  user: {
    Name: "",
    Address: "",
    Email: "",
    Phone: "",
    BankName: "",
    BankAccountName: "",
    BankAccountNumber: "",
  },
  client: {
    Name: "",
    Address: "",
    Email: "",
    Phone: "",
  },
  handleInputChange: () => {},
  handleItemChange: () => {},
  handleTaxRateChange: () => {},
  addInvoiceItem: () => {},
  removeInvoiceItem: () => {},
};
