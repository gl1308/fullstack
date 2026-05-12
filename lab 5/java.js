const canvas = document.getElementById("tela");
const ctx = canvas.getContext("2d");

// Céu
ctx.fillStyle = "#8EE6C5";
ctx.fillRect(0, 0, 400, 400);

// Sol
ctx.fillStyle = "yellow";
ctx.beginPath();
ctx.arc(300, 100, 50, 0, Math.PI * 2);
ctx.fill();

// Chão
ctx.fillStyle = "gray";
ctx.fillRect(0, 300, 400, 100);

// Lago
ctx.fillStyle = "#4A86E8";

ctx.beginPath();
ctx.arc(0, 330, 80, 0, Math.PI * 2);
ctx.fill();

ctx.beginPath();
ctx.arc(120, 400, 80, 0, Math.PI * 2);
ctx.fill();

// Árvore esquerda
ctx.fillStyle = "#8B4513";
ctx.fillRect(50, 260, 20, 60);

ctx.fillStyle = "green";
ctx.beginPath();
ctx.arc(60, 230, 30, 0, Math.PI * 2);
ctx.fill();

// Árvore direita
ctx.fillStyle = "#8B4513";
ctx.fillRect(350, 280, 20, 70);

ctx.fillStyle = "green";
ctx.beginPath();
ctx.arc(360, 250, 30, 0, Math.PI * 2);
ctx.fill();

// Casa
ctx.fillStyle = "#8B4513";
ctx.fillRect(150, 200, 100, 100);

// Telhado
ctx.fillStyle = "#FF6F4F";

ctx.beginPath();
ctx.moveTo(150, 200);
ctx.lineTo(200, 150);
ctx.lineTo(250, 200);
ctx.closePath();
ctx.fill();

// Porta
ctx.fillStyle = "#6B4423";
ctx.fillRect(190, 240, 20, 60);

// Janela esquerda
ctx.fillStyle = "#6EC6FF";
ctx.fillRect(160, 220, 30, 30);

// Janela direita
ctx.fillRect(210, 220, 30, 30);