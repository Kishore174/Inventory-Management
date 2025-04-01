const notFound = (req, res, next) => {
    res.status(404).json({
      success: false,
      error: "Page Not Found",
    });
  };
  
  module.exports = notFound;
  