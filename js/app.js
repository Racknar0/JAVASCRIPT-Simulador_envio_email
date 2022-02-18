//Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn'); 
const formulario = document.querySelector('#enviar-mail');

//variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', iniciarApp); //!iniciando app

    //campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //enviar email
    formulario.addEventListener('submit', enviarEmail);

    //btn reset
    btnReset.addEventListener('click', resetarFormulario);
}



//funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

//validarFormulario
function validarFormulario(e) {
    
    if (e.target.value.length > 0) {

        // Elimina el mensaje de error del dom
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
    
        mostrarError('Todos los campos son obligatorios');
        iniciarApp();
    }

    if (e.target.type === 'email') {

        if(er.test( e.target.value )) {
            // Elimina el mensaje de error del dom
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
             e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
            iniciarApp();
        }
    }

    if(er.test( email.value ) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } 
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('P')
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'backgroud-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error')
    if (errores.length === 0) {
        formulario.appendChild(mensajeError)
    } 
}

//enviar el email
function enviarEmail(e) {
    e.preventDefault();

    //mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Después de 3 Seg Ocultar Spinner  y mostrar mensaje
    setTimeout(() => {
        spinner.style.display = 'none';

        //Mensaje
        const parrafo = document.createElement('P');
        parrafo.textContent = 'El mensaje se envio Correctamente!';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')

        //insertar parafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); //elimina el mensaje
            resetarFormulario(); // resetea formulario
            email.classList.remove('border-green-500');
            asunto.classList.remove('border-green-500');
            mensaje.classList.remove('border-green-500');
        }, 5000);

    }, 3000);
}


//funcion que resetea el formulario
function resetarFormulario() {
    formulario.reset();
    iniciarApp();
}