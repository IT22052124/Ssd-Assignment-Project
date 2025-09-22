class httpError extends Error {
  constructor(message, ErrorCode) {
    super(message);
    this.code = ErrorCode;
  }
}

module.exports = httpError;
