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

  $('#foodButt').on('click', function(e) {
    e.preventDefault();
    if( $('#newFood').val() ) {
      if ( !$.trim($('#food').html() ).length ) {
        $('#food').append( $('#newFood').val() );
      } else {
        $('#food').append( ", " + $('#newFood').val() );
      }
      $('#food').append( '<input class="food" type="hidden" name="food" value="' + $('#newFood').val() + '" >');
      $('#newFood').val('');
    }
  });

  $('#drinkButt').on('click', function(e) {
    e.preventDefault();
    if( $('#newDrink').val() ) {
      if ( !$.trim($('#drink').html() ).length ) {
        $('#drink').append( $('#newDrink').val() );
      } else {
        $('#drink').append( ", " + $('#newDrink').val() );
      }
      $('#drink').append( '<input class="drink" type="hidden" name="drink" value="' + $('#newDrink').val() + '" >');
      $('#newDrink').val('');
    }
  });

  $('#tagButt').on('click', function(e) {
    e.preventDefault();
    if( $('#newTag').val() ) {
      if ( !$.trim($('#tag').html() ).length ) {
        $('#tag').append( $('#newTag').val() );
      } else {
        $('#tag').append( ", " + $('#newTag').val() );
      }
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
