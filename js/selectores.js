(function($) {
    var tablas = [];
    var direccion = "";
    var nivel = "";
    $.fn.programa = function() {
		
        var programa_selector = "";
        $.ajax({
           url: "programas.json",
            type: "GET",
            dataType: "json",
            before: function() {
				
            },
            success: function(response) {
				
                programa_selector = programa_selector + "<option value='0'>Programa</option>";
                $.each(response, function(i, dato_capa1) {

                    $.each(dato_capa1, function(j, dato_capa2) {

                        programa_selector = programa_selector + "<option value='" + dato_capa2.Tipo + "'>" + dato_capa2.Tipo + "</option>";
                    });
                });
				
                $("#programa").html(programa_selector);
            }
        });

    };

    $.fn.sede = function(valor) {
        var programa_selector = "";

        $.ajax({
            url: "programas.json",
            type: "GET",
            dataType: "json",
            before: function() {

            },
            success: function(response) {
                programa_selector = programa_selector + "<option value='0'>Sede</option>";
                $.each(response, function(i, dato_capa1) {

                    $.each(dato_capa1, function(j, dato_capa2) {

                        if (dato_capa2.Tipo === valor) {

                            $.each(dato_capa2.Sedes, function(k, dato_capa3) {

                                programa_selector = programa_selector + "<option value='" + dato_capa3.Nombre + "' data-padre='" + valor + "'>" + dato_capa3.Nombre + "</option>";
                            });
                        }

                    });

                });

                $("#sedeciudad").html(programa_selector);

            }

        });
    };

    $.fn.nivel = function(valor, valor_padre) {
		$(".direccion_seleccionado").html("");
        var programa_selector = "";
        $.ajax({
            url: "programas.json",
            type: "GET",
            dataType: "json",
            before: function() {},
            success: function(response) {
				
				if(valor_padre==="Para Niños"){
               	 programa_selector = programa_selector + "<option value='0'>Edad</option>";
				}else{
				 programa_selector = programa_selector + "<option value='0'>Nivel</option>";
				}
                $.each(response, function(i, dato_capa1) {
					

                    $.each(dato_capa1, function(j, dato_capa2) {

                        if (dato_capa2.Tipo === valor_padre) {

                            $.each(dato_capa2.Sedes, function(k, dato_capa3) {


                                if (dato_capa3.Nombre === valor) {

                                    direccion = dato_capa3.Direccion;
                                    $(".sede_seleccionado").html(dato_capa3.Nombre);
                                    $(".direccion_seleccionado").html(direccion);
                                    $.each(dato_capa3.Nivel, function(l, dato_capa4) {


                                        programa_selector = programa_selector + "<option value='" + dato_capa4.Detalle.Nombre + "' data-padre='" + valor + "' data-padre_top='" + valor_padre + "' >" + dato_capa4.Detalle.Nombre + "</option>";

                                    });



                                }

                                $("#nivel").html(programa_selector);
                            });
                        }

                    });


                });



            }


        });
    };

    $.fn.curso = function(valor, valor_padre, valor_padre_top) {

        var programa_selector = "";
        $.ajax({
            url: "programas.json",
            type: "GET",
            dataType: "json",
            before: function() {

            },
            success: function(response) {
                
				if(valor_padre_top==="Para Niños"){
               	 programa_selector = programa_selector + "<option value='0'>Frecuencia</option>";
				}else{
				 programa_selector = programa_selector + "<option value='0'>Frecuencia</option>";
				}
				
				
                $.each(response, function(i, dato_capa1) {

                    $.each(dato_capa1, function(j, dato_capa2) {

                        if (dato_capa2.Tipo === valor_padre_top) {

                            $.each(dato_capa2.Sedes, function(k, dato_capa3) {


                                if (dato_capa3.Nombre === valor_padre) {




                                    $.each(dato_capa3.Nivel, function(l, dato_capa4) {

                                        nivel = dato_capa4.Detalle.Nombre;

                                        if (dato_capa4.Detalle.Nombre === valor) {
                                             $(".diario_seleccionado").html(nivel);
                                            $.each(dato_capa4.Detalle.Curso, function(m, dato_capa5) {


                                                programa_selector = programa_selector + "<option value='" + dato_capa5.Nombre + "' data-padre='" + valor + "' data-padre_top='" + valor_padre + "' data-padre_top_top='" + valor_padre_top + "' >" + dato_capa5.Nombre + "</option>";

                                            });


                                        }
                                    });



                                }

                                $("#curso").html(programa_selector);
                            });
                        }

                    });


                });



            }


        });
    };


    $.fn.resultados = function(valor, valor_padre, valor_padre_top, valor_padre_top_top) {
		
		if(valor_padre_top_top ==="Para Niños"){
			 $(".opcion_nivel").html("Edad");
			}else{
			  $(".opcion_nivel").html("Nivel");
			}
        var programa_selector = "";
        $.ajax({
            url: "programas.json",
            type: "GET",
            dataType: "json",
            before: function() {

            },
            success: function(response) {
                tablas = [];
                programa_selector = programa_selector + "<option value='0'>Curso</option>";
                $.each(response, function(i, dato_capa1) {

                    $.each(dato_capa1, function(j, dato_capa2) {

                        if (dato_capa2.Tipo === valor_padre_top_top) {

                            $.each(dato_capa2.Sedes, function(k, dato_capa3) {


                                if (dato_capa3.Nombre === valor_padre_top) {

                                    $.each(dato_capa3.Nivel, function(l, dato_capa4) {



                                        if (dato_capa4.Detalle.Nombre === valor_padre) {

                                            $.each(dato_capa4.Detalle.Curso, function(m, dato_capa5) {
												var div_word = valor.split(" ");
											    
												if(valor_padre_top_top ==="Para Niños"){
													$(".nivel_seleccionado").html("Clases "+div_word[1]);
												  }else{
												     $(".nivel_seleccionado").html(valor);
												  } 
												
												
                                                if (dato_capa5.Nombre === valor) {

                                                    tablas.push(dato_capa5.Detalle);

                                                }

                                            });

                                        }
                                    });

                                }


                            });
                        }

                    });


                });



            },
            complete: function() {
                $(".calendario-list").fadeIn(350, "swing");
                var lista_manana = "";
                var lista_tarde = "";
                var lista_noche = "";
				var lista_diario_regular = "";
				var lista_diario_s ="";
			
                $.each(tablas, function(i, e) {

                    $(".precio").html(e.Regular.Costo);
					$(".detalle_especial").html(e.Regular.Detalle);
					
					if(e.Regular.titulo === undefined){
						$(".pos-titulo").html("");
						
					}else{
						
						$(".pos-titulo").html(e.Regular.titulo);
					}
					
				try{
					if(typeof e.Regular.Mañana !== 'undefined'){
						$(".op1").show();
						$.each(e.Regular.Mañana, function(a, b) {
	
							lista_manana = lista_manana + "<li>" + b.horario + "</li>";
						});
						$("#resultado_manana").html(lista_manana);
					}else{
						$(".op1").hide();
					}
					
					if(typeof e.Regular.Tarde !== 'undefined'){
						$(".op2").show();
						$.each(e.Regular.Tarde, function(c, d) {
	
							lista_tarde = lista_tarde + "<li>" + d.horario + "</li>";
						});
						$("#resultado_tarde").html(lista_tarde);
					}else{
						$(".op2").hide();
					}
					
					if(typeof e.Regular.Noche !== 'undefined'){
						$(".op3").show();
						$.each(e.Regular.Noche, function(e, f) {
	
							lista_noche = lista_noche + "<li>" + f.horario + "</li>";
						});
						$("#resultado_noche").html(lista_noche);
					}else{
						$(".op3").hide();
					}
					//case lima
					
					if(typeof e.Regular.TardeMJ !== 'undefined'){
						$(".op4").show();
						$.each(e.Regular.TardeMJ, function(g, h) {
	
							lista_diario_regular = lista_diario_regular + "<li>" + h.horario + "</li>";
						});
						$("#resultado_tmj").html(lista_diario_regular);
					}else{
						
						$(".op4").hide();
					}
					
					if(typeof e.Regular.TardeS !== 'undefined'){
						$(".op5").show();
						$.each(e.Regular.TardeS, function(i, j) {
	
							lista_diario_s = lista_diario_s + "<li>" + j.horario + "</li>";
						});
						$("#resultado_ds").html(lista_diario_s);
					}else{
						$(".op5").hide();
					}
				}catch(err){
				  console.log(err);
				}	

                });
            }
        });
    };


})(jQuery);

$(document).ready(function() {
    'use strict';
    var $programa = $("#programa");
    var $sede = $("#sedeciudad");
    var $nivel = $("#nivel");
    var $curso = $("#curso");
	
    var $resultados = $("#resultados");
    var $mostrar_informacion = $("#mostrar_informacion");
    $programa.programa();
    var state1 = false;
	var state2 = false;
	var state3 = false;
	var state4 = false;
	
	
    $programa.on("change", function() {
		
		$sede.html("<option value='0'>Sede</option>");
			if($(this).val() ==="Para Niños"){
				$nivel.html("<option value='0'>Edad</option>");
				$curso.html("<option value='0'>Frecuencia</option>");
				
				$('#hvFormicpna #programa [value="Programa para Niños"]').attr('selected', true).change();
				$('#hvFormicpna #programa [value="Programa para Jóvenes y Adultos"]').attr('selected', false);
			}else{
				$nivel.html("<option value='0'>Nivel</option>");
				$curso.html("<option value='0'>Frecuencia</option>");
				
				$('#hvFormicpna #programa [value="Programa para Jóvenes y Adultos"]').attr('selected', true).change();
				$('#hvFormicpna #programa [value="Programa para Niños"]').attr('selected', false);
			}
		
		state2 = false;
		state3 = false;
		state4 = false;
        $sede.sede($(this).val());
        $(".detalles").hide();
		
		 state1 = true;
    });

    $sede.on("change", function() {
		
		
        var padre = $(this).find(':selected').data('padre');
		if(padre==="Para Niños"){
				$nivel.html("<option value='0'>Edad</option>");
				$curso.html("<option value='0'>Frecuencia</option>");
			}else{
				$nivel.html("<option value='0'>Nivel</option>");
				$curso.html("<option value='0'>Frecuencia</option>");
			}
		$(".detalles").hide();
        $nivel.nivel($(this).val(), padre);
		
		
		state3 = false;
		state4 = false;
		state2 = true;
    });

    $nivel.on("change", function() {
		
		
        var padre = $(this).find(':selected').data('padre');
        var padre_top = $(this).find(':selected').data('padre_top');
		
		if(padre==="Para Niños"){
			$curso.html("<option value='0'>Frecuencia</option>");
		}else{			
			$curso.html("<option value='0'>Frecuencia</option>");
		}
		
        $curso.curso($(this).val(), padre, padre_top);
        $(".detalles").hide();
		
		state4 = false;
		state3 = true;
    });

    $curso.on("change", function() {
        var padre = $(this).find(':selected').data('padre');
        var padre_top = $(this).find(':selected').data('padre_top');
        var padre_top_top = $(this).find(':selected').data('padre_top_top');

        $resultados.resultados($(this).val(), padre, padre_top, padre_top_top);
        $(".detalles").hide();
		state4 = true;
    });

    $mostrar_informacion.click(function(e) {
        e.preventDefault();
		            
		if(state1===true && state2===true && state3===true && state4===true){
			$(".detalles").fadeIn(350, "swing");
		}else{
			alert("Complete todos los selectores");
		}
        
		
    });

});