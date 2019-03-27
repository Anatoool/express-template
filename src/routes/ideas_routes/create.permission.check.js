const errorTemplates = require('../_errors/errors');

const createPermissionCheck = async ({ req, res, next }) => {
  const { user = {} } = req;

  const errors = {...errorTemplates.permission};

  switch (user.role) {
    case 'user':
      break;
    default:
      return res.status(403).send({
        ...errors,
        message: `${errors.message} users with role '${user.role}' doesn't have access to idea creation`
      });
  }

  next();
};

module.exports = createPermissionCheck;
