/*jshint -W104 */

// const generatePoll = {
//   createPoll: (sha, body) => {
//     return poll = {
//       sha: sha,
//       title: body.title,
//       responses: body.response
//     };
//   }
// };

'use strict';

class Poll {
  constructor (id, data, adminId, adminPath, votePath, active) {
    this.id        = id;
    this.title     = data.title;
    this.responses = data.responses || {};
    this.votes     = {};
    this.adminPath = adminPath + id + "/"+ adminId;
    this.votePath  = votePath + id;
    this.active    = active || true;
  }

  countVotes() {
    var voteCount = {
        A: 0,
        B: 0,
        C: 0,
        D: 0
    };
    for (var vote in this.votes) {
      voteCount[votes[vote]]++;
    }
    return voteCount;
  }
}

module.exports = Poll;
