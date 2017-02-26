// google maps script
  var pos = {
    lat: 0,
    long: 0
  };

  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 16
    });
    var infoWindow = new google.maps.InfoWindow({map: map});
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
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



  console.log("Before request");;
  var oReq = new XMLHttpRequest();
  var url = "https://defense-in-derpth.herokuapp.com/submit";
  var username = "85sBoDu6";
  var params = "username=" + username + "&lat=" + pos.lat + "&lng" + pos.long;
  oReq.setRequestHeader = ("Content-type", "application/x-www-form-urlencoded");
  oReq.open("POST", url, true);
  oReq.send(params);
  oReq.onreadystatechange = function (){
    if(oReq.readyState === XMLHttpRequest.DONE && oReq.status === 200)
    console.log("After request");
    console.log(oReq.readyState);
    if (readyState==4) {

    }
  }
