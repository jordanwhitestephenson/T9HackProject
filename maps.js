$(function getMyLocation() {
   navigator.geolocation.getCurrentPosition(displayLocation);
});

function displayLocation(position) {
   var latitude = position.coords.latitude;
   var longitude = position.coords.longitude;
   var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

   initMap(latLng);

   function initMap() {
       map = new google.maps.Map(document.getElementById('map_canvas'), {
           center: latLng,
           zoom: 10,
       });
       infowindow = new google.maps.InfoWindow();
       var service = new google.maps.places.PlacesService(map);
       service.nearbySearch({
           location: latLng,
           radius: 10000,
           name: 'womens',
       }, callback);
   }

   function callback(results, status) {
     console.log(results);
       if (status === google.maps.places.PlacesServiceStatus.OK){
         for (var i = 0; i < results.length; i++) {
             var realDogPark = results[i].name.includes('Shelter');
             var openSpace = results[i].name.includes('Women');
             if (realDogPark || openSpace) {
                 createMarker(results[i]);
             }
         }
           for (var k = 0; k < results.length; k++) {
               createMarker(results[k]);
           }
       }
       var infowindow = new google.maps.InfoWindow();
       var service = new google.maps.places.PlacesService(map);
   }


   function createMarker(place) {

       var placeLoc = place.geometry.location;
       var mylatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
       var infowindow = new google.maps.InfoWindow();
       var geocoder = new google.maps.Geocoder();
       var marker = new google.maps.Marker({
           map: map,
           position: place.geometry.location,

           animation: google.maps.Animation.DROP
       });
       var myLocationMarker = new google.maps.Marker({
           map: map,
           position: latLng,
           title: "You Are Here!",
       });
       google.maps.event.addListener(marker, 'click', function() {
           var localName = place.name;
           var localAddress = place.vicinity;
           var allInfo = '<h4 class = "map">' + localName + '</h4 class ="map">' + '<p class ="map">' + localAddress + '</p>';
           infowindow.setContent(allInfo);
           infowindow.open(map, this);
       });
   }
   google.maps.event.addDomListener(window, 'load', initMap);
 }
