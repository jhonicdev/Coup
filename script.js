const API_URL = "http://127.0.0.1:3000";

const homeScreen = document.getElementById("home-screen");
const joinScreen = document.getElementById("join-screen");
const roomScreen = document.getElementById("room-screen");

const createRoomBtn = document.getElementById("createRoomBtn");
const joinRoomBtn = document.getElementById("joinRoomBtn");
const confirmJoinBtn = document.getElementById("confirmJoinBtn");
const backBtn = document.getElementById("backBtn");
const backFromRoomBtn = document.getElementById("backFromRoomBtn");

const roomCodeInput = document.getElementById("roomCode");
const roomCodeDisplay = document.getElementById("roomCodeDisplay");
const playersList = document.getElementById("playersList");

let currentRoom = null;


function updatePlayersList(players) {
  playersList.innerHTML = "";
  players.forEach((player) => {
    const li = document.createElement("li");
    li.textContent = player;
    playersList.appendChild(li);
  });
}


function showScreen(screen) {
  homeScreen.style.display = "none";
  joinScreen.style.display = "none";
  roomScreen.style.display = "none";

  screen.style.display = "block";
}


createRoomBtn.addEventListener("click", async () => {
  try {
    // Criar sala no backend
    const response = await fetch(`${API_URL}/rooms`, { method: "POST" });
    if (!response.ok) throw new Error("Erro ao criar sala");

    const data = await response.json();
    currentRoom = data.code;

    // Simular jogadores (ainda só você)
    const players = ["Você"];
    updatePlayersList(players);

    // Mostrar tela da sala
    roomCodeDisplay.textContent = currentRoom;
    showScreen(roomScreen);
  } catch (err) {
    alert("Não foi possível criar a sala! Por favor, tente novamente mais tarde.");
    console.error(err);
  }
});


joinRoomBtn.addEventListener("click", () => {
  showScreen(joinScreen);
});


confirmJoinBtn.addEventListener("click", async () => {
  const code = roomCodeInput.value.trim().toUpperCase();
  if (!code) {
    alert("Digite um código da sala!");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/rooms/${code}`);
    if (!response.ok) throw new Error("Sala não encontrada!");

    const data = await response.json();
    currentRoom = data.code;

    // Simular jogadores (só você por enquanto)
    const players = ["Você"];
    updatePlayersList(players);

    // Mostrar tela da sala
    roomCodeDisplay.textContent = currentRoom;
    showScreen(roomScreen);
  } catch (err) {
    alert("Sala não encontrada!");
    console.error(err);
  }
});


backBtn.addEventListener("click", () => {
  showScreen(homeScreen);
  roomCodeInput.value = "";
});


backFromRoomBtn.addEventListener("click", () => {
  currentRoom = null;
  updatePlayersList([]);
  roomCodeDisplay.textContent = "----";
  showScreen(homeScreen);
});
