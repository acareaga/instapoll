const generatePoll = {
  createPoll: (sha, body) => {
    return poll = {
      sha: sha,
      title: body.title,
      responses: body.response
    }
  }
};

module.exports = generatePoll;
