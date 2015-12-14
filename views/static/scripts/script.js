$(document).ready(function() {
  $('#geo').on('click', function(e) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('Geolocation is not supported');
    }
  });

  function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    $('#lat').val(position.coords.latitude);
    $('#lon').val(position.coords.longitude);
  }

});
