const API_URL = process.env.API_URL || "http://localhost:8080";

export async function createInvoice(data) {
  const token =
    data.token ||
    (typeof window !== "undefined" && window.localStorage.getItem("token"));
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/invoices`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Invoice creation failed");
  return response.json();
}

export async function getInvoices() {
  const token =
    data.token ||
    (typeof window !== "undefined" && window.localStorage.getItem("token"));
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/invoices`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch invoices");
  return response.json();
}

export async function updateInvoice(id, data) {
  const token =
    data.token ||
    (typeof window !== "undefined" && window.localStorage.getItem("token"));
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/invoices/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Update failed");
  return response.json();
}

export async function deleteInvoice(id) {
  const token =
    data.token ||
    (typeof window !== "undefined" && window.localStorage.getItem("token"));
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/invoices/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) throw new Error("Deletion failed");
  return response.json();
}
