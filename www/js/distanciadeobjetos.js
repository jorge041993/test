var punto1 = new Object();
punto1.x1= Math.random(0, 5);

var punto2 = new Object();
punto2.x2= Math.random(5, 10);

function distancia(){
var dx = punto2.x2 - punto1.x1;
console.log("el valor de la distancia es:"+ dx);
alert("el valor de la distancia entre los puntos es:"+ dx);
console.log(punto2.x2, punto1.x1);
};
