function iniciar(){

//Se guarda la referencia del elemento canvas en la variable llamada elemento
var elemento = document.getElementById('lienzo');
//Creacion del objeto lienzo que define el elemento en un conexto 2d para disponer de una rejilla de pixeles para dibujar
lienzo = elemento.getContext('2d');



//Variables para controlar la posicion de todo el castillo en el lienzo
var cx = 10;
var cy = 5;
//Variable auxiliares fijas para las posiciones del castillo en el eje x
var clax = 100;
var clbx = 150;
var clcx = 200;
var cldx = 250;
var clex = 300;
var clfx = 350;
var clgx = 400;
var clhx = 450;
//Variable auxiliares fijas para las posiciones del castillo en el eje y
var clay = 200;
var clby = 250;
var clcy = 300;
var cldy = 350;
var cley = 400;
var clfy = 450;
var clgy = 500;
var clhy = 550;

//Dibujando luna llena
lienzo.beginPath();
//Agregando una varible para utilizar un gradiente del color sobre la figura del sol
var gradiente = lienzo.createRadialGradient(cx+clhx+120,cy+50,10,cx+clhx+120,cy+50,45);
gradiente.addColorStop("0","white"); //Agregando el color amarillo en el centro de la figura
gradiente.addColorStop("0.5","darkgray"); //Agregando el color naranja en la mitad del diametro
gradiente.addColorStop("0.8","black");
gradiente.addColorStop("1","darkgray"); //Agregando el color rojo en la circunferencia del circulo
lienzo.fillStyle = gradiente; //Agregando el gradiente con los colores al estilo del lienzo
lienzo.arc(cx+clhx+120, cy+50, 45, 0, Math.PI*2, false); //Dibujando el circulo
lienzo.fill(); //Finalizando el relleno de la figura dibujandola en el lienzo




lienzo.restore();


lienzo.stroke();

}
window.addEventListener("load", iniciar, false);