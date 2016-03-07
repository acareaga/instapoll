
var Poll = require('../lib/generate-poll');
var assert = require('chai').assert;

describe('Generate Poll', function() {

  it('creates a valid poll', function() {
    var poll = new Poll({
          id: 'ef583188a91f3aface14',
          title: 'Breakfast at Turing',
          responses: [ 'Ink Coffee', 'Starbucks', 'McD\'s' ],
          adminPath: 'http://localhost:3000/admin/ef583188a91f3aface14/adc8b407a3',
          votePath: 'http://localhost:3000/vote/ef583188a91f3aface14',
          active: true,
          pollChoices: { 'Ink Coffee': 0, Starbucks: 0, 'McD\'s': 0 } });

    assert.typeOf(poll, 'hash');
    assert.equal(poll.id, 'ef583188a91f3aface14');
    assert.equal(poll.title, 'Breakfast at Turing');
    assert.equal(poll.responses, "[ 'Ink Coffee', 'Starbucks', 'McD\'s' ]");
    assert.equal(poll.adminPath, 'http://localhost:3000/admin/ef583188a91f3aface14/adc8b407a3');
    assert.equal(poll.votePath, 'http://localhost:3000/vote/ef583188a91f3aface14');
  });

  it('active defaults to true if not specified', function() {
    var poll = new Poll({
          id: 'ef583188a91f3aface14',
          title: 'Breakfast at Turing',
          responses: [ 'Ink Coffee', 'Starbucks', 'McD\'s' ],
          adminPath: 'http://localhost:3000/admin/ef583188a91f3aface14/adc8b407a3',
          votePath: 'http://localhost:3000/vote/ef583188a91f3aface14',
          pollChoices: { 'Ink Coffee': 0, Starbucks: 0, 'McD\'s': 0 } });

    assert.equal(poll.active, true);
  });

  it('has a unique admin and vote path for each poll', function(){
    var pollOne = new Poll({
          id: 'ef583188a91f3aface14',
          title: 'Breakfast at Turing',
          responses: [ 'Ink Coffee', 'Starbucks', 'McD\'s' ],
          adminPath: 'http://localhost:3000/admin/ef583188a91f3aface14/adc8b407a3',
          votePath: 'http://localhost:3000/vote/ef583188a91f3aface14',
          pollChoices: { 'Ink Coffee': 0, Starbucks: 0, 'McD\'s': 0 } });

    var pollTwo = new Poll({
          id: 'af593188d91f2aface45',
          title: 'Breakfast at Turing',
          responses: [ 'Ink Coffee', 'Starbucks', 'McD\'s' ],
          adminPath: 'http://localhost:3000/admin/af593188d91f2aface45/acw9f318q0',
          votePath: 'http://localhost:3000/vote/af593188d91f2aface45',
          pollChoices: { 'Ink Coffee': 0, Starbucks: 0, 'McD\'s': 0 } });


    assert.notEqual(pollOne.adminPath, pollTwo.adminPath);
    assert.notEqual(pollOne.votePath, pollTwo.votePath);
  });

  it('defaults poll choices at 0 for new polls', function() {
    var poll = new Poll({
          id: 'ef583188a91f3aface14',
          title: 'Breakfast at Turing',
          responses: [ 'Ink Coffee', 'Starbucks', 'McD\'s' ],
          adminPath: 'http://localhost:3000/admin/ef583188a91f3aface14/adc8b407a3',
          votePath: 'http://localhost:3000/vote/ef583188a91f3aface14' });

    assert.equal(poll.Choices, "{ 'Ink Coffee': 0, Starbucks: 0, 'McD\'s': 0 }");
  });
});
