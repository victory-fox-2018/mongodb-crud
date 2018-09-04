module.exports = (err) => {
  res.status(500).json({
    message: 'Server error connection',
    error: err
  });
};