/**
 * MongoDB Sanitization Example
 *
 * This file demonstrates how to use the mongoSanitize utility in controllers
 * to protect against NoSQL injection attacks.
 */

// Import the MongoDB sanitization utilities
const {
  sanitizeQuery,
  sanitizeSort,
  isValidObjectId,
} = require("../middleware/mongoSanitize");

/**
 * Example function showing how to safely build and execute MongoDB queries
 *
 * @param {Object} rawQuery - The unsanitized query object from user input
 * @param {Object} rawSortOptions - The unsanitized sort options
 * @param {String} modelId - The document ID if applicable
 * @returns {Object} Safe MongoDB query and options
 */
const buildSafeMongoQuery = (rawQuery, rawSortOptions, modelId) => {
  // Step 1: Sanitize the query object to prevent NoSQL injection
  const safeQuery = sanitizeQuery(rawQuery);

  // Step 2: If there's an ID, validate it's a proper MongoDB ObjectId
  if (modelId) {
    if (!isValidObjectId(modelId)) {
      throw new Error("Invalid document ID format");
    }

    // Add the ID to the query safely
    safeQuery._id = modelId;
  }

  // Step 3: Sanitize sort options
  const safeSort = sanitizeSort(rawSortOptions);

  return {
    query: safeQuery,
    options: {
      sort: safeSort,
    },
  };
};

/**
 * Example controller demonstrating how to use the sanitization utilities
 */
const exampleController = {
  /**
   * Get items with safe query handling
   */
  getItems: async (req, res, next) => {
    try {
      const Model = req.model; // Assume model is passed via middleware

      // Build a safe MongoDB query from user input
      const { query, options } = buildSafeMongoQuery(
        req.query, // Query parameters from URL
        req.query.sort, // Sort options from URL
        req.params.id // ID from route params if present
      );

      console.log("Safe MongoDB query:", query);
      console.log("Safe MongoDB options:", options);

      // Execute the query safely
      const results = await Model.find(query)
        .sort(options.sort)
        .limit(parseInt(req.query.limit) || 10);

      return res.status(200).json({
        success: true,
        count: results.length,
        data: results,
      });
    } catch (error) {
      console.error("MongoDB Query Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error while processing query",
      });
    }
  },

  /**
   * Create item with safe input handling
   */
  createItem: async (req, res, next) => {
    try {
      const Model = req.model; // Assume model is passed via middleware

      // req.body is already sanitized by the sanitize middleware
      // Just perform final validations before creating

      const item = new Model(req.body);
      await item.save();

      return res.status(201).json({
        success: true,
        data: item,
      });
    } catch (error) {
      console.error("MongoDB Create Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error while creating item",
      });
    }
  },
};

module.exports = exampleController;
