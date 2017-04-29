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
}
};