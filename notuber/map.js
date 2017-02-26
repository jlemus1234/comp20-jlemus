// google maps script

var userLat = 0;
var userLong =  0;
var map;

  function initMap() {
    var user = new google.maps.LatLng(userLat, userLong);
      map = new google.maps.Map(document.getElementById('map'), {
      center: user,
      zoom: 16
    });
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          userLat = position.coords.latitude,
          userLong = position.coords.longitude

          var infoWindow = new google.maps.InfoWindow({map: map});
          infoWindow.setPosition(user);
          infoWindow.setContent('Location found.');
          user = new google.maps.LatLng(userLat, userLong);
          map.panTo(user);

        map.setCenter(user);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

//    var image = "person.png"
//    var marker = new google.maps.Marker({
//       position: user,
//       map: map,
//       title: 'Hello World!'
//     });
//     marker.setMap(map);
  }



  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }




  console.log("Before request");;
  var oReq = new XMLHttpRequest();
  var url = "https://defense-in-derpth.herokuapp.com/submit";
  var username = "85sBoDu6";
  var params = "username=" + username + "&lat=" + userLat + "&lng=" + userLong;
  oReq.open("POST", url, true);
  oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  oReq.send(params);
  oReq.onreadystatechange = function (){
    if(oReq.readyState === XMLHttpRequest.DONE && oReq.status === 200)
    console.log("After request");
    console.log(oReq.readyState);
    if (oReq.readyState === 4) {
      console.log(params);
      console.log(oReq.responseText);
    }
  }
