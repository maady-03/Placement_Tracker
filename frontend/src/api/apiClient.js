import { API_URL } from "./config";

export class HttpError extends Error {
  constructor(status, message, data) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.data = data;
  }
}

let unauthorizedHandler = null;

// AuthContext registers this so any 401 clears the session in one place.
export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler;
};

const parseBody = async (response) => {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

async function request(path, { method = "GET", body } = {}) {
  const hasBody = body !== undefined;
  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      credentials: "include",
      headers: hasBody ? { "Content-Type": "application/json" } : undefined,
      body: hasBody ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new HttpError(0, "Cannot reach the server. Please try again.");
  }

  const data = await parseBody(response);

  if (!response.ok) {
    if (response.status === 401 && unauthorizedHandler) {
      unauthorizedHandler();
    }

    throw new HttpError(
      response.status,
      data?.error || data?.message || "Something went wrong.",
      data
    );
  }

  return data;
}

const apiClient = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};

export default apiClient;