const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Salas em memória
const rooms = {};

// Gera código da sala
function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// Rota de teste
app.get("/", (req, res) => {
  res.send("Backend do Coup está rodando!");
});

// Criar sala
app.post("/rooms", (req, res) => {
  let code;

  do {
    code = generateRoomCode();
  } while (rooms[code]);

  rooms[code] = {
    code,
    players: [],
    createdAt: new Date()
  };

  res.status(201).json({
    code
  });
});

// Entrar em sala
app.get("/rooms/:code", (req, res) => {
  const code = req.params.code.toUpperCase();
  const room = rooms[code];

  if (!room) {
    return res.status(404).json({
      error: "Sala não encontrada"
    });
  }

  res.json({
    code: room.code,
    players: room.players
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
