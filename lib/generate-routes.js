const crypto = require('crypto');

const generateRoutes = {
  sha: () => {
    return crypto.randomBytes(10).toString('hex');
  },
  adminPath: (request) => {
    return "/admin/";
  },
  votePath: (request) => {
    return "/vote/";
  }
};

module.exports = generateRoutes;
