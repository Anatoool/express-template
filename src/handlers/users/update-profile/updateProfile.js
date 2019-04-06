const mongooseFindByIdAndUpdate = require('../../../database/queries/mongooseFindByIdAndUpdate');
const updateProfileValidate = require('./updateProfileValidate');

const userUpdateProfile = async (req, res) => {
  const userUpdateInfo = req.body;
  const { user = {} } = req;

  const errors = await updateProfileValidate({ userUpdateInfo });

  if (errors.error) {
    return res.status(422).send({...errors});
  }

  const { id: userId } = user;

  const { name = '' } = userUpdateInfo;
  await mongooseFindByIdAndUpdate({
    scheme: 'user',
    id: userId,
    update: {
      name,
    },
  });

  return res.status(200).send({response: 'User was updated'});
};

module.exports = userUpdateProfile;