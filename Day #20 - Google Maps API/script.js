
function initialize() {
  let mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(37.25, 55.16),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    minZoom: 2,
  };

  let map = new google.maps.Map(document.getElementById("map"), mapOptions);

  let infoWindow = new google.maps.InfoWindow();
  
  let marker = new google.maps.Marker({
    position: new google.maps.LatLng(37.25, 55.16),
    map: map,
    title: "Iran, Gonbad-e Kavus"
  });

  marker.addlistener("click", () => {
    infoWindow.setContent(marker.title);
    infoWindow.open(map, marker);
  });

  google.maps.event.addDomListener(window, "resize", () => {
    map.setCenter(mapOptions.center);
  });
}

google.maps.event.addDomListener(window, "load", initialize);
