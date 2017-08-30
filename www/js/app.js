var altura = 7;
var base = 5;
var pi = 3.1416;
var radio = 2;
var area = base * altura;
var areat = (base * altura) /2;
var areac = pi * (radio * radio);
var area_esfera = 4/3 * pi * ((radio * radio)* radio);
console.log("el area de mi rectangulo es igual:" +area);
console.log("le area del tringulo es:" +areat);
console.log("el area del circulo es:" +areac);
console.log("el volumen de la esfera es:" +area_esfera);
//el area de mi rectangulo es igual:35
//le area del tringulo es:17.5
//el area del circulo es:12.5664
//el volumen de la esfera es:33.5104

var myvar = "Jorge Sanchez";
function mifuncion(){
    alert(myvar);
}
console.log("hola como estas:" +myvar);



var nombre = "jorge";
function saludar(){
    if(true){
        var nombre = "antonio";
    }
    console.log(`hola ${nombre}`);
}

function saludar10(){
    let i=0;
    for(i; i<10; i++){
        console.log(`hola ${nombre}`);  
    }
    console.log(`el valor de i es ${i}`)
}