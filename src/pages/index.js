import React, { useState } from "react";
import InvoicePreview from "../components/invoice/InvoicePreview";
import InvoiceForm from "../components/invoice/InvoiceForm";
import InvoiceHero from "../components/invoice/InvoiceHero";
import Button from "../components/ui/Button";

export default function InvoiceGenerator() {
  // Initial state for the form
  const [invoiceData, setInvoiceData] = useState({
    invoice: {
      invoice_number: "",
      issue_date: "",
      due_date: "",
      currency: "",
      items: [
        {
          description: "",
          quantity: 0,
          unit_price: 0,
        },
      ],
      subtotal: 0,
      tax_rate: 0,
      tax: 0,
      total: 0,
      notes: "",
    },
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
  });

  // Handle input change
  const handleInputChange = (section, field, value) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  // Handle item change in the invoice
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceData.invoice.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]:
        field === "quantity" || field === "unit_price" ? Number(value) : value,
    };

    // Recalculate item total
    if (field === "quantity" || field === "unit_price") {
      updatedItems[index].total =
        updatedItems[index].quantity * updatedItems[index].unit_price;
    }

    // Recalculate invoice totals
    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * (invoiceData.invoice.tax_rate / 100);
    const total = subtotal + tax;

    setInvoiceData((prevData) => ({
      ...prevData,
      invoice: {
        ...prevData.invoice,
        items: updatedItems,
        subtotal: subtotal,
        tax: tax,
        total: total,
      },
    }));
  };

  // Handle tax rate change
  const handleTaxRateChange = (value) => {
    const taxRate = Number(value);
    const subtotal = invoiceData.invoice.subtotal;
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    setInvoiceData((prevData) => ({
      ...prevData,
      invoice: {
        ...prevData.invoice,
        tax_rate: taxRate,
        tax: tax,
        total: total,
      },
    }));
  };

  // Add new invoice item
  const addInvoiceItem = () => {
    const newItem = {
      description: "",
      quantity: 0,
      unit_price: 0,
      total: 0,
    };

    setInvoiceData((prevData) => ({
      ...prevData,
      invoice: {
        ...prevData.invoice,
        items: [...prevData.invoice.items, newItem],
      },
    }));
  };

  // Remove invoice item
  const removeInvoiceItem = (index) => {
    const updatedItems = invoiceData.invoice.items.filter(
      (_, i) => i !== index
    );

    // Recalculate totals
    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * (invoiceData.invoice.tax_rate / 100);
    const total = subtotal + tax;

    setInvoiceData((prevData) => ({
      ...prevData,
      invoice: {
        ...prevData.invoice,
        items: updatedItems,
        subtotal: subtotal,
        tax: tax,
        ttotal: total,
      },
    }));
  };

  // Save invoice (placeholder function)
  const saveInvoice = () => {
    console.log("Saving invoice:", invoiceData);
    alert("Invoice saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <InvoiceHero />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="text-xl font-medium text-gray-500">
              Create invoices in seconds with our intuitive generator.
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button onClick={saveInvoice} label="Download Invoice" />
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Form */}
          <InvoiceForm
            invoiceData={invoiceData}
            handleInputChange={handleInputChange}
            handleItemChange={handleItemChange}
            handleTaxRateChange={handleTaxRateChange}
            addInvoiceItem={addInvoiceItem}
            removeInvoiceItem={removeInvoiceItem}
          />

          {/* Right Column - Preview */}
          <InvoicePreview
            invoice={invoiceData.invoice}
            user={invoiceData.user}
            client={invoiceData.client}
          />
        </div>
      </div>
    </div>
  );
}
