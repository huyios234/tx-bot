const WebSocket = require("ws");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

let lastResult = "Đang chờ...";

// THAY LINK NÀY mỗi lần bạn có token mới
const ws = new WebSocket("wss://ajhuasadqw23.xyz/websocket?d=TOKEN_MOI_CUA_BAN");

ws.on("open", () => {
  console.log("✅ Đã kết nối WebSocket");
});

ws.on("message", (data) => {
  try {
    const json = JSON.parse(data);
    if (json.dice && json.total) {
      const result = json.total >= 11 ? "tài" : "xỉu";
      lastResult = `${result}-${json.total}`;
      console.log("🎯", lastResult);
    }
  } catch (err) {
    // Không phải JSON hợp lệ
  }
});

ws.on("close", () => {
  console.log("🔌 WebSocket đã đóng");
});

app.get("/result", (req, res) => {
  res.send(`<span id="kq">${lastResult}</span>`);
});

app.listen(PORT, () => {
  console.log("🌐 Server chạy tại cổng", PORT);
});
