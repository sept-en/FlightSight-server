module.exports = {
    toRadians: function (angle) {
  return angle * (Math.PI / 180);
},
    toDegrees: function (angle) {
  return angle * (180 / Math.PI);
},
    midPoint: function (posA, posB)
{
    var midPoint = {};

   var dLon = this.toRadians(posB.lng - posA.lng);
   var Bx = Math.cos(this.toRadians(posB.lat)) * Math.cos(dLon);
   var By = Math.cos(this.toRadians(posB.lat)) * Math.sin(dLon);

   midPoint.lat = this.toDegrees(Math.atan2(
                Math.sin(this.toRadians(posA.lat)) + Math.sin(this.toRadians(posB.lat)),
                Math.sqrt(
                    (Math.cos(this.toRadians(posA.lat)) + Bx) *
                    (Math.cos(this.toRadians(posA.lat)) + Bx) + By * By))); 

   midPoint.lng = posA.lng + this.toDegrees(Math.atan2(By, Math.cos(this.toRadians(posA.lat)) + Bx));

   return midPoint;
},
    distanceInKm : function (lat1, lng1, lat2, lng2) {
    var R = 6371;
    var dLat = this.toRadians(lat2-lat1);
    var dLon = this.toRadians(lng2-lng1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}
};