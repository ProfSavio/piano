const teclasPiano = document.querySelectorAll(".piano-teclas .tecla");
const controleVolume = document.querySelector(".controle-volume input");
const teclasSelecao = document.querySelector(".teclas-checkbox input");

let todasAsTeclas = [];
let audio = new Audio("tunes/a.wav"); // Por padrão, ele buscará a nota/tecla "A"

function tocarNota(tecla) {
    audio.src = `tunes/${tecla}.wav`; // Busca o audio baseado na tecla pressionada
    console.log(`Tecla presionada: ${tecla}`);
    audio.play(); // Dá play no audio

    const teclaPressionada = document.querySelector(`[data-key="${tecla}"]`); // Guarda a informação de qual tecla foi pressionada
    teclaPressionada.classList.add("pressionada"); // Adiciona a tecla que foi pressionada, a classe de "pressionada"
    setTimeout(function () {
        // Remove a classe de "pressionada" após 150ms da tecla ter sido pressionada
        teclaPressionada.classList.remove("pressionada");
    }, 150);
}

teclasPiano.forEach(
    function(tecla) {
        todasAsTeclas.push(tecla.dataset.key); // Adiciona o valor de data-key ao array todasAsTeclas

        // Chama a função tocarNota quando a tecla é clicada
        tecla.addEventListener("click", function () {
            tocarNota(tecla.dataset.key);
        });
    }
);

function controlarVolume(evento) {
    // Define o volume do áudio com o valor do controle deslizante
    audio.volume = evento.target.value;
}

function mostrarOcultarTeclas() {
    // Alterna a classe "ocultar" de cada tecla ao clicar no checkbox
    teclasPiano.forEach(function (tecla) {
        tecla.classList.toggle("ocultar");
    });
}

function tocarTecla(evento) {
    // Se a tecla pressionada estiver no array todasAsTeclas,
    // chama a função tocarNota
    if (todasAsTeclas.includes(evento.key)) {
        tocarNota(evento.key);
    }
}

controleVolume.addEventListener("input", controlarVolume);
teclasSelecao.addEventListener("click", mostrarOcultarTeclas);
document.addEventListener("keydown", tocarTecla);
