document.addEventListener('DOMContentLoaded', () => {
    
    const carritoContenedor = document.getElementById('carrito-contenedor');
    const carritoResumen = document.getElementById('carrito-resumen');

    // =========================================================
    // 1. FUNCIONES PRINCIPALES DE MANIPULACIÓN DE DATOS
    // =========================================================

    function guardarCarrito(carrito) {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cambiarCantidad(id, cambio) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoIndex = carrito.findIndex(item => item.id === id);

        if (productoIndex !== -1) {
            // Aumentar o disminuir la cantidad
            carrito[productoIndex].cantidad += cambio;

            // Si la cantidad llega a 0, eliminar el producto
            if (carrito[productoIndex].cantidad <= 0) {
                eliminarProducto(id);
                return; // Salir para no renderizar dos veces
            }

            guardarCarrito(carrito);
            renderizarCarrito(); // Volver a dibujar el carrito
        }
    }

    function eliminarProducto(id) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        // Filtrar para crear un nuevo array sin el producto a eliminar
        const nuevoCarrito = carrito.filter(item => item.id !== id);

        guardarCarrito(nuevoCarrito);
        renderizarCarrito(); // Volver a dibujar el carrito
    }

    // =========================================================
    // 2. FUNCIÓN DE RENDERIZADO Y LÓGICA DE VISTA
    // =========================================================

    function renderizarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoContenedor.innerHTML = ''; 
        carritoResumen.innerHTML = '';

        if (carrito.length === 0) {
            carritoContenedor.innerHTML = `
                <div class="carrito-vacio">
                    <p>Tu carrito está actualmente vacío. ¡Añade algunos productos!</p>
                    <a href="../Tienda/productos.html" class="continue-shopping">← Seguir Comprando</a>
                </div>
            `;
            
            carritoResumen.innerHTML = `
                <div class="cart-summary">
                    <h2>Resumen del Pedido</h2>
                    <div class="summary-line">
                        <span>Subtotal</span>
                        <span class="summary-value">$0.00</span>
                    </div>
                    <div class="summary-line total">
                        <span>Total</span>
                        <span>$0.00</span>
                    </div>
                    <button class="checkout-btn" disabled>Finalizar Compra</button>
                    <p class="compra-segura">Pago Seguro<i class="fa-solid fa-lock"></i></p>
                </div>
            `;
            
        } else {
            // Lógica de Carrito con Productos
            let subtotal = 0;
            let productosHTML = '';

            carrito.forEach(producto => {
                const totalProducto = producto.precio * producto.cantidad;
                subtotal += totalProducto;

                productosHTML += `
                    <div class="cart-item">
                        <img src="../Asset/Img/dif1.jpg" alt="${producto.nombre}" class="item-img"> 
                        
                        <div class="item-details">
                            <p class="item-name">${producto.nombre}</p>
                            <p class="item-price-unit">$${producto.precio.toFixed(2)}</p>
                        </div>
                        
                        <div class="item-quantity-control">
                            <button class="quantity-btn minus" data-id="${producto.id}">-</button>
                            <span class="quantity-input">${producto.cantidad}</span>
                            <button class="quantity-btn plus" data-id="${producto.id}">+</button>
                        </div>
                        
                        <p class="item-total">$${totalProducto.toFixed(2)}</p>
                        <button class="remove-btn" data-id="${producto.id}"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                `;
            });

            // Mostrar Productos y Resumen
            carritoContenedor.innerHTML = `
                ${productosHTML}
                <a href="../Tienda/productos.html" class="continue-shopping">← Seguir Comprando</a>
            `;
            
            const total = subtotal; 
            
            carritoResumen.innerHTML = `
                <div class="cart-summary">
                    <h2>Resumen del Pedido</h2>
                    <div class="summary-line">
                        <span>Subtotal</span>
                        <span class="summary-value">$${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="summary-line">
                        <span>Envío</span>
                        <span class="summary-value">Calculado en el siguiente paso</span>
                    </div>
                    <hr>
                    <div class="summary-line total">
                        <span>Total</span>
                        <span class="summary-value">$${total.toFixed(2)}</span>
                    </div>
                    
                    <button class="checkout-btn">Finalizar Compra</button>
                    <p class="compra-segura">Pago Seguro<i class="fa-solid fa-lock"></i></p>
                </div>
            `;
            conectarListeners();
        }
    }

    // =========================================================
    // 3. FUNCIÓN DE CONEXIÓN DE LISTENERS
    // =========================================================

    function conectarListeners() {
        // Listeners para Aumentar y Disminuir Cantidad
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                cambiarCantidad(id, -1); 
            });
        });

        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                cambiarCantidad(id, 1); 
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                eliminarProducto(id); 
            });
        });
    }

    renderizarCarrito();
});