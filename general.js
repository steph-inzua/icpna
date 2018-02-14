$(document).ready(function() {
  $('.nav-open').on("click", function(e) {
  e.preventDefault();
  $(this).toggleClass('nav-close');
  $('#navigation').toggleClass('nav-list-open');
 

  });

   $('a.suave').on('click',function (e) {
        e.preventDefault();
        var target = this.hash,
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, function () {
            window.location.hash = target;
        });
    });

   $('#button-form').on('click', function(){
    var $conte = $('#hv_pg2form');
    var $body = $('body');

    if($conte.hasClass('hv_pg2form_view')){
      $conte.removeClass('hv_pg2form_view');
      $body.removeClass('hv_movil');
     }else{
      $conte.addClass('hv_pg2form_view');
      $body.addClass('hv_movil');
     }
   });

   // fixed
   // on scroll move the sidebar
  var stickySidebar = $('.sticky');

  const mq = window.matchMedia( "(min-width: 768px)" );

  if (stickySidebar.length > 0) { 
    var stickyHeight = stickySidebar.height(),
        sidebarTop = stickySidebar.offset().top;
  }

  if (mq.matches) {

    $(window).scroll(function () {
    if (stickySidebar.length > 0) { 
      var scrollTop = $(window).scrollTop();
              
      if (sidebarTop < scrollTop) {
        stickySidebar.css('top', scrollTop - sidebarTop);

        // stop the sticky sidebar at the footer to avoid overlapping
        var sidebarBottom = stickySidebar.offset().top + stickyHeight,
            stickyStop = $('.main-content').offset().top + $('.main-content').height();
        if (stickyStop < sidebarBottom) {
          var stopPosition = $('.main-content').height() - stickyHeight;
          stickySidebar.css('top', stopPosition);
        }
      }
      else {
        stickySidebar.css('top', '0');
      } 
    }
  });
  };


   $(window).resize(function () {
    if (stickySidebar.length > 0) { 
      stickyHeight = stickySidebar.height();
    }
  });

  $('.gracias__cerrar').on('click', function(){
    $('.gracias').fadeOut(200);
  });

  formulario();
  sedes();
}); 


function formulario(){

    $('input[type="text"], input[type="tel"], textarea')
      .on('focus',function(){
        $(this).removeClass('error');
      })
      .on('blur',function(){
        $(this).removeClass('error');
      });

    $('input').keyup(function () {
        var valid = $(this).attr('valid');
        var inp = $(this);
        switch (valid) {
            case 'num':
                inp.val(inp.val().replace(/[^0-9]/g, function () { return ''; }));
                break;
            case 'email':
                inp.val(inp.val().replace(/[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ/@/./_/-]/g, function () { return ''; }));
                break;
        }
    });

    var blockForm=true;
    $('form').on('submit', function(e){
        e.preventDefault();
        var error=0,
            f=$(this),
            validCorreo = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;;

        $.each(f.find('input, select'), function(index, val) {
            $.trim($(this).val())==='' && $(this).attr('no')===undefined && $(this).addClass('error') && error++;
        });

        //$.trim($('#inputTerminos').val())==='' && $('.formulario__input--check').addClass('error') && error++;
        //$.trim(f.find('#dni').val()).length<8 && $('#dni').addClass('error') && error++ ;
        //!validCorreo.test($('#email').val()) && $('#email').addClass('error') && error++;
        console.log(error);
        if(error==0&&blockForm){
            blockForm=false;
            $.ajax({ url: 'process.php', type: 'POST', dataType: 'json', data: f.serializeArray() })
                .done(function(data) {
                    if(data.rpta==='ok') {
                        $('input[name="nombres"], input[name="apellidos"], input[name="numerodocumento"], input[name="celular"], input[name="correo"]').val('');
                        $('.gracias').fadeIn(350);
                    }
                });
        }
    });
}

function sedes(){
  var sedes = [
    {'titulo':'Lima Centro', 'direccion':'Jr. Cuzco N° 446', 'horario':'Lunes a Viernes de 7am a 8pm <br>Sábados de 8am a 5pm', 'telefonoclick':'017067000', 'telefono':'(01)706-7000', 'lat':'-12.051438 ', 'lng':'-77.031849' },
    {'titulo':'San Miguel', 'direccion':'Av. La Marina N° 2469', 'horario':'Lunes a Viernes de 7am a 8pm <br>Sábados de 8am a 5pm', 'telefonoclick':'017067000', 'telefono':'(01)706-7000', 'lat':'-12.0783677', 'lng':'-77.0912865' },
    {'titulo':'Miraflores', 'direccion':'Av. Angamos Oeste N° 160', 'horario':'Lunes a Viernes de 7am a 8pm <br>Sábados de 8am a 5pm', 'telefonoclick':'017067000', 'telefono':'(01)706-7000', 'lat':'-12.1135629', 'lng':'-77.0325009' },
    {'titulo':'La Molina', 'direccion':'Av. Javier Prado Este N° 4625', 'horario':'Lunes a Viernes de 7am a 8pm <br>Sábados de 8am a 5pm', 'telefonoclick':'017067000', 'telefono':'(01)706-7000', 'lat':'-12.0834653', 'lng':'-76.9749053' },
    {'titulo':'', 'direccion':'', 'horario':'', 'telefonoclick':'', 'telefono':'', 'iframe':'' }
  ];


  $('#sede').on('change', function(){
    var id = parseInt($('#sede').find('option:selected').data('id'));
    initMap(sedes[id]['lat'], sedes[id]['lng'])
    $('#textmapa__titulo').html(sedes[id]['titulo']);
    $('#textmapa__direccion').html(sedes[id]['direccion']);
    $('#textmapa__horario').html(sedes[id]['horario']);
    $('#textmapa__telefono').attr('href',sedes[id]['telefonoclick']).html(sedes[id]['telefono']);
  });

}
/*
function initMap() {
        var uluru = {lat: '-12.051438 ', lng:'-77.031849' };
        var map = new google.maps.Map(document.getElementById('textmapa__mapa'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }*/
function initMap() {
        var latlng = new google.maps.LatLng(39.305, -76.617);
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: latlng
        });
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
      }

