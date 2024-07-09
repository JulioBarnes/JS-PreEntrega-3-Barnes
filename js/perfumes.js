const cardPerfumes = document.getElementById("sectionCards")
const carritoDeCompras = document.getElementById("carrito")
const perfumesEnCarrito = document.getElementById("perfumesEnCarrito")
const inputSearch = document.getElementById("inputSearch")
const carrito = JSON.parse(localStorage.getItem("carritoPerfumes")) ?? []
const perfumes = []
const URLPerfumes = "js/arrays.json" //hace las veces de API backend

function obtenerPerfumes(){
    // Petición fetch para traer los perfumes
    fetch(URLPerfumes)
    .then((response) => response.json())
    .then((data)=> perfumes.push(...data))
    .then(() => generarCardPerfumes(perfumes))
    .catch((error) => {cardPerfumes.innerHTML = retornarCardError(error)})
}

function actualizarPerfumesEnCarrito(){
    perfumesEnCarrito.textContent = carrito.length
}
function generarCardPerfumes(array) {
    if (array.length > 0) {
        cardPerfumes.innerHTML = ""
        array.forEach((perfume) => cardPerfumes.innerHTML += retornarCardHTML(perfume)) 
        eventoAgregarCarrito()
    } else {
        cardPerfumes.innerHTML = retornarCardError()
    }
}
function retornarCardHTML(perfume) {
    return `<div class="card my-3" style="width: 18rem;">
                <img src="${perfume.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${perfume.nombre}</h5>
                  <p class="card-text">Precio: $${perfume.precio}</p>
                  <a id = "${perfume.id}" class="btn btn-agregar">Agregar al carrito</a>
                </div>
            </div>`
}
function retornarCardError() {
    return `<div class="div-card-error">
                <h1>Se ha producido un error</h1>
                <p>Intente nuevamente en unos instantes...</p>
            </div>`
}
function eventoAgregarCarrito(){
    const botonAgregar = document.querySelectorAll("a.btn-agregar")
    if (botonAgregar.length > 0){
            botonAgregar.forEach((boton) => boton.addEventListener("click", () => {
            const perfumeSeleccionado = perfumes.find((perfume)=> perfume.id == boton.id)
            carrito.push(perfumeSeleccionado)
            mostrarToastPerfume(`${perfumeSeleccionado.nombre} agregado`, "green")
            actualizarPerfumesEnCarrito()
            localStorage.setItem("carritoPerfumes", JSON.stringify(carrito))
        })
    )}
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
function mostrarMensajeSinProducto(){
    Swal.fire({
        title: 'Error',
        text: 'Debes cargar productos al carrito!',
        icon: 'error',
        confirmButtonText: 'Continuar'
      })
}
//generarCardPerfumes(perfumes)
obtenerPerfumes()
carritoDeCompras.addEventListener("click", () => {
    carrito.length > 0 ? location.href = "checkout.html" : mostrarMensajeSinProducto()
})
carritoDeCompras.addEventListener("mousemove", () => {
    if (carrito.length > 0) {
        carritoDeCompras.style.cursor = "pointer"
        carritoDeCompras.title = "Productos en carrito: " + carrito.length
    } else {
        carritoDeCompras.style.cursor = "not-allowed"
    }
})
inputSearch.addEventListener("keyup", (e)=> { 
    if (e.key === "Enter") {
        let resultado = perfumes.filter((perfume)=> perfume.nombre.toLowerCase().includes(inputSearch.value.toLowerCase()))
        localStorage.setItem("ultimaBusqueda", inputSearch.value)

        if (resultado.length > 0) {
            generarCardPerfumes(resultado)
        }
    }
})