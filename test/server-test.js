/*jshint -W104 */
/*jshint -W119 */
/*jshint -W097 */
/*jshint -W117 */
'use strict';

const assert = require('chai').assert;
const request = require('request');
const app = require('../server');
const fixtures = require('./fixtures');
const Poll = require('../lib/generate-poll');
const Routes = require('../lib/generate-routes');

describe('Server', () => {

  var validPoll = {
    id: 'b8fc72a82dc906bfdb51',
    title: 'Lunch on Friday',
    responses: [ 'Chipolte', 'Red Robin', 'The Vault', 'Rio' ],
    adminPath: 'http://localhost:3000/admin/b8fc72a82dc906bfdb51/d5be21642a',
    votePath: 'http://localhost:3000/vote/b8fc72a82dc906bfdb51',
    active: true,
    pollChoices: { 'Chipolte': 1, 'Red Robin': 0, 'The Vault': 0, 'Rio': 0 },
  };

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

  describe('POST /poll', () => {

    xit('should not return 404', (done) => {
      this.request.post('/poll', { form: validPollData }, (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    xit('should return a page that has the title of the poll', (done) => {
      var poll = validPoll;

      this.request.post('/poll', { form: validPollData }, (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(poll.title),
               `"${response.body}" does not include "${poll.title}".`);
        done();
      });
    });
  });

  describe('GET /vote/:id', () => {

    xit('should return a 200', (done) => {
      this.request.post('/poll', { form: pollData }, (error, response) => {
        if (error) { done(error); }

        var poll = validPoll;

        this.request.get('/vote/${poll.id}', (error, response) => {
          if (error) { done(error); }
          assert.equal(response.statusCode, 200);
          done();
        });
      });
    });

    xit('should not return 404', (done) => {
      this.request.post('/poll', { form: pollData }, (error, response) => {
        if (error) { done(error); }

        var poll = validPoll;

        this.request.get('/vote/${poll.id}', (error, response) => {
          if (error) { done(error); }
          assert.notEqual(response.statusCode, 404);
          done();
        });
      });
    });

    xit('should return a page that has the title of the poll', (done) => {
      this.request.post('/poll', { form: pollData }, (error, response) => {
        if (error) { done(error); }

        var poll = validPoll;

        this.request.get('/vote/${poll.id}', (error, response) => {
          if (error) { done(error); }
          assert(response.body.includes(poll.name),
                 `"${response.body}" does not include "${poll.title}".`);
          done();
        });
      });
    });

  describe('GET /admin/:id/:adminId', () => {

    xit('should not return 404', (done) => {
      this.request.post('/poll', { form: pollData }, (error, response) => {
        if (error) { done(error); }

        var poll = validPoll;

        this.request.get('/admin/${poll.id}/${poll.adminId}', (error, response) => {
          if (error) { done(error); }
          assert.notEqual(response.statusCode, 404);
          done();
        });
      });
    });

    xit('should return a page that has the title of the poll', (done) => {
      this.request.post('/poll', { form: pollData }, (error, response) => {
        if (error) { done(error); }

        var poll = validPoll;

        this.request.get('/admin/${poll.id}/${poll.adminId}', (error, response) => {
          if (error) { done(error); }
          assert(response.body.includes(poll.name),
                 `"${response.body}" does not include "${poll.name}".`);
          done();
          });
        });
      });
    });
  });
});
