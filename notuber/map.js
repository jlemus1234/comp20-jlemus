// google maps script

var userLat = 0;
var userLong =  0;
var user;
var map;
var marker;
var username = "85sBoDu6";
var infoWindow;
var resp;

  function initMap() {
      user = new google.maps.LatLng(userLat, userLong);
      map = new google.maps.Map(document.getElementById('map'), {
      center: user,
      zoom: 20
    });

    getLocation();
  }

  function getLocation() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          userLat = position.coords.latitude,
          userLong = position.coords.longitude
          user = new google.maps.LatLng(userLat, userLong);

          infoWindow = new google.maps.InfoWindow();
          infoWindow.setPosition(user);
          infoWindow.setContent('Location found.');
          map.panTo(user);

          var image = "person.png"
          var userMarker = new google.maps.Marker({
                  position: user,
                  map: map,
                  icon: image,
                  title: 'User'
           });
           userMarker.setMap(map);
           map.setCenter(user);

           infoWindow = new google.maps.InfoWindow({
             content: ('<h1> Username </h1>' + username)
           })
           infoWindow.open(map,userMarker);

           userMarker.addListener('click', function() {
             infoWindow.close();
             infoWindow = new google.maps.InfoWindow({
               content: ('<h1> Username </h1>' + username)
             })
             infoWindow.open(map, userMarker);
           })

           requestData();
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }



  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }

function requestData() {
//  console.log("Before request");
  var oReq = new XMLHttpRequest();
  var url = "https://defense-in-derpth.herokuapp.com/submit";
  var params = "username=" + username + "&lat=" + userLat + "&lng=" + userLong;
  oReq.open("POST", url, true);
  oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  oReq.send(params);
  oReq.onreadystatechange = function (){
    if(oReq.readyState === XMLHttpRequest.DONE && oReq.status === 200){
//    console.log("After request");
//    console.log(oReq.readyState);
//    if (oReq.readyState === 4) {
//      console.log(params);
      console.log(oReq.responseText);
      resp = oReq.responseText;
      var respJSON = (JSON.parse(resp)).vehicles;
//      console.log(respJSON.length);
//      console.log(respJSON);
      for(var i = 0; i < respJSON.length; i++) {
        console.log(respJSON[i]);
        otherMarkers(respJSON[i]);
      }
    }
  }
}

function otherMarkers(otherU){
  var image = "black_car.png"
  var other = new google.maps.LatLng(otherU.lat, otherU.lng);
  var otherUMarker = new google.maps.Marker({
          position: other,
          map: map,
          icon: image,
          title: 'Vehicles'
   });
   otherUMarker.setMap(map);

   otherUMarker.addListener('click', function() {
     infoWindow.close();
     var dist = google.maps.geometry.spherical.computeDistanceBetween(user, other);
     dist = (dist/1609.344);
     infoWindow = new google.maps.InfoWindow({
       content: ('<h1> Username </h1>' + otherU._id + '<h1> Distance </h1>' + dist)
     })
     infoWindow.open(map, otherUMarker);
   })
}
