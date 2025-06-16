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

    // Recalculate invoice totals
    const subtotal = updatedItems.reduce(
      (sum, item) => sum + item.quantity * item.unit_price,
      0
    );
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
    const subtotal = updatedItems.reduce(
      (sum, item) => sum + item.quantity * item.unit_price,
      0
    );
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

  const downloadPDF = async (invoiceData) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Invoice ${invoiceData.invoice.invoice_number}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          :root {
            --primary-color: #333;
            --text-color: #333;
            --light-gray: #f5f7fa;
            --border-color: #eaedf2;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: "Inter", "Segoe UI", sans-serif;
            color: var(--text-color);
            line-height: 1.5;
            background-color: white;
            padding: 40px 20px;
          }

          .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
          }

          .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 40px;
          }

          .invoice-title {
            font-weight: 600;
            font-size: 32px;
            color: var(--primary-color);
            margin-bottom: 5px;
          }

          .invoice-id {
            font-size: 16px;
            color: #666;
          }

          .invoice-dates {
            text-align: right;
            color: #666;
          }

          .invoice-parties {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
          }

          .invoice-parties h3 {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #888;
            margin-bottom: 10px;
          }

          .party-info {
            font-size: 15px;
            line-height: 1.6;
          }

          .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }

          .invoice-table th {
            padding: 12px 8px;
            text-align: left;
            background-color: var(--light-gray);
            font-weight: 600;
            font-size: 14px;
            border-bottom: 2px solid var(--border-color);
          }

          .invoice-table td {
            padding: 14px 8px;
            border-bottom: 1px solid var(--border-color);
          }

          .invoice-table tr:last-child td {
            border-bottom: none;
          }

          .invoice-table th:last-child,
          .invoice-table td:last-child {
            text-align: right;
          }

          .invoice-totals {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            margin-top: 20px;
            padding-top: 15px;
            border-top: 2px solid var(--light-gray);
          }

          .invoice-subtotal,
          .invoice-tax {
            display: flex;
            justify-content: space-between;
            width: 250px;
            margin-bottom: 8px;
            font-size: 15px;
            color: #555;
          }

          .invoice-total {
            display: flex;
            justify-content: space-between;
            width: 250px;
            margin-top: 5px;
            padding-top: 8px;
            border-top: 1px solid var(--border-color);
          }

          .invoice-total-label {
            font-size: 16px;
            font-weight: 600;
          }

          .invoice-total-amount {
            font-size: 20px;
            font-weight: 700;
            color: var(--primary-color);
          }

          .invoice-notes {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid var(--border-color);
            font-size: 14px;
            color: #666;
          }

          .bank-details {
            margin-top: 20px;
            padding: 20px;
            background-color: var(--light-gray);
            border-radius: 6px;
            font-size: 14px;
          }

          .bank-details h4 {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #888;
            margin-bottom: 10px;
          }

          .bank-details-grid {
            display: grid;
            grid-template-columns: max-content 1fr;
            gap: 8px 16px;
          }

          .bank-details-label {
            font-weight: 600;
          }

          @media (max-width: 768px) {
            .invoice-header,
            .invoice-parties {
              flex-direction: column;
            }

            .invoice-dates,
            .invoice-parties div:last-child {
              margin-top: 20px;
              text-align: left;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="invoice-header">
            <div>
              <div class="invoice-title">INVOICE</div>
              <div class="invoice-id">${
                invoiceData.invoice.invoice_number
              }</div>
            </div>
            <div class="invoice-dates">
              <div>Date: ${invoiceData.invoice.issue_date}</div>
              <div>Due Date: ${invoiceData.invoice.due_date}</div>
            </div>
          </div>

          <div class="invoice-parties">
            <div>
              <h3>From</h3>
              <div class="party-info">
                ${invoiceData.user.name} <br />
                ${invoiceData.user.address} <br />
                ${invoiceData.user.email} <br />
                ${invoiceData.user.phone}
              </div>
            </div>
            <div>
              <h3>To</h3>
              <div class="party-info">
                ${invoiceData.client.name} <br />
                ${invoiceData.client.address} <br />
                ${invoiceData.client.email} <br />
                ${invoiceData.client.phone}
              </div>
            </div>
          </div>

          <table class="invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.invoice.items.map((item) => {
                `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.quantity}</td>
                  <td>${
                    invoiceData.invoice.currency
                  } ${item.unit_price.toLocaleString()}</td>
                  <td>${invoiceData.invoice.currency} ${(
                  item.unit_price * item.quantity
                ).toLocaleString()}</td>
                </tr>
                `;
              })}
            </tbody>
          </table>

          <div class="invoice-totals">
            <div class="invoice-subtotal">
              <span>Subtotal:</span>
              <span
                >${
                  invoiceData.invoice.currency
                } ${invoiceData.invoice.subtotal.toLocaleString()}</span
              >
            </div>
            <div class="invoice-tax">
              <span>Tax (${invoiceData.invoice.tax_rate}%):</span>
              <span>${
                invoiceData.invoice.currency
              } ${invoiceData.invoice.tax.toLocaleString()}</span>
            </div>
            <div class="invoice-total">
              <span class="invoice-total-label">Total:</span>
              <span class="invoice-total-amount"
                >${
                  invoiceData.invoice.currency
                } ${invoiceData.invoice.total.toLocaleString()}</span
              >
            </div>
          </div>

          <div class="invoice-notes">
            <strong>Terms:</strong> ${invoiceData.invoice.notes}<br />
            <strong>Thank you</strong> for your business!
          </div>

          <div class="bank-details">
            <h4>Bank Account Details</h4>
            <div class="bank-details-grid">
              <div class="bank-details-label">Bank Name:</div>
              <div>${invoiceData.user.bank_name}</div>

              <div class="bank-details-label">Account Name:</div>
              <div>${invoiceData.user.bank_account_name}</div>

              <div class="bank-details-label">Account Number:</div>
              <div>${invoiceData.user.bank_account_number}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html }),
    });

    if (!response.ok) {
      alert("Failed to generate PDF");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice_${invoiceData.invoice.invoice_number}.pdf`;
    link.click();
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
            <Button
              onClick={() => downloadPDF(invoiceData)}
              label="Download Invoice"
            />
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
