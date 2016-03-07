var Poll = require('../lib/generate-poll');
var assert = require('chai').assert;

describe('Generate Poll', function() {

  it('creates a valid poll', function() {
    var poll = new Poll({
      data: {
          id: 'ef583188a91f3aface14',
          title: 'Breakfast at Turing',
          responses: [ 'Ink Coffee', 'Starbucks', 'McD\'s' ],
          adminPath: 'http://localhost:3000/admin/ef583188a91f3aface14/adc8b407a3',
          votePath: 'http://localhost:3000/vote/ef583188a91f3aface14',
          active: true,
          pollChoices: { 'Ink Coffee': 0, Starbucks: 0, 'McD\'s': 0 } }
        });

    assert.typeOf(poll.data, 'hash');
    assert.equal(poll.data.id, 'ef583188a91f3aface14');
    assert.equal(poll.data.title, 'Breakfast at Turing');
    assert.equal(poll.data.responses, "[ 'Ink Coffee', 'Starbucks', 'McD\'s' ]");
    assert.equal(poll.data.adminPath, 'http://localhost:3000/admin/ef583188a91f3aface14/adc8b407a3');
    assert.equal(poll.data.votePath, 'http://localhost:3000/vote/ef583188a91f3aface14');
  });

  xit('active defaults to true if not specified', function() {
    var poll = new Poll({
      data: {
          id: 'ef583188a91f3aface14',
          title: 'Breakfast at Turing',
          responses: [ 'Ink Coffee', 'Starbucks', 'McD\'s' ],
          adminPath: 'http://localhost:3000/admin/ef583188a91f3aface14/adc8b407a3',
          votePath: 'http://localhost:3000/vote/ef583188a91f3aface14',
          active: true,
          pollChoices: { 'Ink Coffee': 0, Starbucks: 0, 'McD\'s': 0 } }
        });

    assert.equal(poll.data.active, true);
  });

  xit('has a unique admin and vote path for each poll', function(){
    var pollOne = new Poll({
      data: {
          id: 'ef583188a91f3aface14',
          title: 'Breakfast at Turing',
          responses: [ 'Ink Coffee', 'Starbucks', 'McD\'s' ],
          adminPath: 'http://localhost:3000/admin/ef583188a91f3aface14/adc8b407a3',
          votePath: 'http://localhost:3000/vote/ef583188a91f3aface14',
          active: true,
          pollChoices: { 'Ink Coffee': 0, Starbucks: 0, 'McD\'s': 0 } }
        });

    var pollTwo = new Poll({
      data: {
          id: 'ef58328a293f3aface14',
          title: 'Breakfast at Turing',
          responses: [ 'Ink Coffee', 'Starbucks', 'McD\'s' ],
          adminPath: 'http://localhost:3000/admin/ef58328a293f3aface14/add8b408a3',
          votePath: 'http://localhost:3000/vote/ef58328a293f3aface14',
          active: true,
          pollChoices: { 'Ink Coffee': 0, Starbucks: 0, 'McD\'s': 0 } }
        });


    assert.notEqual(pollOne.data.adminPath, pollTwo.data.adminPath);
    assert.notEqual(pollOne.data.votePath, pollTwo.data.votePath);
  });

  xit('defaults poll choices at 0 for new polls', function() {
    var poll = new Poll({
      data: {
          id: 'ef583188a91f3aface14',
          title: 'Breakfast at Turing',
          responses: [ 'Ink Coffee', 'Starbucks', 'McD\'s' ],
          adminPath: 'http://localhost:3000/admin/ef583188a91f3aface14/adc8b407a3',
          votePath: 'http://localhost:3000/vote/ef583188a91f3aface14',
          active: true,
          pollChoices: { 'Ink Coffee': 0, Starbucks: 0, 'McD\'s': 0 } }
        });

    assert.equal(poll.data.pollChoices, "{ 'Ink Coffee': 0, Starbucks: 0, 'McD\'s': 0 }");
  });
});
