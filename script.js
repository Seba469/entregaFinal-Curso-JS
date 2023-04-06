class Producto{
    constructor (idProducto, idMarca, nombreProducto, nombreMarca, precio, imagen,stock){
        this.idProducto = idProducto
        this.idMarca = idMarca
        this.nombreProducto = nombreProducto
        this.nombreMarca = nombreMarca
        this.precio = precio
        this.imagen = imagen
        this.stock = stock
    }
}

/*NIKE*/
const nike01 = new Producto('nike-01', 'nike', 'ZapatillaN-01', 'Nike', 3000, 'nike.png', 5)
const nike02 = new Producto('nike-02', 'nike', 'ZapatillaN-02', 'Nike', 3000, 'nike.png', 5)
/*NIKE*/

/*ADIDAS*/
const adidas01 = new Producto('adidas-01', 'adidas', 'ZapatillaA-01', 'Adidas', 3000, 'adidas.png', 5)
const adidas02 = new Producto('adidas-02', 'adidas', 'ZapatillaA-02', 'Adidas', 3000, 'adidas.png', 5)
/*ADIDAS*/

/*PUMA*/
const puma01 = new Producto('puma-01', 'puma', 'ZapatillaP-01', 'Puma', 3000, 'puma.png', 5)
const puma02 = new Producto('puma-02', 'puma', 'ZapatillaP-02', 'Puma', 3000, 'puma.png', 5)
/*PUMA*/

const stockProducto = [nike01, nike02, adidas01, adidas02, puma01, puma02]
let carrito
let carritoLS = localStorage.getItem('productosCarrito')

/*LLAMADOS DOM*/
const divContenedorProductos = document.querySelector('#contenedorProductos')
const botonesCategorias = document.querySelectorAll('.botonCategoria')
const tituloTienda = document.querySelector('#tituloTienda')
let botonesAgregar = document.querySelectorAll('.agregarProducto')

const asideCarrito = document.querySelector('#asideCarrito')
const bodyTienda = document.querySelector('#bodyTienda')
const botonCarrito = document.querySelector('#botonCarrito')
const botonCerrarCarrito = document.querySelector('#botonCerrarCarrito')
const carritoVacio = document.querySelector('#carritoVacio')
const productosCarrito = document.querySelector('#productosCarrito')
const accionesCarrito = document.querySelector('#accionesCarrito')

/*LLAMADOS DOM*/

function cargarProducto (producto){

    divContenedorProductos.innerHTML = ''

    producto.forEach(p => {
        divContenedorProductos.innerHTML +=
        `
        <div class="producto">
            <img class="imgProducto" src="../imagenes/${p.imagen}" alt="imagenProducto">
            <div class="detallesProducto">
                <h3 class="tituloProducto">${p.nombreMarca} ${p.nombreProducto}</h3>
                <p class="precioProducto">$${p.precio}</p>
                <button id="${p.idProducto}" class="agregarProducto">Agregar</button>
            </div>
        </div>
        `
    })
    botonesCategorias.forEach(boton => boton.addEventListener('click', cargarProductoCategorias))

    actualizarBotonesAgregar()

    botonCarrito.addEventListener('click', abrirCarrito)
    botonCerrarCarrito.addEventListener('click', cerrarCarrito)

    
}

function cargarProductoCategorias (e){
    
    const idBoton = e.currentTarget.id

    stockProducto.forEach(p => {
        if(idBoton === p.idMarca){
            tituloTienda.innerText = p.nombreMarca
            
            const categoriaSeleccionada = stockProducto.filter(p => p.idMarca === idBoton)
            cargarProducto(categoriaSeleccionada)
        }
    })
    
}

function actualizarBotonesAgregar (){
    botonesAgregar = document.querySelectorAll('.agregarProducto')

    botonesAgregar.forEach(boton => boton.addEventListener('click', agregarAlCarrito))
}

if(carritoLS){
    carrito = JSON.parse(carritoLS)
}else{
    carrito = []
}

function agregarAlCarrito (e){

    const idBoton = e.currentTarget.id;
    const productoSeleccionado = stockProducto.find(p => p.idProducto === idBoton)

    if(carrito.some(p => p.idProducto === idBoton)){
        const indiceProductoCarrito = carrito.findIndex(p => p.idProducto === idBoton)
        carrito[indiceProductoCarrito].cantidad ++
    }else{
        productoSeleccionado.cantidad = 1
        carrito.push(productoSeleccionado)
    }

    localStorage.setItem('productosCarrito', JSON.stringify(carrito))

    cargarCarrito()
}

function abrirCarrito (){

    asideCarrito.classList.remove('disable')
    bodyTienda.style.overflow = ('hidden')

    
}

function cerrarCarrito (){
    asideCarrito.classList.add('disable')    
}

function cargarCarrito (){
    
    if(carrito && carrito.length > 0){
        carritoVacio.classList.add('disable')
        productosCarrito.classList.remove('disable')
        accionesCarrito.classList.remove('disable')

        console.log(carrito)

        productosCarrito.innerHTML += ''

        carrito.forEach(p => {

            productosCarrito.innerHTML +=
            `
            <div class="productoCarrito">   
                <img class="prodCarritoImg" src="../imagenes/${p.imagen}" alt="imagenProducto">
                <div class="tituloProdCarrito">
                    <small>Nombre</small>
                    <h3>${p.nombreMarca} ${p.nombreProducto}</h3>
                </div>
                <div class="cantidadProdCarrito">
                    <small>Cantidad</small>
                    <p>${p.cantidad}</p>
                </div>
                <div class="precioProdCarrito">
                    <small>Precio</small>
                    <p>$${p.precio}</p>
                </div>
                <div class="subtotalProdCarrito">
                   <small>Subtotal</small>
                   <p>$${p.cantidad * p.precio}</p>
                </div>
                <button id="${p.idProducto}" class="botonBorrar"><i class="fa-solid fa-trash"></i></button>
            </div>
            `
        })
    }else{
        carritoVacio.classList.remove('disable')
        productosCarrito.classList.add('disable')
        accionesCarrito.classList.add('disable')
    }
} 

cargarProducto(stockProducto)
