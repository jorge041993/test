//si la palabra termina en "ar", se le quitan los dos ultimos caracteres
function platzom(str){
    let translation = str;

    if(str.toLowerCase().endsWith("ar")){
        translation = str.slice(0, -2);
    }

//si la palabra inicia con "z", se le añade los caracteres "pe", al final de la palabra  
if (str.toLowerCase().startsWith("z")){
    translation +=  "pe"
}
//si la palabra traducida tiene 10 o mas letras se deve partir a la mitad  y se debe unir con un guion
let l = str.length;
let minus = str.toLowerCase()
if(str.toLowerCase().length >=10){
 let fHalf = str.slice((l /2));
 let sHalf = str.slice(0, -(l /2));
    translation = `${sHalf}${`-`}${fHalf}`;
}
/*si la palabra original es un palindromo ninguna de las otras reglas funciona si se debuelbe al palabra intercanlando
 entre mayusculas y minusculas*/
    const reverse = (str) => str.split('').reverse().join('');
    function minMay(str){
        const l = str.length;
        let translation = "";
        let capitalize = true;
        for (i=0; i<l; i++){
            const char = str.charAt(i);
            translation += capitalize ? char.toLowerCase();
        }
    }
 if(str = reverse(str)){
     return minMay(str);
 }
    
    return translation;
}
console.log(platzom("programar"));
console.log(platzom("zorro"));
console.log(platzom("parangacutirimicuaro"));


