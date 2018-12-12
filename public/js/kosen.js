let markers = [];
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: new google.maps.LatLng(1.3521, 103.8198),
    mapTypeId: 'terrain',
  });

  window.WebSocket = window.WebSocket || window.MoxWebSocket;
  const connection = new WebSocket("ws://localhost:8081");
  connection.onopen = function () {
    console.log('Connection established.');
    connection.send(
      JSON.stringify({
        request: 'map',
      })
    );
  };

  connection.onerror = function () {
    console.log("Error trying to connect to server.");
  };

  connection.onmessage = function (msg) {
    setMap(null); // Clear all markers.
    markers = [];

    //Set new markers.
    const data = JSON.parse(msg.data);
    // console.log(data);
    console.log('Received update from server.');
    // console.log(data);
    if (data.broadcast && data.broadcast === 'map') {
      for (var i = 0; i < data.data.length; i++) {
        const latlng = new google.maps.LatLng(data.data[i].lat, data.data[i].lon);
        // console.log(latlng);
        markers.push(
          new google.maps.Marker({
            position: latlng,
            map: map
          })
        );
      }
    }
    setMap(map);
  };
}

function setMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
