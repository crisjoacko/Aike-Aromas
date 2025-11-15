const btnAgregar =  document.querySelectorAll('.btn-agregar')

btnAgregar.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        const productoElemento = e.target.closest('.producto-card');
        const nombreProducto = productoElemento.querySelector('h4').innerText;
        const precioTexto = productoElemento.querySelector('.precio').innerText.replace('$', '').replace('.', '').trim(); 
        const precio = parseFloat(precioTexto); 
        const producto = {
            id: nombreProducto.replace(/\s/g, ''),
            nombre: nombreProducto,
            precio: precio,
            cantidad: 1
        };
        agregarAlCarrito(producto);
        
    });
});



function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Buscar si el producto ya existe
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        // Si existe, aumentar la cantidad
        productoExistente.cantidad++;
    } else {
        // Si no existe, añadir el nuevo producto al carrito
        carrito.push(producto);
    }

    // Guardar la lista actualizada de vuelta en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    console.log("Carrito Actualizado:", carrito);
    alert(`¡${producto.nombre} añadido al carrito!`);
}