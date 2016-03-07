/*jshint -W104 */
/*jshint -W117 */
/*jshint -W097 */
'use strict';

class Poll {
  constructor (id, data, adminId, adminPath, votePath, active, pollChoices) {
    this.id          = id;
    this.title       = data.poll.title;
    this.responses   = data.poll.responses || [];
    this.adminPath   = adminPath + id + "/"+ adminId;
    this.votePath    = votePath + id;
    this.active      = active || true;
    this.pollChoices = pollChoices;
  }
}

module.exports = Poll;
