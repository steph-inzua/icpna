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
  

  $('.gracias__cerrar').on('click', function(){
    $('.gracias').fadeOut(200);
  });

  $('.form__select select').on('change', function(){
    var v = $(this).val();
    $(this).parent().find('strong').html(v);
  });

  formulario();
  sedes();



   // on scroll move the sidebar
  var stickySidebar = $('.sticky');

  const mq = window.matchMedia( "(min-width: 1025px)" );

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
            stickyStop = $('.content').offset().top + $('.content').height();
        if (stickyStop < sidebarBottom) {
          var stopPosition = $('.content').height() - stickyHeight;
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

        if (!$("#pauta").is(":checked")) {
        	$("#pauta").parent("div").children("label").addClass("error");
			error++;
           return false;
       }else{
		   error=0;
		   }
   
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
    {'titulo':'Lima Centro', 'direccion':'Jr. Cuzco N° 446', 'horario':'Lunes a Viernes de 7:00 a.m. a 8:00 p.m. <br>Sábados de 8:00 a.m. a 5:00 p.m.', 'telefonoclick':'017067000', 'telefono':'(01)706-7000', 'lat':'-12.051540254965804 ', 'lng':'-77.03003883361816' },
    {'titulo':'San Miguel', 'direccion':'Av. La Marina N° 2469', 'horario':'Lunes a Viernes de 7:00 a.m. a 8:00 p.m. <br>Sábados de 8:00 a.m. a 5:00 p.m.', 'telefonoclick':'017067000', 'telefono':'(01)706-7000', 'lat':'-12.07836476695741', 'lng':'-77.08889722824097' },
    {'titulo':'Miraflores', 'direccion':'Av. Angamos Oeste N° 160', 'horario':'Lunes a Viernes de 7:00 a.m. a 8:00 p.m. <br>Sábados de 8:00 a.m. a 5:00 p.m.', 'telefonoclick':'017067000', 'telefono':'(01)706-7000', 'lat':'-12.113550355123868', 'lng':'-77.03017830848694' },
    {'titulo':'La Molina', 'direccion':'Av. Javier Prado Este N° 4625', 'horario':'Lunes a Viernes de 7:00 a.m. a 8:00 p.m. <br>Sábados de 8:00 a.m. a 5:00 p.m.', 'telefonoclick':'017067000', 'telefono':'(01)706-7000', 'lat':'-12.083337608595743', 'lng':'-76.97258591651917' },
    {
        'titulo':'Lima Norte', 
        'direccion':'Av. El Pacífico N° 477', 
        'horario':'Lunes a Viernes de 7:00 a.m. a 8:00 p.m. <br>Sábados de 8:00 a.m. a 5:00 p.m.', 
        'telefonoclick':'01706-7000', 
        'telefono':'(01)706-7000', 
        'lat':'-11.996487424317666', 
        'lng':'-77.06128120422363'
    },
    {
        'titulo':'Surco', 
        'direccion':'Cl. Domingo Tristán y Moscoso esq. Cl. Manco Inca II, Urb. Los Próceres', 
        'horario':'Lunes a Viernes de 7:00 a.m. a 8:00 p.m. <br>Sábados de 8:00 a.m. a 5:00 p.m.', 
        'telefonoclick':'01706-7000', 
        'telefono':'(01)706-7000',
        'lat':'-12.152642985754792', 
        'lng':'-76.98815613985062'
    },
    {
        'titulo':'Iquitos', 
        'direccion':'Cl. Pevas N° 487, Maynas, Loreto ', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'065235186', 
        'telefono':'(065) 235186', 
        'lat':'-3.741810580142426', 
        'lng':'-73.2504415512085'
    },
    {
        'titulo':'Pucallpa', 
        'direccion':'Jr. Andrés Rázuri N° 244, distrito de Callería', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'061577229', 
        'telefono':'(061) 577229', 
        'lat':'-8.379349066427713', 
        'lng':'-74.5387601852417'
    },
    {
        'titulo':'Chimbote', 
        'direccion':'Urb. Mariscal Luzuriaga, a media cuadra de la Catedral de Nuevo Chimbote', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'043586021', 
        'telefono':'(043) 586021', 
        'lat':'-9.125597116209223', 
        'lng':'-78.5273551940918'
    },
    {
        'titulo':'Huaraz', 
        'direccion':'Jr. Mariano Melgar N° 419 – 429', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'043421640', 
        'telefono':'(043) 421640', 
        'lat':'-9.517740359497587', 
        'lng':'-77.52800703048706'
    },
    {
        'titulo':'Abancay', 
        'direccion':'Cl. Miscabamba cruce con Av. Núñez (a una cuadra de Corte Superior de Justicia de Apurímac) ', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'083200163', 
        'telefono':'(083) 200163', 
        'lat':'-13.635818656924645', 
        'lng':'-72.87677094340324'
    },
    {
        'titulo':'Ica', 
        'direccion':'Cl. Baltazar Caravedo N° 244, Urb. Luren ', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'056221206', 
        'telefono':'(056) 221206', 
        'lat':'-14.076037560520163', 
        'lng':'-75.72423756122589'
    },
    {
        'titulo':'Cerro de pasco', 
        'direccion':'Jr. Columna Pasco N° 204, Urb. San Juan Pampa', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'063421294', 
        'telefono':'(063) 421294', 
        'lat':'-10.665890280761536', 
        'lng':'-76.25208020210266'
    },
    {
        'titulo':'Chincha', 
        'direccion':'Cl. Grau N° 541, Distrito de Chincha Alta', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'056261899', 
        'telefono':'(056) 261899', 
        'lat':'-13.422240814845496', 
        'lng':'-76.1333441734314'
    },
    {
        'titulo':'Andahuaylas', 
        'direccion':'Cl. Juan Antonio Trelles N° 513', 
        'horario':'Lunes a viernes: 8:00 a.m.- 12:30 p.m. y 4:00 p.m.- 8:00 p.m.<br>Sábados: 8:00 a.m.- 1:30 p.m.', 
        'telefonoclick':'083205061', 
        'telefono':'(083) 205061', 
        'lat':'-13.654786179618782', 
        'lng':'-73.3879691362381'
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