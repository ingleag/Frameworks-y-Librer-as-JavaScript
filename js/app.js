/*--------------------- Variables de Instancia -------------------------------*/
var minutos=2;
var segundos=0;
var time=0;
var inter=0;
var fila = 0;
var titulo = 0;

var movimientos=0;
var marcador=0;
var tmpmarcador=0;
var eliminar=0;
var Horizontal=0;
var Vertical=0;
var nuevosDulces=0;
var colum=["","","","","","",""];
var rest=["","","","","","",""];
var maximo=0;
var matriz=0;
var contadorTotal=0;
var espera=0;

/*--------------------- FIN Variables de Instancia -------------------------------*/


// Evento Click botón de Inicio del juego
$(".btn-reinicio").click(function(){
	fila = 0;
	movimientos=0;
	marcador=0;
	clearInterval(eliminar);
	clearInterval(nuevosDulces);
	clearInterval(time);
	clearInterval(inter);
	minutos=2;
	segundos=0;
	borrar();
	$("#score-text").html("0");
	$("#movimientos-text").html("0");
	$(this).html("Reiniciar")
	$(".panel-score").css("width","25%");
	$(".panel-tablero").show();
	$(".time").show();

	clearInterval(time);
	inter=setInterval(function(){
		llenar()
	},300);
});

jQuery.fn.swap=function(b){
	b=jQuery(b)[0];
	var a=this[0];
	var t=a.parentNode.insertBefore(document.createTextNode(''),a);
	b.parentNode.insertBefore(a,b);
	t.parentNode.insertBefore(b,t);
	t.parentNode.removeChild(t);
	return this;
};

/*-------------------------- ANIMACIÓN EN EL TITULO --------------------------*/
function aleatorio(inferior, superior){
  numPosibilidades = superior - inferior;
  aleat = Math.random() * numPosibilidades;
  aleat = Math.floor(aleat);
  return parseInt(inferior) + aleat;
}
function colorAleatorio(){
  return "rgb(" + aleatorio(0,255) + "," + aleatorio(0,255) + "," + aleatorio(0,255) + ")";
}

titulo=setInterval(function(){
		$('.main-titulo').css('color',colorAleatorio());
	},150);
titulo.show();
/*-------------------------- FIN ANIMACIÓN EN EL TITULO ----------------------*/

/*-------------------------- MANEJO DE TIEMPO --------------------------------*/
function timer(){
  if (segundos == 0) {
    minutos--;
    segundos = 59;
  }else{
    segundos--
  }
  if (minutos == 0 && segundos == 0) {
    // Finalizo el juego
	alert('Puntaje: ' + $('#score-text').html() + '. Movimientos: ' + $('#movimientos-text').html());

	$(".btn-reinicio").click()
  }

  var tiempo = '';
  if (minutos < 10) {
    tiempo = tiempo + '0';
  }
  tiempo = tiempo + String(minutos) + ':';
  if (segundos < 10) {
    tiempo = tiempo + '0';
  }
  tiempo = tiempo + String(segundos);
  $("#timer").html(tiempo);
};
/*-------------------------- FIN MANEJO DE TIEMPO ----------------------------*/

/*------------------ FUNCION LLENAR ESPACIOS EN BLANCO DE MATRIZ -------------*/
function llenar(){
  fila++;
  $(".elemento").draggable();
  if(fila < 8){
    for(var x=1;x<8;x++){
      if($(".col-" + x).children("img:nth-child(" + fila + ")").html()==null){
        $(".col-" + x).prepend("<img src=image/" + (Math.floor(Math.random() * 4) + 1) + ".png class='elemento'/>").css("justify-content","flex-start");
      }
    }
  }
  if(fila == 8){
    clearInterval(inter);
    time=setInterval(function(){
      timer()
    },1000);
    identificar();
    eliminar = setInterval(function(){
      eliminarHorver()
    },150);
  };
};

/*----------------------------- FUNCION RETURN HORIZONTAL --------------------*/
function buscarHorizontal(){
  var buscarh = 0;
  for(var j=1;j<8;j++){
    for(var k=1;k<6;k++){
      var col1 = $(".col-" + k).children("img:nth-last-child(" + j + ")").attr("src");
			var col2 = $(".col-" + (k + 1)).children("img:nth-last-child(" + j + ")").attr("src");
			var col3 = $(".col-" + (k + 2)).children("img:nth-last-child(" + j + ")").attr("src");
			if((col1 == col2) && (col2 == col3) && (col1 != null) && (col2 != null) && (col3 != null)){
				$(".col-" + k).children("img:nth-last-child(" + j + ")").attr("class","elemento activo");
				$(".col-" + (k + 1)).children("img:nth-last-child(" + j + ")").attr("class","elemento activo");
				$(".col-" + (k + 2)).children("img:nth-last-child(" + j + ")").attr("class","elemento activo");
				buscarh = 1;
			}
		}
	}
	return buscarh;
};

/*----------------------------- FUNCION RETURN VERTICAL --------------------*/
function buscarVertical(){
  var buscarv = 0;
	for(var l=1;l<6;l++){
		for(var k=1;k<8;k++){
			var col1 = $(".col-" + k).children("img:nth-child(" + l + ")").attr("src");
			var col2 = $(".col-" + k).children("img:nth-child(" + (l + 1) + ")").attr("src");
			var col3 = $(".col-" + k).children("img:nth-child(" + (l + 2) + ")").attr("src");
			if((col1 == col2) && (col2 == col3) && (col1 != null) && (col2 != null) && (col3 != null)){
				$(".col-" + k).children("img:nth-child(" + l + ")").attr("class","elemento activo");
				$(".col-" + k).children("img:nth-child(" + (l + 1) + ")").attr("class","elemento activo");
				$(".col-" + k).children("img:nth-child(" + (l + 2) + ")").attr("class","elemento activo");
				buscarv = 1;
			}
		}
	}
	return buscarv;
};

/*----------------------------- FUNCION MONTAR NUEVOS IMG --------------------*/
function addDulces(){
  $(".elemento").draggable({disabled:true});
  $("div[class^='col']").css("justify-content","flex-start");
	for(var x=1;x<8;x= x+1){
    colum[x - 1] = $(".col-" + x).children().length;
  }
  if(NuevosDulces == 0){
    for(var x=0;x<7;x++){
      rest[x] = (7 - colum[x]);
    }
    maximo = Math.max.apply(null,rest);
    contadorTotal = maximo;
  }
  if(maximo != 0){
    if(NuevosDulces == 1){
      for(var x=1;x<8;x++){
        if(contadorTotal > (maximo - rest[x - 1])){
          $(".col-" + x).children("img:nth-child("+(rest[x - 1]) + ")").remove("img");
        }
      }
		}
		if(NuevosDulces == 0){
      NuevosDulces = 1;
      for(var k=1;k<8;k++){
        for(var x=0;x < (rest[k - 1] - 1);x++){
          $(".col-" + k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");
        }
      }
		}
		for(var x=1;x<8;x++){
			if(contadorTotal > (maximo - rest[x - 1])){
				$(".col-"+x).prepend("<img src=image/" + (Math.floor(Math.random() * 4) + 1) + ".png class='elemento'/>");}
		}
	}
  if(contadorTotal == 1){
		clearInterval(nuevosDulces);
    identificar();
    eliminar = setInterval(function(){
      eliminarHorver()
    },150);
	}
	contadorTotal = contadorTotal - 1;
};

/*---------------- FUNCION PARA ELIMINAR LOS COMPLETOS -----------------------*/
function eliminarHorver(){
  matriz = 0;
  Horizontal = buscarHorizontal();
	Vertical = buscarVertical();
  for(var x = 1; x < 8; x++){
    matriz = matriz + $(".col-" + x).children().length;
  }

  if(Horizontal == 0 && Vertical == 0 && matriz != 49){
    clearInterval(eliminar);
    NuevosDulces = 0;
    nuevosDulces = setInterval(function(){
      addDulces();
		},600);
  }

  if(Horizontal == 1 || Vertical == 1){
    $(".elemento").draggable({disabled:true});
    $("div[class^='col']").css("justify-content","flex-end");
    $(".activo").hide("pulsate",1000,function(){
      var tmpmarcador = $(".activo").length;
      $(".activo").remove("img");
      marcador = marcador + tmpmarcador * 10;
      $("#score-text").html(marcador);
		});
	}

  if(Horizontal == 0 && Vertical == 0 && matriz == 49){
    $(".elemento").draggable({
      disabled:false,
			containment:".panel-tablero",
			revert:true,
			revertDuration:0,
			snap:".elemento",
			snapMode:"inner",
			snapTolerance:40
    });
  }

  $(".elemento").droppable({
		accept:".elemento",
		drop:function (event,ui){
			var dropped = ui.draggable;
			var droppedOn = this;
			espera = 0;

			do{
				espera = dropped.swap($(droppedOn));
			}while(espera == 0);

			if (validarMvto(dropped.attr('id'), droppedOn.attributes.id.value)) {
				Horizontal = buscarHorizontal();
				Vertical = buscarVertical();

				if(Horizontal == 0 && Vertical == 0){
					dropped.swap($(droppedOn));
				}
				if(Horizontal == 1 || Vertical == 1){
					movimientos = movimientos + 1;
	        $("#movimientos-text").html(movimientos);

					clearInterval(nuevosDulces);
					clearInterval(eliminar);
					eliminar = setInterval(function(){
						eliminarHorver()
					},150);
				}
			}else{dropped.swap($(droppedOn));}
		},
	});
};

function validarMvto(id1, id2){
	var c1 = id1.substring(1, 2);
	var c2 = id2.substring(1, 2);
	var f1 = id1.substring(3, 4);
	var f2 = id2.substring(3, 4);

	if (c1 == c2) {
		if (f1 == (f2 - 1) || f1 == (f2 + 1)) {
			return true;
		}
	}
	if (f1 == f2) {
		if (c1 == (c2 - 1) || c1 == (c2 + 1)) {
			return true;
		}
	}

	return false;
}

function borrar(){
	for(var x=1;x<8;x=x+1){
		$(".col-"+x).children("img").detach();
  }
};

function identificar(){
  var i = 0;
  for (var column = 1; column < 8; column++) {
    var columna = $('.col-' + column + ' img');
    i = 8;
    columna.each(function(a){
      i--;
      $(this).attr("id", 'C' + String(column) + 'F' + String(i));
    })
  }
}
