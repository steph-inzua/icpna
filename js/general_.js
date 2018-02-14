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

    /*$(window).scroll(function () {
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
  });*/
  };


   $(window).resize(function () {
    if (stickySidebar.length > 0) { 
      stickyHeight = stickySidebar.height();
    }
  });

  $('.gracias__cerrar').on('click', function(){
    $('.gracias').fadeOut(200);
  });

  $('.form__select select').on('change', function(){
    var v = $(this).val();
    $(this).parent().find('strong').html(v);
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
        if(error==0&&blockForm){
            blockForm=false;
            $.ajax({ url: 'process.php', type: 'POST', dataType: 'json', data: f.serializeArray() })
                .done(function(data) {
                    if(data.rpta==='ok') {
                      blockForm=true;
                        $('#hv_pg2form').removeClass('hv_pg2form_view');
                        $('body').removeClass('hv_movil');
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
    {
        'titulo':'Lima Norte', 
        'direccion':'Av. El Pacífico N° 477', 
        'horario':'Lunes a Viernes de 7am a 8pm <br>Sábados de 8am a 5pm', 
        'telefonoclick':'01706-7000', 
        'telefono':'(01)706-7000', 
        'lat':'-11.9969008', 
        'lng':'-77.0627617'
    },
    {
        'titulo':'Surco', 
        'direccion':'Cl. Domingo Tristán y Moscoso esq. Cl. Manco Inca II, Urb. Los Próceres', 
        'horario':'Lunes a Viernes de 7am a 8pm <br>Sábados de 8am a 5pm', 
        'telefonoclick':'01706-7000', 
        'telefono':'(01)706-7000',
        'lat':'-12.1525551', 
        'lng':'-76.9902093'
    },
    {
        'titulo':'Iquitos', 
        'direccion':'Cl. Pevas N° 487, Maynas, Loreto ', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'065235186', 
        'telefono':'(065) 235186', 
        'lat':'-3.746155', 
        'lng':'-73.2473985'
    },
    {
        'titulo':'Pucallpa', 
        'direccion':'Jr. Andrés Rázuri N° 244, distrito de Callería', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'061577229', 
        'telefono':'(061) 577229', 
        'lat':'-8.3792854', 
        'lng':'-74.5407605'
    },
    {
        'titulo':'Chimbote', 
        'direccion':'Urb. Mariscal Luzuriaga, a media cuadra de la Catedral de Nuevo Chimbote', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'043586021', 
        'telefono':'(043) 586021', 
        'lat':'-9.1257094', 
        'lng':'-78.5280394'
    },
    {
        'titulo':'Huaraz', 
        'direccion':'Jr. Mariano Melgar N° 419 – 429', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'043421640', 
        'telefono':'(043) 421640', 
        'lat':'-9.5196973', 
        'lng':'-77.5297403'
    },
    {
        'titulo':'Abancay', 
        'direccion':'Cl. Miscabamba cruce con Av. Núñez (a una cuadra de Corte Superior de Justicia de Apurímac) ', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'083200163', 
        'telefono':'(083) 200163', 
        'lat':'-13.6358561', 
        'lng':'-72.8777372'
    },
    {
        'titulo':'Ica', 
        'direccion':'Cl. Baltazar Caravedo N° 244, Urb. Luren ', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'056221206', 
        'telefono':'(056) 221206', 
        'lat':'-14.0762551', 
        'lng':'-75.7246711'
    },
    {
        'titulo':'Cerro de pasco', 
        'direccion':'Jr. Columna Pasco N° 204, Urb. San Juan Pampa', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'063421294', 
        'telefono':'(063) 421294', 
        'lat':'10.6651961', 
        'lng':'76.2563519,17'
    },
    {
        'titulo':'Chincha', 
        'direccion':'Cl. Grau N° 541, Distrito de Chincha Alta', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'056261899', 
        'telefono':'(056) 261899', 
        'lat':'-13.4226768', 
        'lng':'-76.1342077'
    },
    {
        'titulo':'Andahuaylas', 
        'direccion':'Cl. Juan Antonio Trelles N° 513', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'083205061', 
        'telefono':'(083) 205061', 
        'lat':'-13.6547969', 
        'lng':'-73.3883406'
    }
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

function initMap(latitud, longitud) {
  if(latitud!==undefined){
    var latlng = new google.maps.LatLng(latitud, longitud);
  } else{
      var latlng = new google.maps.LatLng('-12.051438','-77.031849');
  } 
        var map = new google.maps.Map(document.getElementById('mapa'), {
          center: latlng,
          zoom: 16
        });

        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
      }