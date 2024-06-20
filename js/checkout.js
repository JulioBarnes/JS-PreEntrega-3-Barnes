const tBody = document.querySelector("tbody")
const totalCarrito = document.querySelector("td#totalCarrito")
const btnComprar = document.querySelector("button#btnComprar")
const carrito = JSON.parse(localStorage.getItem("carritoPerfumes")) ?? []

function calcularTotalCarrito() {
    if (carrito.length > 0) {
        let montoTotalCarrito = carrito.reduce((acc, perf)=> acc + perf.precio, 0)
        totalCarrito.textContent = `$ ${montoTotalCarrito.toLocaleString("es-AR")}`
    }
}

function armarTablaCarrito({ imagen, nombre, precio }) {
    return `<tr>
                <td>
                    <img src="${imagen}" class="fotoEnCarrito" alt="...">
                </td>
                <td>${nombre}</td>
                <td>$ ${precio.toLocaleString("es-AR")}</td>
                <td class="quitar-carrito" title="Clic para quitar del carrito">❌</td>
            </tr>`
}

function cargarPerfumesDelCarrito() {
    tBody.innerHTML = ""
    if (carrito.length > 0) {
        carrito.forEach((perfume)=>  tBody.innerHTML += armarTablaCarrito(perfume))
        calcularTotalCarrito()
    }
}

cargarPerfumesDelCarrito()

btnComprar.addEventListener("click", ()=> {
    const mensajeComprar = document.querySelector("div#mensajeComprar")
    mensajeComprar.classList.add("mostrar-mensaje")
    tBody.innerHTML = ""
    totalCarrito.textContent = "$ 0.00"
    localStorage.removeItem("carritoPerfumes")
    carrito.length = 0
})
const botonQuitar = document.querySelectorAll("td.quitar-carrito")

botonQuitar.addEventListener("click", () => {
    const indice = carrito.findIndex((perfume) => perfume.id === parseInt(boton.id))
    carrito.splice(indice, 1)
    localStorage.setItem("carritoPerfumes", JSON.stringify(carrito))
    cargarPerfumesDelCarrito()
})