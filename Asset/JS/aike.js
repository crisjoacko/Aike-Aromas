const btnColecion = document.querySelector('.btn-coleccion');
const btnCarritos = document.querySelectorAll('.btn-carrito');
const conocerMas = document.querySelector('.btn-conocer-mas');

btnColecion.addEventListener('click', ()=>{
    window.location.href='Tienda/productos.html'
})

btnCarritos.forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.href = 'Tienda/carrito.html';
    });
});

conocerMas.addEventListener('click', ()=>{
    window.location.href='Datos/politica.html'
});
