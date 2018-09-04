class IndexController {
  static index(req, res) {
    res.json({
      message: 'Hello world'
    });
  }
}

module.exports = IndexController;