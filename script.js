const homeScreen = document.getElementById("home-screen");
const joinScreen = document.getElementById("join-screen");
const roomScreen = document.getElementById("room-screen");

const joinRoomBtn = document.getElementById("joinRoomBtn");
const createRoomBtn = document.getElementById("createRoomBtn");
const backBtn = document.getElementById("backBtn");
const backFromRoomBtn = document.getElementById("backFromRoomBtn");
const confirmJoinBtn = document.getElementById("confirmJoinBtn");

const roomCodeInput = document.getElementById("roomCode");
const roomCodeDisplay = document.getElementById("roomCodeDisplay");
const playersList = document.getElementById("playersList");

let currentRoomCode = null;
let players = [];

function showScreen(screen) {
  homeScreen.style.display = "none";
  joinScreen.style.display = "none";
  roomScreen.style.display = "none";

  screen.style.display = "block";
}

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function renderPlayers() {
  playersList.innerHTML = "";
  players.forEach((player) => {
    const li = document.createElement("li");
    li.textContent = player;
    playersList.appendChild(li);
  });
}



joinRoomBtn.addEventListener("click", () => {
  showScreen(joinScreen);
});

backBtn.addEventListener("click", () => {
  showScreen(homeScreen);
});

createRoomBtn.addEventListener("click", () => {
  currentRoomCode = generateRoomCode();
  players = ["Você (Host)"];

  roomCodeDisplay.textContent = currentRoomCode;
  renderPlayers();
  showScreen(roomScreen);
});

confirmJoinBtn.addEventListener("click", () => {
  const code = roomCodeInput.value.trim().toUpperCase();

  if (!code) {
    alert("Digite o código da sala.");
    return;
  }

  currentRoomCode = code;
  players = ["Você", "Clóvis", "Filomena"]

  roomCodeDisplay.textContent = currentRoomCode;
  renderPlayers();
  showScreen(roomScreen);
});

backFromRoomBtn.addEventListener("click", () => {
  currentRoomCode = null;
  players = [];
  roomCodeInput.value = "";
  showScreen(homeScreen);
});
