export default (res, data, statusCode, message, error) => {
  return res
    .status(statusCode)
    .json({ status: statusCode, message, data, error });
};
