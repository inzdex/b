// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const flipButton = document.getElementById('flipButton');
const resultText = document.getElementById('result');

let bottlePositionY = 500;
let bottleAngle = 0;
let isFlipping = false;

function drawBottle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, bottlePositionY);
    ctx.rotate(bottleAngle);
    ctx.fillStyle = 'orange';
    ctx.fillRect(-10, -30, 20, 30); // Bottle shape
    ctx.restore();
}

function flipBottle() {
    if (isFlipping) return;

    isFlipping = true;
    bottleAngle = Math.random() * (Math.PI * 2) - Math.PI; // Random angle
    const flipSpeed = 5; // Speed of the flip up or down
    const gravity = 0.2; // Gravity effect
    let flipHeight = 0;

    function animateFlip() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bottlePositionY -= flipSpeed; // Move bottle upward
        flipHeight += flipSpeed; 
        if (flipHeight > 200 || bottlePositionY <= 0) {
            flipSpeed = -flipSpeed; // Start coming back down
        }
        bottlePositionY += flipSpeed;

        bottleAngle += 0.1; // Simulate spin

        drawBottle();

        if (bottlePositionY >= 500) {
            checkLand();
            return; // Stop if it's landed
        }

        requestAnimationFrame(animateFlip);
    }
    animateFlip();
}

function checkLand() {
    isFlipping = false;
    if (bottleAngle < Math.PI / 6 && bottleAngle > -Math.PI / 6) {
        resultText.innerText = "Success! The bottle landed upright!";
    } else {
        resultText.innerText = "Try again! The bottle flipped over.";
    }
    bottlePositionY = 500; // Reset to original position
    bottleAngle = 0; // Reset angle
}

flipButton.addEventListener('click', flipBottle);

drawBottle();
