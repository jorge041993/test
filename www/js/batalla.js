let vidaGoku = 100;
let vidaSuperman = 100;

const MIN_POWER = 5;
const MAX_POWER = 12;

let round = 0;

const gokuSigueVivo = ()=> vidaGoku > 0

const ambosSiguenVivos = () => vidaGoku > 0 && vidaSuperman > 0;

const ambosMuertos = () => vidaGoku === 0 && vidaSuperman === 0

const calcularGolpe = () => Math.round(Math.random() * (MAX_POWER - MIN_POWER)+ MIN_POWER)

while(ambosSiguenVivos()){
    round++;
    console.log(`Round ${round}`);

    const golpeGoku = calcularGolpe();
    const golpeSuperman = calcularGolpe();
    if(golpeGoku > golpeSuperman){
        console.log(`Goku ataca a superman con un golpe de ${golpeGoku}`)
        vidaSuperman -= golpeGoku
        console.log(`Superman queda en ${vidaSuperman} de vida`)
    }else{
        console.log(`Superman ataca a goku con un golpe de ${golpeSuperman}`)
        vidaGoku -= golpeSuperman
        console.log(`Goku queda en ${vidaGoku} de vida`)
    }

}
if(gokuSigueVivo()){
    console.log(`Goku gano la pelea. Su vida es ${vidaGoku}`)
}else{
    console.log(`Superman gano la pelea. Su vida es ${vidaSuperman}`) 
}