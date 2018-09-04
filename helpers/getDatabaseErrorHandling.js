module.exports = (err) => {
  res.status(500).json({
    message: 'Database error',
    error: err
  });
};