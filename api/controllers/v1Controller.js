'use strict';

function point_at_distance(x0, y0, x1, y1, ratio) {
   return {lat:((1 - ratio) * x0 + ratio * x1), lng: ((1 - ratio) * y0 + ratio * y1)};
}

exports.testAPI = function(req, res) {
  console.log('testAPI: ' + req.params.name);
  res.json("{'p1' : 'hi " + req.params.name + "'}");
};

exports.route_places_by_latlng = function(req, res) {
  console.log('route_places_by_latlng: ');

  var start_lat = req.params.start_lat;
  var start_lng = req.params.start_lng;
  var finish_lat = req.params.finish_lat;
  var finish_lng = req.params.finish_lng;
  
  var points = [];
  var ratio_of_distances = 0.0;

  while (ratio_of_distances <= 1)
  {
    var point_at = point_at_distance(start_lat, start_lng, finish_lat, finish_lng, ratio_of_distances);
    point_at.ratio = ratio_of_distances;
    points.push(point_at);
    ratio_of_distances += 0.1;
  }

  // points.push({lat:51.503186, lng:-0.126446, ratio:0.1});
  // console.log(points);

  var request = require("request");
  var resJson = {};
  resJson.request_id = req.params.id;
  var objects = [];

  var place_index = 0;
  var request_count = 0;
  for (var point of points)
  {
    var location_info_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${point.lat},${point.lng}&radius=500&type=restaurant&keyword=cruise&key=${global.googleAPI}`;

    ++request_count;
    request(location_info_URL, function(error, response, body) {
      var results = JSON.parse(body).results;
      if (results.length > 0)
      {
        for (var place of results)
        {
           var res_place = {index       : place_index,
                            location    : place.geometry.location,//lat,lng
                            icon        : place.icon,
                            name        : place.name, 
                            description : "Kill me",
                            images      : [],
                            path_progress : point.ratio};

           for (var photo of place.photos)
           {
              var photo_URL =`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${global.googleAPI}`;
              res_place.images.push(photo_URL);
           } 

           
           objects.push (res_place);
        }
        
        place_index++;
      }

      if(--request_count == 0)
      {
        resJson.objects = objects;
        res.json(resJson);
      }
    }); 
  }
};