/*jshint -W104 */
/*jshint -W097 */
/*jshint -W119 */

'use strict';

class Poll {
  constructor (id, data, adminId, adminPath, votePath, active) {
    this.id        = id;
    this.title     = data.poll.title;
    this.responses = data.poll.responses || [];
    this.votes     = [];
    this.adminPath = adminPath + id + "/"+ adminId;
    this.votePath  = votePath + id;
    this.active    = active || true;
  }

  countVotes() {
    var voteCount = {};
    for (var vote in this.responses) {
      if (voteCount[vote]) {
        voteCount[vote]++;
      } else {
        voteCount[vote] = 1;
      }
    }
    return voteCount;
  }
}

module.exports = Poll;
