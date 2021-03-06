$(document).ready(function() {

$('#geo').click(function(e) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('Geolocation is not supported');
    }
});

  function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    var id = lat+','+lng;
    $.ajax({
      url: '/location',
      method: 'POST',
      data: {id: id},
      success: function(data, status, obj) {
        $('#geoLoc').val(data.formatted_address);
        // $('#lat').val(data.geometry.location.lat);
        // $('#lon').val(data.geometry.location.lng);
      },
      error: function(err, status, message) {
        $('#geoLoc').val("Location not found");
      }
    }).done(function() {
    });
  }

  $('#foodButt').on('click', function(e) {
    e.preventDefault();
    if( $('#newFood').val() ) {
        $('#food').append('<div id="' + $('#newFood').val() + '" class="newTag">' + $('#newFood').val() + '<div id="' + $('#newFood').val() + '" class="delete btn-sm glyphicon glyphicon-remove ' + $('#newFood').val() + '">' + '</div></div>' + ' ' + '<script> $("#' +  $('#newFood').val() + '").on("click", function(){ $("#' + $('#newFood').val() + '").remove() }); </script>');
        $('#food').append( '<input id="' + $('#newFood').val() + '" class="food" type="hidden" name="food" value="' + $('#newFood').val() + '" >');
        $('#newFood').val('');
    }
  });

  $('#drinkButt').on('click', function(e) {
    e.preventDefault();
    if( $('#newDrink').val() ) {
        $('#drink').append('<div id="' + $('#newDrink').val() + '" class="newTag">' + $('#newDrink').val() + '<div id="' + $('#newDrink').val() + '" class="delete btn-sm glyphicon glyphicon-remove ' + $('#newDrink').val() + '">' + '</div></div>' + ' ' + '<script> $("#' +  $('#newDrink').val() + '").on("click", function(){ $("#' + $('#newDrink').val() + '").remove() }); </script>');
        $('#drink').append( '<input id="' + $('#newDrink').val() + '" class="drink" type="hidden" name="drink" value="' + $('#newDrink').val() + '" >');
        $('#newDrink').val('');
    }
  });

  $('#tagButt').on('click', function(e) {
    e.preventDefault();
    if( $('#newTag').val() ) {
        $('#tag').append('<div id="' + $('#newTag').val() + '" class="newTag">' + $('#newTag').val() + '<div id="' + $('#newTag').val() + '" class="delete btn-sm glyphicon glyphicon-remove ' + $('#newTag').val() + '">' + '</div></div>' + ' ' + '<script> $("#' +  $('#newTag').val() + '").on("click", function(){ $("#' + $('#newTag').val() + '").remove() }); </script>');
        $('#tag').append( '<input id="' + $('#newTag').val() + '" class="tag" type="hidden" name="tag" value="' + $('#newTag').val() + '" >');
        $('#newTag').val('');
    }
  });

  $('#accordion').accordion({
    collapsible: true,
    header: "> div > .sortable",
    heightStyle: "content"
  });

  $('#accordion').sortable({
    axis: "y",
    handle: ".sortable",
    placeholder: "ui-state-highlight",
    stop: function(event, ui) {
      ui.item.children("h3").triggerHandler("focusout");
      $(this).accordion('refresh');
    }
  });

  $('.update').on('click', function() {
    var id = $(this).attr('id');
    $.ajax({
      url: '/edit/confirm',
      method: PUT,
      data: {id: id},
      success: function(data, status, obj) {
        console.log("success");
      },
      error: function(data, status, odj) {
        console.log("failure");
      }
    });
  });

  // $('.delete').on('click', function() {
  //   console.log($(this).attr('id'));
  //   var id = $(this).attr('id');
  //   $('"#' + id + '"').remove();
  // });

});
