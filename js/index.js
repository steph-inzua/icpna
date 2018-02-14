 
 
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
  
 


 
var dom = document;
var mq = window.matchMedia( "(min-width: 769px)" );

if (mq.matches) {
dom.addEventListener("DOMContentLoaded", documentDOMContentLoaded);

var elementosFijar;

function documentDOMContentLoaded( evt ){
  elementosFijar = dom.querySelectorAll( "[data-fijar]" );
  fijar();

  //window.addEventListener( "scroll", windowScroll );
  window.addEventListener( "resize", windowResize);
  requestAnimationFrame( animacionCuadro );
  //animacionCuadro();
}

function animacionCuadro( timestamp ) {
  corregirPosiciones();
  requestAnimationFrame(animacionCuadro);
}

function fijar(){
  elementosFijar.forEach( elem => {
    elem.style.transform = "none";
    elem.oy = posicionY( elem );
    var c = elem.parentNode;
    //console.debug( c,  elem.oy );
  });
}

function corregirPosiciones(){
  var sy = window.pageYOffset;
  var ay = window.innerHeight;
  
  elementosFijar.forEach( elem => {
    var c = elem.parentNode;
    //console.debug( c,  elem.oy );
    if( esVisible(c) ){
      var ty = elem.clientHeight;
      var dy = ( sy + (( ay - ty ) / 2 )) - elem.oy;
      //console.debug( ty , dy,  elem.oy );
      elem.style.transform = "translateY(" + dy + "px)";
      
    }
  });
}

function windowResize( evt ){
  fijar();
}

function esVisible( elemento ){
  var sy = window.pageYOffset;
  var area = window.innerHeight;

  var py = 0;
  var ancestro = elemento.offsetParent;
  if( ancestro ){
    do {
      if(!isNaN(ancestro.offsetTop)) {
        py += ancestro.offsetTop;
      }
    } while( ancestro = ancestro.offsetParent )
  }
  
  py += elemento.offsetTop;
  var ms = elemento.offsetHeight * 1;
  if( py > sy - ms && py < sy + area){
    return true;
  }
  else{
    return false;
  }
}

function posicionY( elemento ){
  var py = 0; 
  var ancestro = elemento.offsetParent;

    do {
      if(!isNaN(ancestro.offsetTop)) {
        py += ancestro.offsetTop;
      }
    } while( ancestro = ancestro.offsetParent )
  
  py += elemento.offsetTop;
  return py;
}

};



/*
var lastScrollTop = 0;
var secciones = $(".beneficios-item , #inicio");

$(window).scroll(function(event){
  
      var st = $(this).scrollTop();
  
      if (st < 100){
            $("#btnTop").removeClass('active');
      } else {
            if (st > lastScrollTop){
                  $("#btnTop").removeClass('active');
            } else {
                  $("#btnTop").addClass('active');
            }   
      }
    lastScrollTop = st;


    //agregando
    var anchoViewport = window.innerWidth || document.documentElement.clientWidth;
    var alturaViewport = window.innerHeight || document.documentElement.clientHeight;

    $.each( secciones, function( index, elem ){
        var caja = elem.getBoundingClientRect();
        //console.log( caja );
        if( caja.top >= alturaViewport * -0.5 && caja.top <= alturaViewport * 0.5 ){
            $( ".suave.pop" ).removeClass( "activo" );
            var id = elem.id;
            //console.log( id, caja.top,$( document ).scrollTop() + alturaViewport );
            $( ".suave.pop[href='#" + id + "']" ).addClass( "activo" );
            return;
        }
    });
});*/

 
 