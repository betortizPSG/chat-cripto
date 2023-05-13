class ResponseUtils {
  static success(res, status, token, message) {
    res
      .status(status)
      .header("Authorization", "Bearer " + token)
      .json({
        successMessage: message,
        token,
      });
  }

  static error(res, status, message, exception = "") {
    res.status(status).json({
      error: {
        status,
        errorMessage: Array.isArray(message) ? message : [message],
        exception,
      },

      exception: exception || message,
    });
  }
}

module.exports = ResponseUtils;
