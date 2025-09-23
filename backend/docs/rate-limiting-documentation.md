# Rate Limiting and Brute Force Protection

This document describes the rate limiting and brute force protection mechanisms implemented in the application.

## Implementation Details

### Rate Limiting

We use `express-rate-limit` to implement rate limiting for various endpoints:

1. **Login Rate Limiting**:

   - Limit: 5 failed attempts per 15 minutes per IP address
   - Applied to: Employee login endpoints
   - If exceeded: Returns 429 status code with message "Too many login attempts, please try again after 15 minutes"

2. **API Rate Limiting**:
   - Limit: 30 requests per minute per IP address
   - Applied to: All API endpoints
   - If exceeded: Returns 429 status code with message "Too many requests, please try again later"

### Brute Force Protection

In addition to rate limiting, we've implemented these brute force protection measures:

1. **Failed Login Tracking**:

   - Failed login attempts are tracked in-memory (would be Redis or database in production)
   - Tracking is per username (hashed) rather than just IP address
   - Periodic cleanup of old tracking data (every 5 minutes)

2. **Security Enhancements**:
   - Constant-time username validation and password comparison
   - Random delays added to failed login responses to prevent timing attacks
   - Detailed logging of failed login attempts with username and IP for security monitoring

## Best Practices Used

- Using established libraries (`express-rate-limit`) rather than custom implementations
- Secure token handling with proper JWT claims (iat, exp)
- Cookie security settings (httpOnly, secure, sameSite)
- Input validation before authentication logic
- Error responses don't leak information about whether username exists or password is wrong

## Maintenance and Monitoring

- Failed login attempts are logged for security monitoring
- Tracking data automatically expires after 15 minutes
- Rate limit counters reset after their windows expire

These mechanisms help protect the application against brute force attacks, credential stuffing, and denial of service attacks targeting authentication endpoints.
