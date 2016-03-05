/*jshint -W104 */
/*jshint -W119 */

const crypto = require('crypto');

const generateRoutes = {
  id: () => {
    return crypto.randomBytes(10).toString('hex');
  },
  adminId: () => {
    return crypto.randomBytes(5).toString('hex');
  },
  votePath: (request) => {
    return `${request.protocol}://${request.get('host')}/vote/`;
  },
  adminPath: (request) => {
    return `${request.protocol}://${request.get('host')}/admin/`;
  }
};

module.exports = generateRoutes;
