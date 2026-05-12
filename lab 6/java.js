const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// imagem
const img = new Image();
img.src = "bola.png"; // coloque sua imagem aqui

// posição inicial
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

// tamanho da imagem
const imgSize = 60;

// desenhar
function desenhar() {

    // limpa canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // centraliza imagem no mouse
    let x = mouseX - imgSize / 2;
    let y = mouseY - imgSize / 2;

    // impede sair do canvas
    if (x < 0) {
        x = 0;
    }

    if (y < 0) {
        y = 0;
    }

    if (x + imgSize > canvas.width) {
        x = canvas.width - imgSize;
    }

    if (y + imgSize > canvas.height) {
        y = canvas.height - imgSize;
    }

    // desenha imagem
    ctx.drawImage(img, x, y, imgSize, imgSize);

    requestAnimationFrame(desenhar);
}

// movimento do mouse
canvas.addEventListener("mousemove", function (event) {

    const rect = canvas.getBoundingClientRect();

    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

});

// inicia quando imagem carregar
img.onload = function () {
    desenhar();
};