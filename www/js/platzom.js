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

    
    return translation;
}
console.log(platzom("programar"));
console.log(platzom("zorro"));


//si la palabra traducida tiene 10 o mas letras se deve partir a la mitad  y se debe unir con un guion
/*si la palabra original es un palindromo ninguna de las otras reglas funciona si se debuelbe al palabra intercanlando
 entre mayusculas y minusculas*/