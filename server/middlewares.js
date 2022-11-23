const authStudent = (permission) => {
  return (req, res, next) => {
    const userRole = req.body.role;

    if (permission.includes(userRole)) {
      next();
    } else {
      res.status(409).send({
        message:
          "Your Account is not confirmed yet. Contact Your admin to accept your account.",
      });
    }
  };
};

module.exports = { authStudent };
