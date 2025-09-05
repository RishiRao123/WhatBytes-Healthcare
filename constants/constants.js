export const DB_NAME = "healthcare";
export const handleError = (res, error) => {
  console.error(error.response?.data || error.message);
  res.status(500).json({
    message: "Internal server error",
    success: false,
    error: error.message,
  });
};
