const handleError = (err, req, res, next) => {
  if (err instanceof customapierr) {
    return res.status(err.statuscode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: "something went wrong, try again later" });
};

module.exports = handleError;
