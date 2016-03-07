var generatePoll = require('../lib/generate-poll');
var assert = require('chai').assert;

describe('Generate Poll', function() {

  xit('creates a valid poll', function() {
    var poll = new Poll(validPoll);
    assert.typeOf(poll, 'hash');
    // expect(countVotes(poll)).to.deep.equal(expectedResult)
  });
});
