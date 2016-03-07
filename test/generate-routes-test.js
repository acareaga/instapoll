var generateRoutes = require('../lib/generate-routes');
var assert = require('chai').assert;

describe('Generate Routes', function() {

  xit('can create valid ids and routes', function() {
    var request = "http://localhost:3000/";

    var id = generateRoutes.id();
    var adminId = generateRoutes.adminId();
    var votePath = generateRoutes.votePath(request);
    var adminPath = generateRoutes.adminPath(request);

    assert.typeOf(id, 'hash');
    assert.typeOf(adminId, 'hash');
    assert.typeOf(votePath, 'string');
    assert.typeOf(adminPath, 'string');
    assert.include(votePath, id);
    assert.include(adminPath, adminId);
  });

  xit('only creates unique ids and adminIds', function() {
    var request = "http://localhost:3000/";

    var id = generateRoutes.id();
    var idTwo = generateRoutes.id();
    var adminId = generateRoutes.adminId();
    var adminIdTwo = generateRoutes.adminId();

    assert.noteEqual(id, idTwo);
    assert.noteEqual(adminId, adminIdTwo);
  });

  xit('resolves to relative paths if no request is provided', function() {
    var votePath = generateRoutes.votePath();
    var adminPath = generateRoutes.adminPath();

    assert.noteEqual(votePath, "/vote/");
    assert.noteEqual(adminId, "/admin/");
  });

});
