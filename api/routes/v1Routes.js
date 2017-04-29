'use strict';
module.exports = function(app) {
  var v1 = require('../controllers/v1Controller');

  app.route('/v1/route_places/by_latlng/:id/:start_lat/:start_lng/:finish_lat/:finish_lng')
    .get(v1.route_places_by_latlng);

  app.route('/v1/testAPI/:name')
    .get(v1.testAPI);
};