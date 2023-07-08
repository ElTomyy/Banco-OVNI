//simulador de retiros y depositos virtuales

let usuario = prompt("Ingrese su nombre de usuario: ")
let tarjeta = "233409133245"
let codigo = "546"
let saldo = 50000
let retiro = 0
let deposito = 0
let exit = "si"

function numTarjeta(){
    verificacionTarjeta = prompt("Ingrese su numero de tarjeta de credito ")
}

function numCodigo(){
    verificacionCodigo = prompt("Ingese su codiogo de seguridad ")
}

alert("Genial " + usuario + ", su tarjeta de credito es: " + tarjeta + "\n y su codigo de seguridad es: " + codigo)

numTarjeta()
numCodigo()

while(verificacionTarjeta != "233409133245" || verificacionCodigo != "546"){
    alert("Los datos ingresados no coinciden, pruebe devuelta a continuacion")
    numTarjeta()
    numCodigo()
}

while(exit == "si"){

let solicitud = prompt("Usted tiene un saldo de $" + saldo + ", le gustaria hacer un deposito o un retiro ?")
solicitud = solicitud.toLowerCase()

while(solicitud != "deposito" && solicitud != "retiro"){
    alert("La opcion seleccionada no existe, intente devuelta")
    solicitud = prompt("Usted tiene un saldo de $" + saldo + ", le gustaria hacer un deposito o un retiro ?")
}

if(solicitud == "retiro"){
    retiro = parseInt(prompt("Cuanto le gustaria retirar (saldo &" + saldo + ") ?"))
    while(retiro > 50000){
        alert("El retiro excede los fondos en la cuenta, intete devuelta")
        retiro = parseInt(prompt("Cuanto le gustaria retirar (saldo &" + saldo + ") ?"))
    }
    saldo -= retiro
    alert("El retiro se cumplio con exito, su saldo actual es de $" + saldo)
}
else if(solicitud == "deposito"){
    deposito = parseInt(prompt("Ingrese el monto que desea depositar (saldo $" + saldo + ")"))
    saldo += deposito
    alert("El deposito se cumplio con exito, su saldo actual es de $" + saldo)
}

exit = prompt("Le gutaria hacer algun otro tipo de deposito o retiro ? (si, no)")
exit = exit.toLowerCase()

while(exit != "si" && exit != "no"){
    alert("La opcicon seleccionada no existe, intente devuelta")
    exit = prompt("Le gutaria hacer algun otro tipo de deposito o retiro ? (si, no)")
}
}


