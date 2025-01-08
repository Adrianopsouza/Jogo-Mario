const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');
const gameOverScreen = document.querySelector('.game-over');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

// Carrega os áudios para os eventos do jogo
const pointAudio = new Audio('../assets/audio.mp3'); // Som ao ultrapassar o pipe
const loseAudio = new Audio('../assets/audio2.mp3'); // Som ao perder

let score = 0; // Inicia com 0
let gameOver = false;
let pipePassed = false; // Variável para controlar se o Mario já passou o pipe

const jump = () => {
    if (gameOver) return;

    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Verifica colisão
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none'; // Para a animação do pipe
        pipe.style.left = `${pipePosition}px`; // Congela o pipe na posição atual

        mario.style.animation = 'none'; // Para a animação do Mario
        mario.style.bottom = `${marioPosition}px`; // Congela o Mario na posição atual

        mario.src = 'Images/game-over.png'; // Troca a imagem para "Game Over"
        mario.style.width = '75px'; // Ajusta o tamanho do Mario
        mario.style.marginLeft = '50px'; // Ajusta a posição do Mario

        loseAudio.play(); // Toca o som de perda
        clearInterval(loop); // Para o loop do jogo
        gameOver = true; // Define o estado como "Game Over"

        // Exibir a tela de Game Over
        finalScoreElement.textContent = score; // Mostra a pontuação final
        gameOverScreen.style.display = 'block'; // Exibe a tela de Game Over
    }

    // Incrementa a pontuação apenas quando o pipe passa pelo Mario
    if (pipePosition < 0 && !pipePassed && !gameOver) {
        score++; // Incrementa a pontuação
        scoreElement.textContent = score; // Atualiza o texto da pontuação
        pointAudio.play(); // Toca o som ao ultrapassar o pipe
        pipePassed = true; // Marca que o pipe foi ultrapassado
    }

    // Reseta o controle de pipe ultrapassado quando ele retorna para o início
    if (pipePosition > 120) {
        pipePassed = false;
    }
}, 10);

// Reiniciar o jogo
restartButton.addEventListener('click', () => {
    window.location.reload();
});

document.addEventListener('keydown', jump);
