const userUpdateProfile = async (req, res) => {
  const userUpdateInfo = req.body;
  const { user = {} } = req;
  console.log(user);
  return res.status(200).send({response: 'User was updated'});
};

module.exports = userUpdateProfile;