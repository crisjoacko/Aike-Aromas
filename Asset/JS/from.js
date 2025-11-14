const nameInput = document.getElementById('name');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('password2');
const form = document.getElementById('registro-form');


//Manejo de errores
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-text');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-text');

    errorDisplay.innerText = '';
    inputControl.classList.remove('error');
    inputControl.classList.add('success'); 
}

/// La función DEBE recibir el elemento que está validando
function validarN(element) { 
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    
    const nombreOApellidoValor = element.value.trim();
    
    let isValid = true; 
    
    const nombreCampo = element.id === 'name' ? 'El nombre' : 'El apellido';

    if (nombreOApellidoValor === "") {
        setError(element, `${nombreCampo} es obligatorio.`);
        isValid = false;
    } else if (!nameRegex.test(nombreOApellidoValor)) {
        setError(element, "Solo letras, acentos y espacios son permitidos.");
        isValid = false;
    } else {
        setSuccess(element);
    }
    return isValid;
}

function validarE(element) {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const emailValor = element.value.trim();
    let isValid = true;

    if (emailValor === "") {
        setError(element, "El email es obligatorio");
        isValid = false;
    } else if (!emailRegex.test(emailValor)) {
        setError(element, "Introduce un formato de email válido");
        isValid = false;
    } else {
        setSuccess(element);
    }
    return isValid;
}

function validarP1(element) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordValor = element.value.trim();
    let isValid = true;

    if (passwordValor === "") {
        setError(element, "La contraseña es obligatoria");
        isValid = false;
    } else if (!passwordRegex.test(passwordValor)) {
        setError(element, "Mín. 8 caracteres, 1 mayús, 1 número, 1 especial");
        isValid = false;
    } else {
        setSuccess(element);
        validarP2(confirmPassword); 
    }
    return isValid;
}

function validarP2(element) {
    const passwordValorPrincipal = password.value.trim(); 
    const confirmPasswordValor = element.value.trim();
    let isValid = true;

    if (confirmPasswordValor === "") {
        setError(element, "Confirma la contraseña");
        isValid = false;
    } else if (confirmPasswordValor !== passwordValorPrincipal) {
        setError(element, "Las contraseñas no coinciden");
        isValid = false;
    } else {
        setSuccess(element);
    }
    return isValid;
}

nameInput.addEventListener('blur', function() { validarN(this); });
lastname.addEventListener('blur', function() { validarN(this); }); 

email.addEventListener('blur', function() { validarE(this); });

password.addEventListener('blur', function() { validarP1(this); });
confirmPassword.addEventListener('blur', function() { validarP2(this); });

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validarN(nameInput) && validarN(lastname) && validarE(email) && validarP1(password) && validarP2(confirmPassword)) {
        alert("El formulario no se envio correctamente, por favor corrija los campos marcados en rojo.");
    }else {
        alert("El formulario se envio correctamente");
        form.submit();
    }
});
