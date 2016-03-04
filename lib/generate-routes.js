const crypto = require('crypto');

const generateRoutes = {
  sha: () => {
    return crypto.randomBytes(10).toString('hex');
  },
  adminPath: (request) => {
    return '${request.get(host)}/admin';
  },
  votePath: (request) => {
    return '${request.get(host)}/vote';
  }
};

module.exports = generateRoutes;
