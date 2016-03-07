/*jshint -W104 */
/*jshint -W119 */
/*jshint -W097 */

const assert = require('chai').assert;
const request = require('request');
const app = require('../server');
const fixtures = require('./fixtures');

describe('Server', () => {

  before((done) => {
    this.port = 9876;
    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    assert(app);
  });

  describe('GET /', () => {

    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  describe('GET /vote/:id', () => {

    xit('should return a 200', (done) => {
      this.request.get('/vo', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    xit('should not return 404', (done) => {
      this.request.get('/polls/testPoll', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    xit('should return a page that has the title of the poll', (done) => {
      var poll = app.locals.polls.testPoll;

      this.request.get('/polls/testPoll', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(poll.name),
               `"${response.body}" does not include "${poll.name}".`);
        done();
      });
    });

  });

  describe('GET /admin/:id/:adminId', () => {

    beforeEach(() => {
      app.locals.polls.testPoll = fixtures.validPoll;
    });

    xit('should not return 404', (done) => {
      this.request.get('/polls/testPoll', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    xit('should return a page that has the title of the poll', (done) => {
      var poll = app.locals.polls.testPoll;

      this.request.get('/polls/testPoll', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(poll.name),
               `"${response.body}" does not include "${poll.name}".`);
        done();
      });
    });

  });
});
