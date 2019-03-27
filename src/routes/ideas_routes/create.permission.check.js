const createPermissionCheck = async ({ req, res, next }) => {
  const { user = {} } = req;

  if (true) {
    next();
  }


};

module.exports = createPermissionCheck;
