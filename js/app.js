//Variables
const btnEnviar = document.querySelector('#enviar');

//variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', iniciarApp); //!iniciando app

    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
}



//funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

//validarFormulario
function validarFormulario(e) {
    if (e.target.value.length > 0) {
        console.log('si hay algo');
    } else {
        e.target.classList.add('border', 'border-red-500');
    }
    
}