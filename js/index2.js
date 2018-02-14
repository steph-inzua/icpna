 
 
jQuery(function($) {
      $('#programas').waypoint(function() {
            $('#programas').toggleClass('entrar');
      },
      
  {
  offset: '50%',
  triggerOnce: true
  });
});

jQuery(function($) {
  $('#certificacion').waypoint(function() {
        $('#certificacion').toggleClass('entrar');
  },
      
  {
  offset: '50%',
  triggerOnce: true
  });
});

jQuery(function($) {
  $('#beneficios-certificacion').waypoint(function() {
        $('#beneficios-certificacion').toggleClass('entrar');
  },
      
  {
  offset: '50%',
  triggerOnce: true
  });
});




$(window).scroll(function() {

  $(".block,h5").each(function(i) {
    var bottom_of_object = $(this).offset().top + $(this).outerHeight();
    var bottom_of_window = $(window).scrollTop() + $(window).height();
    
    /* If the object is completely visible in the window, fade it in */
    if (bottom_of_window > bottom_of_object) {
      $(this).css({ opacity: "1"}).css({ transform: "scale(1)"});
      $('h5').addClass('reed');
    /* Or hide  (esconder) */ 
    } else {
      $(this).css({ opacity: "0"}).css({ transform: "scale(.1)"});
    }
  });
});
