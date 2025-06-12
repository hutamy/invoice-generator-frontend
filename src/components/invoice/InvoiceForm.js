import Date from "../ui/Date";
import Email from "../ui/Email";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Text from "../ui/Text";
import TextArea from "../ui/TextArea";
import InvoiceFormContainer from "./InvoiceFormContainer";
import Number from "../ui/Number";

const Form = ({
  invoiceData,
  handleInputChange,
  removeInvoiceItem,
  handleItemChange,
  addInvoiceItem,
  handleTaxRateChange,
}) => {
  return (
    <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-4">
        <p className="text-gray-700 font-medium mb-2">
          Fill in invoice details
        </p>
      </div>

      {/* My Details Section */}
      <InvoiceFormContainer label="My Details">
        <div className="p-4">
          <Text
            className={"mb-3"}
            label={"Name"}
            value={invoiceData.user.name}
            onChange={(e) => handleInputChange("user", "name", e.target.value)}
            placeholder="Your Name"
          />
          <TextArea
            className={"mb-3"}
            label={"Address"}
            rows={2}
            value={invoiceData.user.address}
            onChange={(e) =>
              handleInputChange("user", "address", e.target.value)
            }
            placeholder="456 Your Street, Client City, Country"
          />
          <div className="grid grid-cols-2 gap-3">
            <Email
              className=""
              label="Email"
              value={invoiceData.user.email}
              onChange={(e) =>
                handleInputChange("user", "email", e.target.value)
              }
              placeholder="contact@yourcompany.com"
            />
            <Text
              className=""
              label="Phone"
              value={invoiceData.user.phone}
              onChange={(e) =>
                handleInputChange("user", "phone", e.target.value)
              }
              placeholder="+1 234 567 890"
            />
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Details
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type={"text"}
                placeholder={"National Bank"}
                value={invoiceData.user.bank_name}
                onChange={(e) =>
                  handleInputChange("user", "bank_name", e.target.value)
                }
              />
              <Input
                type={"text"}
                placeholder={"Your Company Ltd"}
                value={invoiceData.user.bank_account_name}
                onChange={(e) =>
                  handleInputChange("user", "bank_account_name", e.target.value)
                }
              />
            </div>
            <Input
              type="text"
              placeholder="1234567890"
              className="mt-3"
              value={invoiceData.user.bank_account_number}
              onChange={(e) =>
                handleInputChange("user", "bank_account_number", e.target.value)
              }
            />
          </div>
        </div>
      </InvoiceFormContainer>

      {/* Client Details Section */}
      <InvoiceFormContainer label="Client Details">
        <div className="p-4">
          <Text
            className={"mb-3"}
            label={"Name"}
            value={invoiceData.client.name}
            onChange={(e) =>
              handleInputChange("client", "name", e.target.value)
            }
            placeholder="Client Company Name"
          />
          <TextArea
            className={"mb-3"}
            label={"Address"}
            rows={2}
            value={invoiceData.client.address}
            onChange={(e) =>
              handleInputChange("client", "address", e.target.value)
            }
            placeholder="456 Client Street, Client City, Country"
          />
          <div className="grid grid-cols-2 gap-3">
            <Email
              className=""
              label="Email"
              value={invoiceData.client.email}
              onChange={(e) =>
                handleInputChange("client", "email", e.target.value)
              }
              placeholder="contact@clientcompany.com"
            />
            <Text
              className=""
              label="Phone"
              value={invoiceData.client.phone}
              onChange={(e) =>
                handleInputChange("client", "phone", e.target.value)
              }
              placeholder="+1 987 654 321"
            />
          </div>
        </div>
      </InvoiceFormContainer>

      {/* Invoice Details Section */}
      <InvoiceFormContainer label="Invoice Details">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Text
              className=""
              label={"Invoice Number"}
              value={invoiceData.invoice.invoice_number}
              onChange={(e) =>
                handleInputChange("invoice", "invoice_number", e.target.value)
              }
              placeholder="INV-2025-001"
            />
            <Select
              className=""
              label="Currency"
              value={invoiceData.invoice.currency}
              onChange={(e) =>
                handleInputChange("invoice", "currency", e.target.value)
              }
              options={[
                { value: "$", label: "USD ($)" },
                { value: "Rp", label: "IDR (Rp)" },
                { value: "€", label: "EUR (€)" },
                { value: "£", label: "GBP (£)" },
                { value: "¥", label: "JPY (¥)" },
              ]}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Date
              className=""
              label="Issue Date"
              value={invoiceData.invoice.issue_date}
              onChange={(e) => {
                handleInputChange("invoice", "issue_date", e.target.value);
              }}
            />
            <Date
              className=""
              label="Due Date"
              value={invoiceData.invoice.due_date}
              onChange={(e) =>
                handleInputChange("invoice", "due_date", e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Items
            </label>
            {invoiceData.invoice.items.map((item, index) => (
              <div key={index} className="mb-3 p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-500">
                    Item #{index + 1}
                  </span>
                  <button
                    onClick={() => removeInvoiceItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <Text
                  className="mb-2"
                  label={"Description"}
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  placeholder="Item Description"
                />
                <div className="grid grid-cols-3 gap-2">
                  <Number
                    className="mb-2"
                    label={"Quantity"}
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    placeholder="1"
                  />
                  <Number
                    className="mb-2"
                    label={"Unit Price"}
                    value={item.unit_price}
                    onChange={(e) =>
                      handleItemChange(index, "unit_price", e.target.value)
                    }
                    placeholder="0.00"
                  />
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Total
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700"
                      value={
                        item.quantity > 0 && item.unit_price > 0
                          ? `${invoiceData.invoice.currency} ${
                              item.quantity * item.unit_price
                            }`
                          : ""
                      }
                      disabled
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addInvoiceItem}
              className="w-full mt-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
            >
              + Add Item
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <Number
              className=""
              label={"Tax Rate (%)"}
              value={invoiceData.invoice.tax_rate}
              onChange={(e) => handleTaxRateChange(e.target.value)}
              placeholder="10"
            />
            <TextArea
              className=""
              label={"Notes"}
              rows={2}
              value={invoiceData.invoice.notes}
              onChange={(e) =>
                handleInputChange("invoice", "notes", e.target.value)
              }
              placeholder="Any additional notes or terms"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between mb-1">
              <span className="text-gray-700">Subtotal:</span>
              <span className="text-gray-700">
                {invoiceData.invoice.currency}{" "}
                {invoiceData.invoice.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-700">
                Tax ({invoiceData.invoice.tax_rate}%):
              </span>
              <span className="text-gray-700">
                {invoiceData.invoice.currency}{" "}
                {invoiceData.invoice.tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-medium text-lg border-t border-gray-300 pt-2 mt-2">
              <span className="text-gray-700">Total:</span>
              <span className="text-gray-700">
                {invoiceData.invoice.currency}{" "}
                {invoiceData.invoice.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </InvoiceFormContainer>
    </div>
  );
};

export default Form;

Form.defaultProps = {
  invoiceData: {
    user: {
      name: "",
      address: "",
      email: "",
      phone: "",
      bank_name: "",
      bank_account_name: "",
      bank_account_number: "",
    },
    client: {
      name: "",
      address: "",
      email: "",
      phone: "",
    },
    invoice: {
      invoice_number: "",
      currency: "$",
      issue_date: "",
      due_date: "",
      Items: [],
      tax_rate: 0,
      notes: "",
      subtotal: 0,
      tax: 0,
      total: 0,
    },
  },
};
