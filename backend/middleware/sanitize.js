// Simple request sanitizer to mitigate MongoDB operator injection ($ne, $gt, etc.)
// Recursively remove keys that start with '$' or contain '.' from objects in req.body, req.query, req.params.

function clean(value) {
  if (Array.isArray(value)) {
    return value.map(clean);
  }
  if (value && typeof value === "object") {
    const cleaned = {};
    for (const [k, v] of Object.entries(value)) {
      // Disallow operator-style keys
      if (k.startsWith("$") || k.includes(".")) continue;
      cleaned[k] = clean(v);
    }
    return cleaned;
  }
  return value;
}

module.exports = function sanitizeMiddleware(req, res, next) {
  try {
    if (req.body) req.body = clean(req.body);
    if (req.query) req.query = clean(req.query);
    if (req.params) req.params = clean(req.params);
  } catch (e) {
    // If sanitization fails for any reason, block the request
    return res.status(400).json({ message: "Invalid request payload" });
  }
  next();
};
