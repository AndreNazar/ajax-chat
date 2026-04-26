const WebSoket = require("ws")
const fs = require("fs")
const path = require("path")

const DB = path.resolve(__dirname, "../messages.json")

const wss = new WebSoket.Server({ port: 8080 })

const users = new Map()
let messages = []

console.log("server started")

function broadcastUsers() {
  const list = Array.from(users.values())

  wss.clients.forEach((client) => {
    if (client.readyState === WebSoket.OPEN) {
      client.send(
        JSON.stringify({
          type: "users",
          users: list,
        })
      )
    }
  })
}

try {
  messages = JSON.parse(fs.readFileSync(DB))
} catch {
  messages = []
}

wss.on("connection", (ws, req) => {
  console.log("client connection", req.socket.remoteAddress)

  ws.on("message", (raw) => {
    let data

    try {
      data = JSON.parse(raw)
    } catch {
      return
    }

    if (data.type === "join") {
      ws.send(
        JSON.stringify({
          type: "init",
          messages: messages.slice(-100),
        })
      )

      users.set(ws, { name: data.name, color: data.color })
      broadcastUsers()

      return
    }

    if (data.type === "message") {
      const user = users.get(ws)
      if (!user) return

      const message = {
        type: "message",
        name: user.name,
        message: data.message,
        color: user.color,
        time: Date.now(),
      }

      console.log(message)

      messages.push(message)
      fs.writeFileSync(DB, JSON.stringify(messages))

      wss.clients.forEach((client) => {
        if (client.readyState === WebSoket.OPEN) {
          client.send(JSON.stringify(message))
        }
      })
    }
  })

  ws.on("close", () => {
    console.log("client disconnected")
    users.delete(ws)
    broadcastUsers()
  })
})
