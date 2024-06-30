const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreSpan = document.getElementById("scoreSpan");

let isJumping = false;
let score = 0;

document.addEventListener("keydown", jump);

function jump(event) {
    if (event.code === "Space" && !isJumping) {
        isJumping = true;
        let jumpCount = 0;
        let jumpInterval = setInterval(() => {
            if (jumpCount < 15) {
                dino.style.bottom = (parseInt(dino.style.bottom) || 0) + 5 + "px";
            } else if (jumpCount < 30) {
                dino.style.bottom = (parseInt(dino.style.bottom) || 0) - 5 + "px";
            } else {
                clearInterval(jumpInterval);
                isJumping = false;
                dino.style.bottom = "0px";
            }
            jumpCount++;
        }, 20);
    }
}

function moveCactus() {
    let cactusPosition = 580;
    let moveInterval = setInterval(() => {
        if (cactusPosition < -20) {
            cactusPosition = 580;
            score++;
            scoreSpan.textContent = score;
        } else if (
            cactusPosition > 0 &&
            cactusPosition < 50 &&
            parseInt(dino.style.bottom) < 40
        ) {
            clearInterval(moveInterval);
            alert("Game Over! Your score: " + score);
            location.reload();
        } else {
            cactusPosition -= 5;
            cactus.style.right = cactusPosition + "px";
        }
    }, 20);
}

moveCactus();
