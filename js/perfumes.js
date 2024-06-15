//Array vacío para pushear perfumes al carrito después
const carrito = []

//FUNCIÓN DE BÚSQUEDA
function buscarPerfume(codigo){//llamar el parámetro id para traer el dato desde la función comprar()
    let perfumeBuscado = perfumes.find((perfume)=>perfume.id === codigo)
    return perfumeBuscado
}

function filtrarPerfumePorCategoria(){
    let respuesta = true
    do{
        let categoria = prompt("Ingrese el nombre de la categoría del perfume que desea buscar: ")
        categoria = categoria.trim().toLowerCase().normalize()
        if (categoria.length > 0){
            let perfumesFiltrados = perfumes.filter((perfume)=>perfume.categoria === categoria)
            console.table(perfumesFiltrados)
        } else {
            console.warn("No se encontró la categoría que nos indicaste o no fueron escritas correctamente!")
        }
        respuesta = confirm("Deseas ver otra categoría?")
    } while (respuesta === true)
}
//FUNCIÓN PARA COMPRAR
function comprar(){
    //Agregamos opcion de filtrar por categoría
    let respuesta = confirm("Querés ver los perfumes de una misma categoria?")
    if(respuesta === true){
        filtrarPerfumePorCategoria()
    }
    //pedir id para buscar en la otra función dentro del array perfumes
    
    
    let codigo = parseInt(prompt("Ingrese el código ID del perfume que te interesa: "))
    let perfumeAComprar = buscarPerfume(codigo)
    if (perfumeAComprar === undefined) {
        console.warn("No se encontró el perfume que nos indicaste!")
    }
    else{
        carrito.push(perfumeAComprar)
        console.log(perfumeAComprar.nombre + " fue agregado al carrito.")
        console.table(carrito)
        respuesta = confirm("Deseas seguir agregando perfumes a tu carrito?:")
        if(respuesta === true){
            comprar()
        }
        else{
            const finalizarCompra = new Comprar(carrito)
            let total = finalizarCompra.totalCarrito()
            console.log("El costo total de la compra es de $ ", total.toLocaleString("es-AR"))
        }
    }
}
comprar()