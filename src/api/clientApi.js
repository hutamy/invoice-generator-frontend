const API_URL = process.env.API_URL || "http://localhost:8080";

export async function createClient(data) {
  const token =
    data.token ||
    (typeof window !== "undefined" && window.localStorage.getItem("token"));
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Registration failed");
  return response.json();
}

export async function getClients() {
  const token =
    data.token ||
    (typeof window !== "undefined" && window.localStorage.getItem("token"));
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/clients`);
  if (!response.ok) throw new Error("Failed to fetch clients");
  return response.json();
}

export async function updateClient(id, data) {
  const token =
    data.token ||
    (typeof window !== "undefined" && window.localStorage.getItem("token"));
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/clients/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Update failed");
  return response.json();
}

export async function deleteClient(id) {
  const token =
    data.token ||
    (typeof window !== "undefined" && window.localStorage.getItem("token"));
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/clients/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) throw new Error("Deletion failed");
  return response.json();
}
