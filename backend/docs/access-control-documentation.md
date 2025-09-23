# Access Control Implementation

## Overview

This document outlines the access control implementation for the application to address Broken Access Control vulnerabilities (OWASP Top 10 A01:2021).

## Security Enhancements

### 1. Authentication Middleware

- `authCustomer.js`: Verifies and validates JWT for customer users
- `authEmployee.js`: Verifies and validates JWT for employee users

### 2. Role-Based Authorization

- `authorize.js`: Restricts access based on user roles (admin/cashier)
- Routes are protected based on the user's role

### 3. Resource Ownership Verification

- `checkOwnership.js`: Prevents IDOR attacks by verifying resource ownership
- Customers can only access their own data
- Admins can access all data

### 4. JWT-Based Authentication

- Tokens are stored in HTTP-only cookies
- Tokens include user ID, role, and expiration time
- Frontend receives token for API usage (Bearer token)

### 5. Security Headers

- X-Frame-Options: DENY (prevents clickjacking)
- X-XSS-Protection: 1; mode=block (enables XSS protection)
- X-Content-Type-Options: nosniff (prevents MIME type sniffing)
- Content-Security-Policy: Restricts resource origins

### 6. Secure Logout Mechanism

- Clears authentication cookies
- Separate endpoints for customer and employee logout

## Protected Resources

### Orders

- Customers can only view and create their own orders
- Employee access is role-based (admin/cashier)
- Order reports are restricted to admin users

### Products

- Everyone can view products
- Only admin users can create, update, or delete products
- Analytics are restricted to employees

### Customers

- Authentication required for customer operations
- Customers can only access their own data
- Admin users can access all customer data

## Best Practices

1. **Principle of Least Privilege**: Users only have the minimum access necessary
2. **Defense in Depth**: Multiple layers of access controls
3. **Secure by Default**: Routes are protected unless explicitly made public
4. **Complete Mediation**: All access requests are verified through middleware

## Future Enhancements

1. Implement rate limiting to prevent brute force attacks
2. Add CSRF protection with tokens
3. Implement IP-based restrictions for admin access
4. Add multi-factor authentication for sensitive operations
