//simulador de retiros y depositos virtuales
class cuentas {
    constructor(nombre, apellido, numTarjeta, password) {
        this.nombre = nombre
        this.apellido = apellido
        this.numTarjeta = numTarjeta
        this.password = password
        this.saldo = 0
        this.retiro = [0]
        this.deposito = [0]
    }
}

function isNumbre(variable){
    while(isNaN(variable)){
        variable = parseInt(prompt(`El dato ingresado no esta permitido, ingrese un numero (saldo $${cuenta1.saldo})`))
    }
    return variable
}

function getTarjeta() {
    verificacionTarjeta = parseInt(prompt("Ingrese su numero de tarjeta de credito "))
    while(isNaN(verificacionTarjeta)){
        verificacionTarjeta = parseInt(prompt("El dato ingresado no corresponde a un numero de tarjeta, intente devuelta"))
    }
    return verificacionTarjeta
}

function getPassword() {
    verificacionPassword = parseInt(prompt("Ingese su codiogo de seguridad "))
    while(isNaN(verificacionPassword) || verificacionPassword > 999){
        verificacionPassword = parseInt(prompt("El codigo ingresado supera los 3 digitos y/o no corresponde a un codigo numerico"))
    }
    return verificacionPassword
}

let nombre = prompt("Ingrese su nombre")
let apellido = prompt("Ingrese su apellido")
let numDeTarjeta = getTarjeta()
let password = getPassword()
let exit = "si"

const cuenta1 = new cuentas(nombre, apellido, numDeTarjeta, password)

while (exit == "si") {

    let solicitud = prompt(`Usted tiene un saldo de $${cuenta1.saldo}, le gustaria hacer un deposito o un retiro ?`).toLowerCase()

    while (solicitud != "deposito" && solicitud != "retiro") {
        alert("La opcion seleccionada no existe, intente devuelta")
        solicitud = prompt(`Usted tiene un saldo de $${cuenta1.saldo}, le gustaria hacer un deposito o un retiro ?`).toLowerCase()
    }

    if (solicitud == "retiro") {
        cuenta1.retiro.unshift(isNumbre(parseInt(prompt(`Cuanto le gustaria retirar (saldo $${cuenta1.saldo})?`))))
        while (cuenta1.retiro[0] > cuenta1.saldo) {
            cuenta1.retiro.shift()
            alert("El retiro excede los fondos en la cuenta, intete devuelta")
            cuenta1.retiro.unshift(isNumbre(parseInt(prompt(`Cuanto le gustaria retirar (saldo $${cuenta1.saldo})?`))))
        }
        cuenta1.saldo -= cuenta1.retiro[0]
        alert(`El retiro se cumplio con exito, su saldo actual es de $${cuenta1.saldo}`)
    }
    else if (solicitud == "deposito") {
        cuenta1.deposito.unshift(isNumbre(parseInt(prompt(`Ingrese el monto que desea depositar (saldo $${cuenta1.saldo})`))))
        cuenta1.saldo += cuenta1.deposito[0]
        alert(`El deposito se cumplio con exito, su saldo actual es de $${cuenta1.saldo}`)
    }

    exit = prompt("Le gutaria hacer algun otro tipo de deposito o retiro ? (si, no)").toLowerCase()

    while (exit != "si" && exit != "no") {
        alert("La opcion seleccionada no existe, intente devuelta")
        exit = prompt("Le gutaria hacer algun otro tipo de deposito o retiro ? (si, no)").toLowerCase()
    }
}

let depo = cuenta1.deposito.map(element => element.toString()).join(", ");
let reti = cuenta1.deposito.map(element => element.toString()).join(", ");
console.log(`Este es tu registro de depositos: \n${depo}\n\nEste es tu registro de retiros: \n${reti}`)


