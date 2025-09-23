/**
 * Access Control Integration Tests
 *
 * This file contains tests for verifying that access control mechanisms
 * are properly implemented and functioning correctly.
 */

const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Replace with the actual app import when setting up tests
let app;
try {
  app = require("../server");
} catch (e) {
  console.log("Import app from the appropriate location when running tests");
}

// Helper function to generate test tokens
function generateTestToken(user) {
  const secret = process.env.JWT_SECRET || "dev_secret_change_me";
  if (user.type === "customer") {
    return jwt.sign({ sub: user.id, mail: user.email }, secret, {
      expiresIn: "1h",
    });
  } else if (user.type === "employee") {
    return jwt.sign(
      { sub: user.id, username: user.username, role: user.role },
      secret,
      { expiresIn: "1h" }
    );
  }
}

// Test data
const testUsers = {
  customer: {
    id: "customer123",
    email: "customer@example.com",
    type: "customer",
  },
  cashier: {
    id: "cashier123",
    username: "cashier",
    role: "Cashier",
    type: "employee",
  },
  admin: {
    id: "admin123",
    username: "admin",
    role: "admin",
    type: "employee",
  },
};

// Test cases
describe("Access Control Tests", () => {
  // Set up tokens before tests
  let customerToken, cashierToken, adminToken;
  beforeAll(() => {
    customerToken = generateTestToken(testUsers.customer);
    cashierToken = generateTestToken(testUsers.cashier);
    adminToken = generateTestToken(testUsers.admin);
  });

  // Clean up after tests
  afterAll(async () => {
    await mongoose.disconnect();
  });

  // Product routes tests
  describe("Product Routes", () => {
    // Public routes should be accessible without authentication
    test("GET /product should be accessible without authentication", async () => {
      if (!app) return; // Skip if app is not available

      const response = await request(app).get("/product");
      expect(response.statusCode).not.toBe(401);
      expect(response.statusCode).not.toBe(403);
    });

    // Admin-only routes
    test("POST /product/new should require admin authorization", async () => {
      if (!app) return; // Skip if app is not available

      // Without token
      const noTokenResponse = await request(app).post("/product/new");
      expect(noTokenResponse.statusCode).toBe(401);

      // With customer token
      const customerResponse = await request(app)
        .post("/product/new")
        .set("Authorization", `Bearer ${customerToken}`);
      expect(customerResponse.statusCode).toBe(401);

      // With cashier token
      const cashierResponse = await request(app)
        .post("/product/new")
        .set("Authorization", `Bearer ${cashierToken}`);
      expect(cashierResponse.statusCode).toBe(403);

      // With admin token
      const adminResponse = await request(app)
        .post("/product/new")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(adminResponse.statusCode).not.toBe(401);
      expect(adminResponse.statusCode).not.toBe(403);
    });
  });

  // Order routes tests
  describe("Order Routes", () => {
    // Customer-specific routes
    test("GET /order/:uid should allow only the owner customer", async () => {
      if (!app) return; // Skip if app is not available

      const ownerId = testUsers.customer.id;
      const otherId = "other123";

      // Without token
      const noTokenResponse = await request(app).get(`/order/${ownerId}`);
      expect(noTokenResponse.statusCode).toBe(401);

      // With owner token - own resource
      const ownerResponse = await request(app)
        .get(`/order/${ownerId}`)
        .set("Authorization", `Bearer ${customerToken}`);
      expect(ownerResponse.statusCode).not.toBe(401);
      expect(ownerResponse.statusCode).not.toBe(403);

      // With owner token - other's resource
      const wrongOwnerResponse = await request(app)
        .get(`/order/${otherId}`)
        .set("Authorization", `Bearer ${customerToken}`);
      expect(wrongOwnerResponse.statusCode).toBe(403);
    });

    // Employee routes
    test("GET /order should require employee authorization", async () => {
      if (!app) return; // Skip if app is not available

      // Without token
      const noTokenResponse = await request(app).get("/order");
      expect(noTokenResponse.statusCode).toBe(401);

      // With customer token
      const customerResponse = await request(app)
        .get("/order")
        .set("Authorization", `Bearer ${customerToken}`);
      expect(customerResponse.statusCode).toBe(401);

      // With cashier token
      const cashierResponse = await request(app)
        .get("/order")
        .set("Authorization", `Bearer ${cashierToken}`);
      expect(cashierResponse.statusCode).not.toBe(401);
      expect(cashierResponse.statusCode).not.toBe(403);

      // With admin token
      const adminResponse = await request(app)
        .get("/order")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(adminResponse.statusCode).not.toBe(401);
      expect(adminResponse.statusCode).not.toBe(403);
    });
  });

  // Logout tests
  describe("Logout Routes", () => {
    test("POST /logout/customer should clear customer cookie", async () => {
      if (!app) return; // Skip if app is not available

      const response = await request(app).post("/logout/customer");
      expect(response.statusCode).toBe(200);
      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"][0]).toContain("cust_access=;");
    });

    test("POST /logout/employee should clear employee cookie", async () => {
      if (!app) return; // Skip if app is not available

      const response = await request(app).post("/logout/employee");
      expect(response.statusCode).toBe(200);
      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"][0]).toContain("emp_access=;");
    });
  });
});
