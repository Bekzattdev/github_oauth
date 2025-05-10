const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 4200;

app.use(cors());
app.use(express.json());

app.post("/auth/github", async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
      },
      {
        headers: { accept: "application/json" },
      }
    );
    const accessToken = response.data.access_token;
    res.json({ access_token: accessToken });
  } catch (e) {
    console.error("GitHub OAuth error:", e.response?.data || e.message);
    res.status(500).json({ error: "ошибка в коде", details: e.response?.data || e.message });
  }
});
app.listen(PORT, () => {
  console.log(`Сервер в http://localhost:${PORT}`);
});
