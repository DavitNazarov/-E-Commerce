// To catch any errors that might occur and sending a standardized error response.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    res.status(500).json({ message: err.message });
  });
};
export default asyncHandler;
