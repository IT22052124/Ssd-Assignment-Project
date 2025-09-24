/**
 * MongoDB Query Sanitizer
 *
 * This utility provides functions to sanitize MongoDB queries to prevent NoSQL injection.
 * It should be used in controllers when building query objects.
 */

// Sanitize a query object to prevent NoSQL injection
const sanitizeQuery = (query) => {
  // If query is not an object or is null, return an empty object
  if (!query || typeof query !== "object" || Array.isArray(query)) {
    return {};
  }

  const sanitized = {};

  // Process each field in the query
  for (const [key, value] of Object.entries(query)) {
    // Skip any MongoDB operator keys (starting with $)
    if (key.startsWith("$")) continue;

    // Skip any keys containing dots which could be used for property traversal attacks
    if (key.includes(".")) continue;

    // Handle nested objects recursively
    if (value && typeof value === "object" && !Array.isArray(value)) {
      // If the field contains operators (MongoDB comparison operators)
      const containsOperators = Object.keys(value).some((k) =>
        k.startsWith("$")
      );

      if (containsOperators) {
        // Only allow specific safe operators
        const safeOperators = {
          $eq: true,
          $gt: true,
          $gte: true,
          $lt: true,
          $lte: true,
          $in: true,
          $nin: true,
        };

        const sanitizedValue = {};
        for (const [op, opValue] of Object.entries(value)) {
          if (safeOperators[op]) {
            sanitizedValue[op] =
              op === "$in" || op === "$nin"
                ? Array.isArray(opValue)
                  ? opValue.filter((v) => typeof v !== "object")
                  : []
                : opValue;
          }
        }
        sanitized[key] = sanitizedValue;
      } else {
        // For nested objects without operators, recursively sanitize
        sanitized[key] = sanitizeQuery(value);
      }
    } else if (Array.isArray(value)) {
      // Filter out any objects from arrays to prevent injection
      sanitized[key] = value.filter((item) => typeof item !== "object");
    } else {
      // Direct values are safe
      sanitized[key] = value;
    }
  }

  return sanitized;
};

// Sanitize sort parameters to prevent NoSQL injection
const sanitizeSort = (sortParams) => {
  if (typeof sortParams === "string") {
    // If it's a string like "field1 -field2", convert to object
    const fields = sortParams.split(" ");
    const sortObject = {};

    fields.forEach((field) => {
      if (field.startsWith("-")) {
        sortObject[field.substring(1)] = -1;
      } else {
        sortObject[field] = 1;
      }
    });

    return sanitizeObject(sortObject);
  } else if (sortParams && typeof sortParams === "object") {
    return sanitizeObject(sortParams);
  }

  return {};
};

// Sanitize a simple object (for sort, project, etc.)
const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== "object") return {};

  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    // Skip dangerous keys
    if (key.startsWith("$") || key.includes(".")) continue;

    // Only allow numeric values or booleans
    if (typeof value === "number" || typeof value === "boolean") {
      sanitized[key] = value;
    }
  }

  return sanitized;
};

// Validate MongoDB ObjectId
const isValidObjectId = (id) => {
  if (!id || typeof id !== "string") return false;
  return /^[0-9a-fA-F]{24}$/.test(id);
};

module.exports = {
  sanitizeQuery,
  sanitizeSort,
  sanitizeObject,
  isValidObjectId,
};
