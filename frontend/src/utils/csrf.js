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
  // Determine the config position for axios methods:
  // - axios.get(url, config) => last arg is config
  // - axios.post(url, data, config) => last arg is config
  // We'll treat the last argument as config if it's a plain object,
  // otherwise append a new config.
  const lastIndex = args.length - 1;
  const looksLikeObject = (v) =>
    v && typeof v === "object" && !Array.isArray(v);
  const hasConfig = lastIndex >= 0 && looksLikeObject(args[lastIndex]);
  const cfg = hasConfig ? args[lastIndex] : {};
  const merged = injectCsrf({ ...(cfg || {}) });
  if (hasConfig) {
    args[lastIndex] = merged;
  } else {
    args.push(merged);
  }
  return requestFn(...args);
}
