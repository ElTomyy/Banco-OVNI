//simulador de retiros y depositos virtuales

let form = document.querySelector("#form")
let nombre = document.querySelector("#nombre")
let apellido = document.querySelector("#apellido")
let password = document.querySelector("#password")
let num_tarjeta = document.querySelector("#num_tarjeta")
let iniciar_sesion = document.querySelector("#iniciar_sesion")
let contenedor_form = document.querySelector("#contenedor_form")
let div_mod = document.querySelector("#div_mod")

class Usuario {
    constructor(nombre, apellido, password, num_tarjeta) {
        this.nombre = nombre
        this.apellido = apellido
        this.num_tarjeta = num_tarjeta
        this.password = password
        this.saldo = 0
        this.retiro = [0]
        this.deposito = [0]
    }
}

function isNumber(variable) {
    if (isNaN(parseInt(variable))) {
        return true
    }
    else {
        return false
    }
}

function reload(usuario){
    localStorage.setItem('Usuario', JSON.stringify(usuario))
}

form.onsubmit = (event) => {
    event.preventDefault();

    if ((password.value || "null") == "null" || (nombre.value || "null") == "null" || (apellido.value || "null") == "null" || (num_tarjeta.value || "null") == "null" || isNumber(num_tarjeta.value) === true) {
        Swal.fire({
            title: 'Alguno de los datos ingresados no es valido',
            icon: 'error'
        })
    }
    else {
        if (localStorage.getItem('Usuario') == null) {
            let usuario = new Usuario(nombre.value, apellido.value, password.value, num_tarjeta.value)
            localStorage.setItem('Usuario', JSON.stringify(usuario))
            Swal.fire({
                title: 'Se a creado un nuevo usuario',
                icon: 'success'
            })
            form.remove()
            add(usuario)

        }
        else {
            let usuario = JSON.parse(localStorage.getItem('Usuario'))
            if (usuario.nombre != nombre.value || usuario.apellido != apellido.value || usuario.password != password.value || usuario.num_tarjeta != num_tarjeta.value) {
                Swal.fire({
                    title: 'Ya hay una cuenta existente y este usuario no coincide',
                    icon: 'error'
                })
            }
            else {
                Swal.fire({
                    title: 'Sesion iniciada',
                    icon: 'success'
                })
                form.remove()
                add(usuario)

            }
        }


    }
    form.reset()
}

const add = (usuario) => {
    this.usuario = usuario

    div_mod.classList.add("container-fluid")

    let saldo_html = document.querySelector("#saldo")
    saldo_html.innerHTML = `este es su saldo actual: ${usuario.saldo}`

    div_mod.appendChild(saldo_html)

    let add_form1 = document.createElement("div")
    add_form1.innerHTML = `
    <!-- DEPOSITOS -->
    <form class="form form_dep shadow-lg" id="form_dep">
        <div class="mb-3">
          <label class="form-label label">Deposito</label>
          <input type="number" class="form-control input" placeholder="$$$" id="deposito_input">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    `
    contenedor_form.appendChild(add_form1)

    let add_form2 = document.createElement("div")
    add_form2.innerHTML = `
    <!-- RETIROS -->
    <form class="form form_dep shadow-lg" id="form_ret">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label label">Retiro</label>
            <input type="number" class="form-control input" placeholder="$$$" id="retiro_input">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    `
    contenedor_form.appendChild(add_form2)

    let add_form3 = document.createElement("div")
    add_form3.innerHTML = `
    <!-- CUENTA -->
    <form class="form form_dep shadow-lg" id="form_account">
        <div class="mb-3">
            <h2>Cuenta activa: ${usuario.nombre} ${usuario.apellido}</h2>
        </div>
        <button type="submit" class="btn btn-primary">Eliminar Cuenta</button>
    </form>
    `
    contenedor_form.appendChild(add_form3)

    fetch("./db/storage.json")
    .then((resp) => resp.json())
    .then((data) => {
        const {blue, venta, compra} = data
        let parrafo_dolar =   document.createElement("h3")
        parrafo_dolar.innerHTML = `
        dolar blue $${blue} -- compra $${compra} -- venta $${venta}
        `

        div_mod.appendChild(parrafo_dolar)
    })
    

    let form_account = document.querySelector("#form_account")
    let form_dep = document.querySelector("#form_dep")
    let form_ret = document.querySelector("#form_ret")
    let deposito_input = document.querySelector("#deposito_input")
    let retiro_input = document.querySelector("#retiro_input")

    form_account.onsubmit = (event) => {
        event.preventDefault()
        Swal.fire({
            title: "Eliminar",
            title: "Estas seguro que deseas eliminar esta cuenta ? esta accion es permanente",
            icon: "warning",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            showCancelButton: true,

        }).then(respuesta => {
            if (respuesta.isConfirmed) {
                localStorage.clear()
                location.reload()
            }
        })
    }

    form_dep.onsubmit = (event) => {
        event.preventDefault()
        if (isNumber(deposito_input.value) === true) {
            Swal.fire({
                title: 'El dato ingresado no corresponde, intente devuelta',
                icon: 'error'
            })
        }
        else {
            usuario.saldo += parseInt(deposito_input.value)
            saldo_html.innerHTML = `este es su saldo actual: ${usuario.saldo}`
            reload(usuario)
        }
        form.reset()

    }

    form_ret.onsubmit = (event) => {
        event.preventDefault()
        if (parseInt(retiro_input.value) > usuario.saldo || isNumber(retiro_input.value) === true) {
            Swal.fire({
                title: 'El dato ingresado no corresponde, intente devuelta',
                icon: 'error'
            })
        }
        else {
            usuario.saldo -= parseInt(retiro_input.value)
            saldo_html.innerHTML = `este es su saldo actual: ${usuario.saldo}`
            reload(usuario)
        }
        form.reset()
    }
}