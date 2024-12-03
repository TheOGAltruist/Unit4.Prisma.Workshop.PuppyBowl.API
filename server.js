const express = require("express");
const app = express();
const prisma = require("./prisma");

const port = process.env.PORT;

app.use(express.json());
app.use(require("morgan")("dev"));

app.get("/api/players", async (req, res, next) => {
  try {
    const players = await prisma.player.findMany();
    res.json(players);
  } catch (error) {
    next(error);
  }
});

app.post("/api/players", async (req, res, next) => {
  try {
    const { name, breed, status } = req.body;
    const player = await prisma.player.create({
      data: { name, breed, status },
    });
    res.json(player);
  } catch (error) {
    next(error);
  }
});

app.get("/api/players/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const player = await prisma.player.findUnique({ where: { id } });
    if (!player) {
      const error = new Error("Player not found.");
      error.status = 404;
      throw error;
    }
    res.json(player);
  } catch (error) {
    next(error);
  }
});

app.put("/api/players/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const { status } = req.body;
    const player = await prisma.player.update({
      where: { id },
      data: { status },
    });
    res.json(player);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/players/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    await prisma.player.delete({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status ?? 500;
  const message = err.message ?? 'Internal server error.';
  res.status(status).json({ message });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});