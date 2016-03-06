/*jshint -W104 */
/*jshint -W097 */
/*jshint -W119 */

'use strict';

class Poll {
  constructor (id, data, adminId, adminPath, votePath, active) {
    this.id        = id;
    this.title     = data.poll.title;
    this.responses = data.poll.responses || {};
    this.votes     = {};
    this.adminPath = adminPath + id + "/"+ adminId;
    this.votePath  = votePath + id;
    this.active    = active || true;
  }

  countVotes() {
    var tally = {};
    this.responses.forEach((vote) => {
      if (tally[vote]) {
        tally[vote]++;
      } else {
        tally[vote] = 1;
      }
    });
    return tally;
  }
}

module.exports = Poll;
