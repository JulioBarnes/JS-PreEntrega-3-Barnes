class Comprar {
    constructor(carritoDeCompras){
        this.carrito = carritoDeCompras
    }
    totalCarrito() {
        if (this.carrito.length > 0){
            return this.carrito.reduce((acc, perfume)=> acc + perfume.precio, 0)
        }
    }
}