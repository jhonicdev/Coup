const homeScreen = document.getElementById("home-screen");
const joinScreen = document.getElementById("join-screen");

const joinRoomBtn = document.getElementById("joinRoomBtn");
const backBtn = document.getElementById("backBtn");

joinRoomBtn.addEventListener("click", () => {
  homeScreen.style.display = "none";
  joinScreen.style.display = "block";
});

backBtn.addEventListener("click", () => {
  joinScreen.style.display = "none";
  homeScreen.style.display = "block";
});
