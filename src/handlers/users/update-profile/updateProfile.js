const userUpdateProfile = async (req, res) => {
  const user = req.body;

  return res.status(200).send({response: 'User was updated'});
};

module.exports = userUpdateProfile;