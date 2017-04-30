'use strict';

exports.testAPI = function(req, res) {
  console.log('testAPI: ' + req.params.name);
  res.json("{'p1' : 'hi " + req.params.name + "'}");
};

exports.route_places_by_latlng = function(req, res) {
  console.log('route_places_by_latlng: ');
  var geometry = require("../helpers/geometry.js");
  var start_lat = req.params.start_lat;
  var start_lng = req.params.start_lng;
  var finish_lat = req.params.finish_lat;
  var finish_lng = req.params.finish_lng;
  
  var points = [];
  var min_distances = 10;
  var posA = {lat : start_lat, lng: start_lng };
  var posB = {lat : finish_lat, lng: finish_lng };
  
  function recMid(p1, p2) {
    var dist = geometry.distanceInKm(p1, p2);
    if (dist > min_distances)
    {
      var midPoint = geometry.midPoint(p1, p2);
      recMid(p1,midPoint);
      points.push(midPoint);
      recMid(midPoint,p2);
    }
  }
  
  points.push(posA);
  recMid(posA,posB)
  points.push(posB);
  console.log(points);

  var request = require("request");
  var resJson = {};
  resJson.request_id = req.params.id;
  var objects = [];

  var place_index = 0;
  var request_count = 0;

  request_count = points.length;
  for (var point of points)
  {
    var location_info_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${point.lat},${point.lng}&radius=${min_distances*1000}&type=locality&key=${global.googleAPI}`;
    console.log(location_info_URL);
    request(location_info_URL, function(error, response, body) {
    var results = JSON.parse(body).results;
    console.log(results.length);
    if (results.length > 0)
    {
      for (var place of results)
      {
          var res_place = {index       : place_index,
                          latitude    : place.geometry.location.lat,
                          longitude  : place.geometry.location.lng,
                          icon        : place.icon,
                          name        : place.name, 
                          description : "Kill me",
                          images      : [],
                          path_progress : point.ratio,
                          vicinity    : place.vicinity};

        if (place.hasOwnProperty("photos"))
        {
          for (var photo of place.photos)
          {
              var photo_URL =`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${global.googleAPI}`;
              res_place.images.push(photo_URL);
          } 
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