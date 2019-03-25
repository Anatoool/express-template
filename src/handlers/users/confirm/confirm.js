const mongooseFindOneAndUpdate = require('../../../database/queries/mongooseFindOneAndUpdate');

const userConfirmEmail = async (req, res) => {
  const { code = '' } = req.body;

  const conditions = { confirmCode: code };
  const update = {
    $set: { confirmed: true },
  };

  const updateResult = await mongooseFindOneAndUpdate({ scheme: 'user', conditions, update });

  if (updateResult === null) {
    return res.status(403).send({
      error: true,
      _message: "User email confirmation error",
      message: "User email confirmation error",
      name: "ConfirmEmailError",
    });
  }

  return res.status(200).send({ message: "success" });
};

module.exports = userConfirmEmail;