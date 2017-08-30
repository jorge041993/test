const nombre = "Jorge"

const dias = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo"
]

function promediocorrer(){
    const min = 5
    const max = 15

    return Math.round(Math.random() *(max-min)+min)
}

let totalkms = 0
const length = dias.length 
for(let i=0; i<length; i++){
        const kms =  promediocorrer()
        totalkms = totalkms + kms
        console.log(`el dia ${dias[i]}, ${nombre} corrio ${kms}`)
    }

    const promediokms = totalkms / length
    console.log(`en promedio, ${nombre} corrio ${promediokms.toFixed(2)} kms, en la semana`)