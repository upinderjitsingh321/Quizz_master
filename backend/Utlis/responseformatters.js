const CustomResponse = (res, isSuccess = true,status,data, message) => {
  return res
    .status(status)
    .json({ success: isSuccess, statuscode: status, data, message });
};
const FaiulerResponse = (res, error) => {
  return res
    .status(500)
    .json({
      success: false,
      statuscode: 500,
      data: error,
      message: "Interal server error",
    });
};

module.exports = { CustomResponse, FaiulerResponse };
