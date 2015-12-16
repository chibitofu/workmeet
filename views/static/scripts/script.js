$(document).ready(function() {

  function getLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('Geolocation is not supported');
    }
  }

  function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    $('#lat').val(initialLoc);
    $('#lon').val(position.coords.longitude);
  }

  $('#foodButt').on('click', function(e) {
    e.preventDefault();
    if( $('#newFood').val() ) {
        $('#food').append('<div class="newTag">' + $('#newFood').val() + '</div>' + ' ');
        $('#food').append( '<input class="food" type="hidden" name="food" value="' + $('#newFood').val() + '" >');
        $('#newFood').val('');
    }
  });

  $('#drinkButt').on('click', function(e) {
    e.preventDefault();
    if( $('#newDrink').val() ) {
        $('#drink').append('<div class="newTag">' + $('#newDrink').val() + '</div>' + ' ');
        $('#drink').append( '<input class="drink" type="hidden" name="drink" value="' + $('#newDrink').val() + '" >');
        $('#newDrink').val('');
    }
  });

  $('#tagButt').on('click', function(e) {
    e.preventDefault();
    if( $('#newTag').val() ) {
        $('#tag').append('<div class="newTag">' + $('#newTag').val() + '</div>' + ' ');
        $('#tag').append( '<input class="tag" type="hidden" name="tag" value="' + $('#newTag').val() + '" >');
        $('#newTag').val('');
    }
  });

  $('#accordion').accordion({
    collapsible: true,
    header: "> div > .sortable",
    heightStyle: "content"
  }).sortable({
    axis: "y",
    handle: "h3",
    placeholder: "ui-state-highlight",
    stop: function(event, ui) {
      ui.item.children("h3").triggerHandler("focusout");
      $(this).accordion('refresh');
    }
  });

});
