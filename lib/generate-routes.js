const crypto = require('crypto');

const generateRoutes = {
  sha: () => {
    return crypto.randomBytes(10).toString('hex');
  },
  adminPath: (request) => {
    return "${request.hostname}/admin/";
  },
  votePath: (request) => {
    return "${request.hostname}/vote/";
  }
};

module.exports = generateRoutes;
