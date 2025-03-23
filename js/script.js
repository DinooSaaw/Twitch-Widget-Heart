// Fetch configuration
let config;
fetch("config.json")
  .then((response) => response.json())
  .then((data) => {
    config = data;
    if (config.ECG.showECG) {
      // Initialize with config values
      drawECG();
    }
  })
  .catch((err) => console.error("Error loading config.json:", err));

const heart = document.getElementById("heart");
const heartbeatNumber = document.getElementById("heartbeat-number");
const canvas = document.getElementById("ecg-canvas");
const ctx = canvas.getContext("2d");

let heartbeat = 80; // Default BPM
let history = []; // Store all heartbeats along with timestamps

// Function to update the heartbeat display
function updateHeartbeat(value) {
  heartbeat = value;
  heartbeatNumber.innerText = heartbeat;

  // Adjust animation speed based on BPM (higher BPM = faster beat, stops at 0 BPM)
  if (heartbeat > 0) {
    const beatSpeed = 60 / heartbeat; // Directly set speed
    heart.style.animation = `heartbeat ${beatSpeed}s infinite`;
  } else {
    heart.style.animation = "none"; // Stop animation at 0 BPM
  }

  // Adjust heart color based on BPM (use config min/max range)
  const minColor = [255, 138, 138]; // #FF8A8A (0 BPM)
  const maxColor = [117, 0, 0]; // #750000 (200 BPM)
  const ratio = Math.min(1, Math.max(0, (heartbeat - config.ECG.min) / (config.ECG.max - config.ECG.min))); // Normalize BPM to range

  const red = Math.round(minColor[0] + (maxColor[0] - minColor[0]) * ratio);
  const green = Math.round(minColor[1] + (maxColor[1] - minColor[1]) * ratio);
  const blue = Math.round(minColor[2] + (maxColor[2] - minColor[2]) * ratio);
  const bgColor = `rgb(${red}, ${green}, ${blue})`;

  // Apply styles
  heart.style.backgroundColor = bgColor;
  heart.style.setProperty("--heart-color", bgColor); // Apply to before/after

  // Save heartbeat history with timestamp
  history.push({ timestamp: Date.now(), heartbeat });

  drawECG();
}

// Function to draw the ECG graph (scaled based on config min/max)
function drawECG() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;

  // Display only the latest 10 heartbeats
  const displayHistory = history.slice(-10); // Get the last 10 heartbeats
  if (displayHistory.length < 2) return; // Skip drawing if less than 2 points
  // Draw the ECG line using the last 10 heartbeats
  for (let i = 0; i < displayHistory.length; i++) {
    const x = (i / displayHistory.length) * canvas.width;
    const y = canvas.height - ((displayHistory[i].heartbeat - config.ECG.min) / (config.ECG.max - config.ECG.min)) * canvas.height; // Scaled based on config min/max
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  // Draw the ECG line
  ctx.stroke();

  // Draw a red circle on the latest point
  const lastX = (displayHistory.length - 1) / displayHistory.length * canvas.width;
  const lastY = canvas.height - ((displayHistory[displayHistory.length - 1].heartbeat - config.ECG.min) / (config.ECG.max - config.ECG.min)) * canvas.height;
  
  ctx.beginPath();
  ctx.arc(lastX, lastY, 5, 0, Math.PI * 2); // Circle with radius 5
  ctx.fillStyle = "red";
  ctx.fill();
}

// Function to generate a random heartbeat (80-120 BPM)
function getRandomHeartbeat() {
  return Math.floor(Math.random() * (200 - 0 + 1)) + 0;
}

// Test command to simulate a heartbeat change
window.setFakeHeartbeat = (value) => {
  console.log(`Simulating heartbeat: ${value}`);
  updateHeartbeat(value);
};

// Update heartbeat every second
setInterval(() => {
  // setFakeHeartbeat(getRandomHeartbeat());
}, 1000);
