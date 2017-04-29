'use strict';

exports.testAPI = function(req, res) {
  console.log('testAPI: ' + req.params.name);
  res.json("{'p1' : 'hi " + req.params.name + "'}");
};

exports.route_places_by_latlng = function(req, res) {
  console.log('route_places_by_latlng: ');
  res.json("{'api' : 'route_places_by_latlng'}");
};

//route_places/by_latlng/:id/:start_lat/:start_lng/:finish_lat/:finish_lng
// {
//     request-id: 123;
//     objects: [
//     {
//         latitude: ...;
//         longtitude: ....;
//         name: Barcelone;
//         description:  ....;
//         path-progress: ...; # path progress of current location in %
//         images: [ "https://...", "https://...."]
//     },
//     {  .... }
//     ]
// }