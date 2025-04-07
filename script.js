// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const flipButton = document.getElementById('flipButton');
const resultText = document.getElementById('result');

const platformHeight = 20; // Height of the platform
let bottlePositionY = 500; // Starting position
let bottleAngle = 0; // Initial angle
let isFlipping = false; // Is the bottle currently flipping?
const gravity = 0.5; // Force of gravity
let bottleVelocity = 0; // Initial velocity of the bottle

function drawBottle() {
    ctx.save();
    ctx.translate(canvas.width / 2, bottlePositionY);
    ctx.rotate(bottleAngle);
    ctx.fillStyle = 'orange';
    ctx.fillRect(-10, -30, 20, 30); // Draw the bottle shape
    ctx.restore();
}

function drawPlatform() {
    ctx.fillStyle = '#8B4513'; // Brown color for the platform
    ctx.fillRect(0, canvas.height - platformHeight, canvas.width, platformHeight); // Draw the platform
}

function flipBottle() {
    if (isFlipping) return;

    isFlipping = true;
    bottleAngle = Math.random() * (Math.PI * 2) - Math.PI; // Random angle
    bottleVelocity = -10; // Initial upward velocity

    function animateFlip() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlatform(); // Draw the platform
        bottlePositionY += bottleVelocity; // Move bottle by velocity
        bottleVelocity += gravity; // Apply gravity to the velocity

        // Check if it hits the platform
        if (bottlePositionY >= canvas.height - platformHeight - 30) {
            bottlePositionY = canvas.height - platformHeight - 30; // Fix position to on top of platform
            checkLand();
            return; // Stop if it's landed
        }

        // Draw the bottle
        bottleAngle += 0.1; // Spin the bottle
        drawBottle(); // Draw the bottle

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
    
    // Reset to initial position
    bottlePositionY = 500;
    bottleAngle = 0;
    bottleVelocity = 0; // Reset velocity
}

flipButton.addEventListener('click', flipBottle);

// Initial drawing
drawPlatform();
drawBottle();
