// src/utils/csrf.js
import axios from "axios";

let csrfToken = null;

export async function getCsrfToken() {
  if (csrfToken) return csrfToken;
  const res = await axios.get("/csrf-token", { withCredentials: true });
  csrfToken = res.data.csrfToken;
  return csrfToken;
}

export function injectCsrf(config = {}) {
  if (!config.headers) config.headers = {};
  if (csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }
  return config;
}

export async function withCsrf(requestFn, ...args) {
  if (!csrfToken) await getCsrfToken();
  const configArgIndex = args.findIndex(arg => arg && typeof arg === 'object' && arg.headers);
  if (configArgIndex !== -1) {
    args[configArgIndex] = injectCsrf(args[configArgIndex]);
  } else {
    args.push(injectCsrf());
  }
  return requestFn(...args);
}
