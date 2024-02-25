/**
 * Контроллер для тестирования.
 * @class
 */
class TestController {
  /**
   * Обработчик тестовых данных.
   * @param {Object} req - Объект запроса.
   * @param {Object} res - Объект ответа.
   * @param {Function} next - Функция перехода к следующему обработчику.
   */
  async testData(req, res, next) {
    try {
      console.log("TestController testData");
      res.status(200).json({
        status: "success",
        data: "Test data ",
      });
    } catch (e) {
      console.log("Test Data Error");
    }
  }
}

module.exports = new TestController();
