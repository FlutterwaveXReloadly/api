export default (res, data, statusCode, message, error) => {
  return res
    .statusCode(statusCode)
    .json({ status: statusCode, message, data, error });
};
