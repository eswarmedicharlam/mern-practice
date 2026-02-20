const authorize = (...roles) => {
  return (req, res, next) => {

    // Ensure user is authenticated first
    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated"
      });
    }

    // Check if user's role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission."
      });
    }

    next();
  };
};

module.exports = authorize;
