'use strict'

let params = process.argv.slice(2);


let numero1 = parseFloat(params[0]);
let numero2 = parseFloat(params[1]);


let plantilla = `
 la suma es: ${numero1 + numero2}
 la resta es: ${numero1 - numero2}
 la Multiplicacion es: ${numero1 * numero2}
 la division es: ${numero1 / numero2}
`

console.log(plantilla);


console.log("Hola mundo con Js");