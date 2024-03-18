// Recognition - Config.
const recognition = new webkitSpeechRecognition();

recognition.continuous = false;     // Constantemente obtener resultadoS
recognition.lang = 'es-ES';        // Idioma
recognition.interimResult = false; // Devolver frases sin terminar

// DOM 
const btnStart = document.getElementById('start-btn');
const messageInput = document.getElementById('message-input');
// Listen: On
btnStart.addEventListener('click', () => {
    console.log('Listen...');
    recognition.start();
})

// Event Recognition
recognition.onresult = (event) => {
    const message = event.results[event.results.length - 1][0].transcript;
    console.log(message);

    if (message.trim() == 'modo noche') {
        document.getElementById('estilos').href = 'css/darkMode.css'
        return;
    }

    if (message.trim() == 'modo día') {
        document.getElementById('estilos').href = 'css/style.css'
        return;
    }

    messageInput.value = message;
    f_send_message();

}