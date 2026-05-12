
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startButton");

let gameRunning = false;

const player = {
    x: 400,
    y: 250,
    size: 25,
    speed: 5,
    color: "#38bdf8"
};

let keys = {};
let score = 0;
let life = 3;

let enemies = [];
let items = [];

document.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

function spawnEnemy(){
    enemies.push({
        x: Math.random() * canvas.width,
        y: -20,
        size: 20,
        speed: 2 + Math.random() * 3
    });
}

function spawnItem(){
    items.push({
        x: Math.random() * (canvas.width - 20),
        y: Math.random() * (canvas.height - 20),
        size: 15
    });
}

function movePlayer(){
    if(keys["w"]) player.y -= player.speed;
    if(keys["s"]) player.y += player.speed;
    if(keys["a"]) player.x -= player.speed;
    if(keys["d"]) player.x += player.speed;

    if(player.x < 0) player.x = 0;
    if(player.y < 0) player.y = 0;

    if(player.x > canvas.width - player.size)
        player.x = canvas.width - player.size;

    if(player.y > canvas.height - player.size)
        player.y = canvas.height - player.size;
}

function collision(a, b){
    return(
        a.x < b.x + b.size &&
        a.x + a.size > b.x &&
        a.y < b.y + b.size &&
        a.y + a.size > b.y
    );
}

function update(){
    movePlayer();

    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;

        if(enemy.y > canvas.height){
            enemies.splice(index, 1);
        }

        if(collision(player, enemy)){
            enemies.splice(index, 1);
            life--;

            if(life <= 0){
                gameRunning = false;
                alert("Game Over! Pontuação: " + score);
            }
        }
    });

    items.forEach((item, index) => {
        if(collision(player, item)){
            items.splice(index, 1);
            score += 10;
        }
    });
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);

    ctx.fillStyle = "red";
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    });

    ctx.fillStyle = "lime";
    items.forEach(item => {
        ctx.fillRect(item.x, item.y, item.size, item.size);
    });

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Pontuação: " + score, 20, 30);
    ctx.fillText("Vida: " + life, 20, 60);
}

function gameLoop(){
    if(!gameRunning) return;

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

startButton.addEventListener("click", () => {
    if(gameRunning) return;

    score = 0;
    life = 3;

    enemies = [];
    items = [];

    player.x = 400;
    player.y = 250;

    gameRunning = true;

    setInterval(() => {
        if(gameRunning){
            spawnEnemy();
        }
    }, 1000);

    setInterval(() => {
        if(gameRunning){
            spawnItem();
        }
    }, 3000);

    gameLoop();
});
