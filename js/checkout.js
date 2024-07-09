const tBody = document.querySelector("tbody")
const totalCarrito = document.querySelector("td#totalCarrito")
const btnComprar = document.querySelector("button#btnComprar")
let carrito = JSON.parse(localStorage.getItem("carritoPerfumes")) ?? []

function calcularTotalCarrito() {
    if (carrito.length > 0) {
        let montoTotalCarrito = carrito.reduce((acc, perf)=> acc + perf.precio, 0)
        totalCarrito.textContent = `$ ${montoTotalCarrito.toLocaleString("es-AR")}`
    }
}

function armarTablaCarrito({ imagen, nombre, precio, id }) {
    return `<tr>
                <td>
                    <img src="${imagen}" class="fotoEnCarrito" alt="...">
                </td>
                <td>${nombre}</td>
                <td>$ ${precio.toLocaleString("es-AR")}</td>
                <td class="quitar-carrito" id="${id}" title="Clic para quitar del carrito">❌</td>
            </tr>`
}

function cargarPerfumesDelCarrito() {
    tBody.innerHTML = ""
    if (carrito.length > 0) {
        carrito.forEach((perfume)=>  tBody.innerHTML += armarTablaCarrito(perfume))
        calcularTotalCarrito()
        quitarDelCarrito()
    }
}
function mostrarToastPerfume(mensaje, color){
    Toastify({
        text: mensaje,
        style: {
            background: color,
        },
        duration: 3200,
        close: true,
        }).showToast();
}
function quitarDelCarrito() {
    let botonQuitar = document.querySelectorAll("td.quitar-carrito")
    if (botonQuitar.length > 0){
        botonQuitar.forEach((boton) => boton.addEventListener("click", () => {
            carrito = carrito.filter (perfume => perfume.id != boton.id)
            console.log(carrito)
            localStorage.setItem("carritoPerfumes", JSON.stringify(carrito))
            tBody.innerHTML = ""
            mostrarToastPerfume("Quitado del carrito", "red")
            if (carrito.length > 0) {
                carrito.forEach((perfume)=>  tBody.innerHTML += armarTablaCarrito(perfume))
                calcularTotalCarrito()
                quitarDelCarrito()
            }
            else {tBody.innerHTML = ""
                totalCarrito.textContent = "$ 0.00"}
        }))
    }  
} 

function mostrarMensajeConfirmacion(){
    Swal.fire({
        title: 'Compra Exitosa',
        text: 'Gracias por tu compra!',
        icon: 'success',
        confirmButtonText: 'Continuar'
      })
}
function mostrarMensajeSinProducto(){
    Swal.fire({
        title: 'Error',
        text: 'Debes cargar productos al carrito!',
        icon: 'error',
        confirmButtonText: 'Continuar'
      })
}
cargarPerfumesDelCarrito()

btnComprar.addEventListener("click", ()=> {
    if (carrito.length > 0){
        mostrarMensajeConfirmacion()
        //const mensajeComprar = document.querySelector("div#mensajeComprar")
        //mensajeComprar.classList.add("mostrar-mensaje")
        tBody.innerHTML = ""
        totalCarrito.textContent = "$ 0.00"
        localStorage.removeItem("carritoPerfumes")
        carrito.length = 0
    }
    else {
        mostrarMensajeSinProducto()
        //tBody.innerHTML = ""
        //totalCarrito.textContent = "NO HAY NADA AQUÍ 🙈"
    }
})