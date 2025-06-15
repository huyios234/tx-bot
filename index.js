const WebSocket = require("ws");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

let lastResult = "Đang chờ...";

// THAY LINK NÀY mỗi lần bạn có token mới
const ws = new WebSocket("wss://ajhuasadqw23.xyz/websocket?d=YVhCa2JtaGtiRzQ9fC05OXwxNzQ5OTk3MDI0OTcxfGU5OGU5MTRlM2Q0MDc1NDhhOTU2NTVhOWI5MDJlNDcyfDRhZGM3ZTk3MzE4MTE2ZjVjMzgyMDM5YjE1ZGVkNDVj");

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
